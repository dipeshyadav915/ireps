'use client';
import { addToast, Input } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password =
        'Password must contain at least one special character';
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const login = async () => {
    try {
      const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      localStorage.setItem('token', data.token);
      setFormData({ email: '', password: '' });
      addToast({
        title: 'success',
        description: 'login successfully',
        color: 'success',
      });
      router.push('view/dashboard');
      return true;
    } catch (error: any) {
      addToast({
        title: 'Failed',
        description: 'Something went wrong! Try again.',
        color: 'danger',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    await login();
  };
  console.log(error);

  return (
    <>
      <form className="space-y-6 text-xl " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <Input
            isRequired={true}
            label="Email"
            labelPlacement="outside"
            errorMessage={error.email}
            isInvalid={error.email ? true : false}
            size="lg"
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            variant="bordered"
            className="w-full md:text-xl text-base rounded mt-2"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            endContent={
              showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                  onClick={() => {
                    setShowPassword(false);
                    // setShowPassword(true);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                  onClick={() => {
                    // setShowPassword(false);
                    setShowPassword(true);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )
            }
            isRequired={true}
            label="Password"
            labelPlacement="outside"
            type={showPassword ? 'text' : 'password'}
            size="lg"
            errorMessage={error.password}
            isInvalid={error.password ? true : false}
            name="password"
            placeholder="Your Password"
            className="w-full md:text-xl text-base rounded-sm mt-2"
            value={formData.password}
            variant="bordered"
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
