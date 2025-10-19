import { jsx as _jsx } from "react/jsx-runtime";
import React, { useRef, useState } from 'react';
const OTP_LENGTH = 6;
const Otp = () => {
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
    const inputsRef = useRef(Array(OTP_LENGTH).fill(null));
    // Handle individual input change
    const handleChange = (value, idx) => {
        if (!/^\d?$/.test(value))
            return; // Only allow single digits
        const newOtp = [...otp];
        newOtp[idx] = value;
        setOtp(newOtp);
        // Auto-focus next input
        if (value && idx < OTP_LENGTH - 1) {
            inputsRef.current[idx + 1]?.focus();
        }
    };
    // Handle backspace key
    const handleKeyDown = (e, idx) => {
        if (e.key === 'Backspace') {
            if (otp[idx]) {
                // Clear current input
                const newOtp = [...otp];
                newOtp[idx] = '';
                setOtp(newOtp);
            }
            else if (idx > 0) {
                // Move to previous input
                inputsRef.current[idx - 1]?.focus();
            }
        }
    };
    // Handle paste event
    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text').replace(/\D/g, ''); // Remove non-digits
        if (!paste)
            return;
        const newOtp = [...otp];
        for (let i = 0; i < OTP_LENGTH; i++) {
            newOtp[i] = paste[i] || '';
        }
        setOtp(newOtp);
        // Focus first empty input or last input
        const firstEmptyIndex = newOtp.findIndex(v => v === '');
        if (firstEmptyIndex !== -1) {
            inputsRef.current[firstEmptyIndex]?.focus();
        }
        else {
            inputsRef.current[OTP_LENGTH - 1]?.focus();
        }
        e.preventDefault();
    };
    // Optional: combine OTP into a single string
    const otpValue = otp.join('');
    console.log(otpValue);
    return (_jsx("div", { className: "flex space-x-2 justify-center", children: otp.map((digit, idx) => (_jsx("input", { ref: el => {
                inputsRef.current[idx] = el;
            }, type: "text", inputMode: "numeric", maxLength: 1, value: digit, onChange: e => handleChange(e.target.value, idx), onKeyDown: e => handleKeyDown(e, idx), onPaste: handlePaste, className: "w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl" }, idx))) }));
};
export default Otp;
