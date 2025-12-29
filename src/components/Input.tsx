import React, { useState } from 'react';

interface InputProps {
  onSendOtp?: (email: string) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Input: React.FC<InputProps> = ({ onSendOtp }) => {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const isValid = emailRegex.test(email);

  const handleSendOtp = () => {
    setTouched(true);
    if (isValid) {
      setSent(true);
      onSendOtp?.(email);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div className="flex w-full items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
        <input
          type="email"
          className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
          placeholder="Enter your email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setSent(false);
          }}
          onBlur={() => setTouched(true)}
        />
        <button
          type="button"
          className={`ml-2 p-2 rounded-full transition-colors ${
            isValid
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          onClick={handleSendOtp}
          disabled={!isValid}
          aria-label="Send OTP"
        >
          {sent ? (
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
      {touched && !isValid && (
        <span className="text-red-500 text-sm mt-1 w-full text-left">
          Please enter a valid email address.
        </span>
      )}
      {sent && (
        <span className="text-green-500 text-sm mt-1 w-full text-left">
          OTP token has been sent!
        </span>
      )}
    </div>
  );
};

export default Input;
