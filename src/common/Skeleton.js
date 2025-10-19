import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const Skeleton = ({ className = '' }) => (_jsx("div", { className: `animate-pulse bg-gray-200 rounded ${className}` }));
export default Skeleton;
