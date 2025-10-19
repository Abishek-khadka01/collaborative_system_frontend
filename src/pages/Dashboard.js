import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FileHeader } from '../components/FileShow';
import { useThemeStore } from '../stores/ThemeStore';
import { useNavigate } from 'react-router-dom';
import axios from "../apis/interceptor";
import { CREATE_DOCUMENT, DOCUMENTS } from '../apis/Endpoints';
// import { useDocumentStore } from '../stores/DocumentStore';
const DashBoard = () => {
    const { theme } = useThemeStore();
    // const addDocument = useDocumentStore((state)=>state.addDocument);
    const navigate = useNavigate();
    const isLight = theme === 'light';
    const [files, setFiles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const handleCreate = async () => {
        if (!newFileName.trim())
            return;
        try {
            const message = await axios.post(`${DOCUMENTS}${CREATE_DOCUMENT}`, {
                DocumentName: newFileName
            });
            console.table(message.data);
            if (message.status == 200) {
                alert(`the document is created successfully`);
                console.table(message.data);
                const newFile = {
                    id: message.data.id,
                    fileName: newFileName,
                    createdAt: new Date().toISOString().split('T')[0],
                    members: [
                        {
                            id: Math.random(),
                            username: 'New User',
                            avatar: 'https://i.pravatar.cc/40?img=8',
                        },
                    ],
                };
                setFiles(prev => [...prev, newFile]);
                setNewFileName('');
                setIsModalOpen(false);
            }
        }
        catch (error) {
            console.error(`Error in creating the document ${error}`);
        }
    };
    const bgColor = isLight ? 'bg-gray-50' : 'bg-gray-900';
    const textColor = isLight ? 'text-gray-900' : 'text-gray-100';
    return (_jsxs("div", { className: `relative min-h-screen ${bgColor} ${textColor} p-8 transition-colors duration-300`, children: [_jsx("div", { className: "space-y-3", children: files.map((file, index) => (_jsx("div", { onClick: () => navigate(`/document/${index + 1}`), className: "cursor-pointer hover:scale-[1.01] transform transition-transform", children: _jsx(FileHeader, { ...file }) }, index))) }), _jsx("button", { onClick: () => setIsModalOpen(true), className: "fixed bottom-8 right-8 flex items-center justify-center w-14 h-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 text-white text-3xl font-bold transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300", "aria-label": "Add new document", children: "+" }), isModalOpen && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity", children: _jsxs("div", { className: `rounded-lg shadow-lg w-96 p-6 ${isLight ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'}`, children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Create New Document" }), _jsx("input", { type: "text", placeholder: "Enter document name...", value: newFileName, onChange: e => setNewFileName(e.target.value), className: `w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLight
                                ? 'border-gray-300 bg-white text-gray-900'
                                : 'border-gray-600 bg-gray-700 text-white'}` }), _jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx("button", { onClick: () => setIsModalOpen(false), className: `px-4 py-2 rounded transition ${isLight ? 'bg-gray-300 hover:bg-gray-400' : 'bg-gray-600 hover:bg-gray-500'}`, children: "Cancel" }), _jsx("button", { onClick: handleCreate, className: "px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition", children: "Create" })] })] }) }))] }));
};
export default DashBoard;
