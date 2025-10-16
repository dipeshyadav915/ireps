'use client';
import { useState } from 'react';
import { addToast } from '@heroui/react';

export default function ContactForm() {
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    email: '',
    message: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.mobile_number.trim()) {
      newErrors.mobile_number = 'Mobile number is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (formData.name && !/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Invalid characters in name';
    }
    if (formData.mobile_number && !/^\d{10,15}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = 'Enter a valid mobile number (10-15 digits)';
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const postMessage = async () => {
    try {
      const [response1, response2] = await Promise.all([
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }),
        fetch('/api/dynamicMail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }),
      ]);

      if (!response1.ok || !response2.ok) {
        throw new Error('Failed to send emails');
      }

      addToast({
        title: 'Sucess',
        description: 'Message sent successfully.',
        color: 'success',
      });
      setFormData({ name: '', mobile_number: '', email: '', message: '' });
    } catch (error: any) {
      console.error(error);

      addToast({
        title: 'Failed',
        description: 'Something went wrong.',
        color: 'danger',
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    await postMessage();
  };

  return (
    <>
      {/* {success && (
        <div className="fixed bottom-[5%] right-[2%] p-4 bg-green-500/30 backdrop-blur-md  text-white rounded-md capitalize">
          Message sent successfully!
        </div>
      )} */}
      <form className="space-y-6  text-xl" onSubmit={handleSubmit}>
        <div>
          <label
            className="md:text-xl text-base block font-medium text-default-700"
            htmlFor="name"
          >
            Full Name <span className="text-danger">*</span>
          </label>
          {error.name && <p className="text-danger text-small">{error.name}</p>}
          <input
            className="w-full p-3 rounded md:text-xl text-base"
            id="name"
            name="name"
            placeholder="Your Name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            className="md:text-xl text-base block font-medium text-default-700"
            htmlFor="email"
          >
            Email <span className="text-danger">*</span>
          </label>
          {error.email && (
            <p className="text-danger text-small">{error.email}</p>
          )}
          <input
            className="w-full p-3 md:text-xl text-base rounded"
            id="email"
            name="email"
            placeholder="Your Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            className="md:text-xl text-base block font-medium text-default-700"
            htmlFor="mobile_number"
          >
            Mobile Number <span className="text-danger">*</span>
          </label>
          {error.mobile_number && (
            <p className="text-danger text-small">{error.mobile_number}</p>
          )}
          <input
            className="w-full p-3 md:text-xl text-base rounded"
            id="mobile_number"
            name="mobile_number"
            placeholder="Your Mobile Number"
            type="number"
            value={formData.mobile_number}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            className="md:text-xl text-base block font-medium text-default-700"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="w-full p-3 rounded md:text-xl text-base"
            id="message"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="md:w-full w-fit p-2 bg-primary text-white rounded-xl hover:bg-primary/80 md:text-xl text-sm "
          >
            Send Message
          </button>
        </div>
      </form>
    </>
  );
}
