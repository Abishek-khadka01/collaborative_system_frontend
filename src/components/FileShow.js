import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useThemeStore } from '../stores/ThemeStore';
const FileHeader = ({ id, fileName, members, createdAt }) => {
    const { theme } = useThemeStore();
    console.log(id);
    const bgColor = theme === 'light' ? 'bg-gray-100' : 'bg-gray-900';
    const textColor = theme === 'light' ? 'text-gray-800' : 'text-white';
    const borderColor = theme === 'light' ? 'border-gray-300' : 'border-white';
    const tooltipBg = theme === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900';
    const transitionAll = 'transition-colors duration-300 ease-in-out';
    return (_jsxs("div", { className: `w-full flex items-center justify-between px-6 py-4 my-4 border ${borderColor} rounded-lg ${bgColor} ${textColor} ${transitionAll}`, children: [_jsx("div", { className: "font-semibold text-lg truncate", children: fileName }), _jsx("div", { className: "flex items-center space-x-2", children: members.map(member => (_jsxs("div", { className: "relative group flex flex-col items-center", children: [_jsx("img", { src: member.avatar, alt: member.username, className: `h-8 w-8 rounded-full object-cover border-2 ${theme === 'light' ? 'border-gray-300' : 'border-white'} ${transitionAll}` }), _jsx("div", { className: `absolute top-full mt-2 px-2 py-1 text-xs rounded ${tooltipBg} opacity-0 group-hover:opacity-100 pointer-events-none ${transitionAll}`, children: member.username })] }, member.id))) }), _jsx("div", { className: "text-sm", children: createdAt })] }));
};
// Dummy usage
const DummyFileHeader = () => {
    const dummyMembers = [
        { id: 1, username: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, username: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: 3, username: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3' },
        { id: 4, username: 'David', avatar: 'https://i.pravatar.cc/150?img=4' },
    ];
    return _jsx(FileHeader, { id: '1', fileName: "MyDocument.txt", members: dummyMembers, createdAt: "Oct 4, 2025" });
};
export { FileHeader, DummyFileHeader };
