import React, { useRef, useState } from 'react';

const OTP_LENGTH = 6;

const Otp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>(Array(OTP_LENGTH).fill(null));

  // Handle individual input change
  const handleChange = (value: string, idx: number) => {
    if (!/^\d?$/.test(value)) return; // Only allow single digits
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace') {
      if (otp[idx]) {
        // Clear current input
        const newOtp = [...otp];
        newOtp[idx] = '';
        setOtp(newOtp);
      } else if (idx > 0) {
        // Move to previous input
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, ''); // Remove non-digits
    if (!paste) return;

    const newOtp = [...otp];
    for (let i = 0; i < OTP_LENGTH; i++) {
      newOtp[i] = paste[i] || '';
    }
    setOtp(newOtp);

    // Focus first empty input or last input
    const firstEmptyIndex = newOtp.findIndex(v => v === '');
    if (firstEmptyIndex !== -1) {
      inputsRef.current[firstEmptyIndex]?.focus();
    } else {
      inputsRef.current[OTP_LENGTH - 1]?.focus();
    }

    e.preventDefault();
  };

  // Optional: combine OTP into a single string
  const otpValue = otp.join('');
  console.log(otpValue);
  return (
    <div className="flex space-x-2 justify-center">
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={el => {
            inputsRef.current[idx] = el;
          }} // TypeScript-safe ref
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(e.target.value, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
        />
      ))}
      {/* Optional: show combined OTP for debugging */}
      {/* <p className="ml-4">{otpValue}</p> */}
    </div>
  );
};

export default Otp;
