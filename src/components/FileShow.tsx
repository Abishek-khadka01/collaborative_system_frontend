import React from "react";
import { useThemeStore } from "../stores/ThemeStore";

interface Member {
  id: number;
  username: string;
  avatar: string;
}

interface FileHeaderProps {
  fileName: string;
  members: Member[];
  createdAt: string;
}

const FileHeader: React.FC<FileHeaderProps> = ({
  fileName,
  members,
  createdAt,
}) => {
  const { theme } = useThemeStore();

  const bgColor = theme === "light" ? "bg-gray-100" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const borderColor = theme === "light" ? "border-gray-300" : "border-white";
  const tooltipBg =
    theme === "light" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900";
  const transitionAll = "transition-colors duration-300 ease-in-out";

  return (
    <div
      className={`w-full flex items-center justify-between px-6 py-4 my-4 border ${borderColor} rounded-lg ${bgColor} ${textColor} ${transitionAll}`}
    >
      {/* File Name */}
      <div className="font-semibold text-lg truncate">{fileName}</div>

      {/* Members */}
      <div className="flex items-center space-x-2">
        {members.map((member) => (
          <div key={member.id} className="relative group flex flex-col items-center">
            <img
              src={member.avatar}
              alt={member.username}
              className={`h-8 w-8 rounded-full object-cover border-2 ${theme === "light" ? "border-gray-300" : "border-white"} ${transitionAll}`}
            />
            <div
              className={`absolute top-full mt-2 px-2 py-1 text-xs rounded ${tooltipBg} opacity-0 group-hover:opacity-100 pointer-events-none ${transitionAll}`}
            >
              {member.username}
            </div>
          </div>
        ))}
      </div>

      {/* Created At */}
      <div className="text-sm">{createdAt}</div>
    </div>
  );
};

// Dummy usage
const DummyFileHeader: React.FC = () => {
  const dummyMembers: Member[] = [
    { id: 1, username: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, username: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, username: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, username: "David", avatar: "https://i.pravatar.cc/150?img=4" },
  ];

  return (
    <FileHeader
      fileName="MyDocument.txt"
      members={dummyMembers}
      createdAt="Oct 4, 2025"
    />
  );
};

export { FileHeader, DummyFileHeader };
