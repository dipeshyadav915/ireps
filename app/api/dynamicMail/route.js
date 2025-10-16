import { SMTPClient } from 'emailjs';
import Handlebars from 'handlebars';
import { promises as fs } from 'fs';

export async function POST(req) {
  try {
    const body = await req.json();

    const client = new SMTPClient({
      user: 'testing@growthgrids.com',
      password: 'Gt$Dec@24$GGpL#',
      host: 'mail.growthgrids.com',
      ssl: false,
    });

    const emailTemplate = await fs.readFile(
      'app/templates/emailTemplate.html',
      'utf-8',
    );

    const template = Handlebars.compile(emailTemplate);

    const messageHTML = template({
      name: body.name,
    });

    const message = {
      from: 'testing@growthgrids.com',
      to: body.email,
      subject: 'Thanks for reaching us',
      attachment: [
        { data: messageHTML, alternative: true },
        {
          path: './public/main_logo.png',
          type: 'image/png',
          name: 'main_logo.png',
          headers: { 'Content-ID': '<logo>' },
        },
      ],
    };

    const response = await new Promise((resolve, reject) => {
      client.send(message, (err, response) => {
        if (err) {
          console.error('Error sending email:', err);
          reject(err); // Reject the promise with the error
        } else {
          console.error('Email sent successfully:', response);
          resolve(response); // Resolve with the response
        }
      });
    });

    return new Response(
      JSON.stringify({ message: `Email sent to ${body.email}` }),
      { status: 200 },
    );
  } catch (error) {
    // If an error occurs anywhere in the process, return a failure response with status 500
    console.error('Failed to send email:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to send email', error: error.message }),
      { status: 500 },
    );
  }
}
