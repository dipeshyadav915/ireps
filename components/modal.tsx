import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  addToast,
} from '@heroui/react';
import { timeStamp } from 'console';
import { useState } from 'react';
export default function Popup({
  isOpen,
  onClose,
  tenderId,
}: {
  isOpen: boolean;
  onClose: () => void;
  tenderId: string;
}) {
  const initalFormData = {
    name: '',
    email: '',
    mobile_number: '',
    message: '',
  };
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState(initalFormData);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const postMessage = async () => {
    try {
      const [response, response2] = await Promise.all([
        fetch(`/api/userQuery`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }),
        fetch('/api/dynamicMail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }),
      ]);

      if (!response.ok || !response2.ok) {
        throw new Error('Failed to send emails');
      }

      // Get previous value
      let previousValue = localStorage.getItem('tenderReq');
      let tenderValues: any[] = [];

      if (previousValue) {
        tenderValues.push(previousValue);
      }
      tenderValues.push(tenderId);

      let object = {
        values: tenderValues,
        timeStamp: new Date().getTime().toString(),
      };

      localStorage.setItem('tenderReq', JSON.stringify(object));

      setFormData(initalFormData);
      onClose();
      addToast({
        title: 'Success',
        description: 'Message sent successfully.',
        color: 'success',
      });
    } catch (error: any) {
      console.error(error);
      addToast({
        title: 'Failed',
        description: 'Something went wrong.',
        color: 'danger',
      });
    }
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
      newErrors.email = 'Invalid email formate';
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      await postMessage();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        size="2xl"
        className="bg-default-100"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Get Started Now
              </ModalHeader>

              <ModalBody>
                <form className="space-y-6  text-xl" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-medium text-default-700"
                    >
                      Full Name <span className="text-danger">*</span>{' '}
                    </label>
                    {error.name && (
                      <p className="text-danger text-small">{error.name}</p>
                    )}
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      className="w-full p-3 rounded"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-medium text-default-700"
                    >
                      Email <span className="text-danger">*</span>{' '}
                    </label>

                    {error.email && (
                      <p className="text-danger text-small">{error.email}</p>
                    )}
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full p-3  rounded"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mobile_number"
                      className="block font-medium text-default-700"
                    >
                      Mobile Number <span className="text-danger">*</span>
                    </label>

                    {error.mobile_number && (
                      <p className="text-danger text-small">
                        {error.mobile_number}
                      </p>
                    )}
                    <input
                      type="number"
                      name="mobile_number"
                      placeholder="Your Mobile Number"
                      className="w-full p-3  rounded"
                      value={formData.mobile_number}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-medium text-default-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      className="w-full p-3 rounded"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className="font-semibold text-md text-foreground"
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
