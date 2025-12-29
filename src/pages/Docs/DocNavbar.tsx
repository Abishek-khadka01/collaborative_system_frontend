import React, { useState, useRef, useEffect } from "react";
import { useThemeStore } from "../../stores/ThemeStore";
import UserSearchInput, { type UserType } from "../../components/AddMember";

export interface Member {
  id: number;
  username: string;
  avatar?: string;
}

interface DocumentToolbarProps {
  documentName: string;
  setDocumentName: (name: string) => void;

  onAddMember: (user: UserType) => void;
  onRename?: () => void;
  onSave?: () => void;
  onMakeAdmin?: () => void;
  onConvertToPDF?: () => void;

  members?: Member[];
}

const DocumentToolbar: React.FC<DocumentToolbarProps> = ({
  documentName,
  setDocumentName,
  onAddMember,
  onRename = () => {},
  onSave = () => {},
  onMakeAdmin = () => {},
  onConvertToPDF = () => {},
  members = [],
}) => {
  const { theme } = useThemeStore();
  const [editingName, setEditingName] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const bgColor = theme === "light" ? "bg-white" : "bg-gray-900";
  const hoverBg = theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";

  useEffect(() => {
    if (editingName && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingName]);

  const handleFileNameKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditingName(false);
      onRename();
    }
    if (e.key === "Escape") {
      setEditingName(false);
    }
  };

  const toolbarButtons = [
    {
      name: "Rename",
      onClick: () => setEditingName(true),
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M4 20h4l10-10-4-4L4 16v4z" />
        </svg>
      ),
    },
    {
      name: "Save",
      onClick: onSave,
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      name: "Make Admin",
      onClick: onMakeAdmin,
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M6 20c0-3 3-5 6-5s6 2 6 5" />
        </svg>
      ),
    },
    {
      name: "Add Members",
      onClick: () => setShowAddMemberModal(true),
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      name: "Convert to PDF",
      onClick: onConvertToPDF,
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M6 2h9l5 5v15H6z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`flex items-center justify-between px-4 py-2 shadow-md ${bgColor}`}>

      {/* Left: Toolbar Buttons */}
      <div className="flex items-center gap-3">
        {toolbarButtons.map((btn) => (
          <button
            key={btn.name}
            onClick={btn.onClick}
            className={`group flex flex-col items-center p-2 rounded ${hoverBg}`}
          >
            <div className={`${textColor}`}>{btn.icon}</div>
            <span className={`text-xs opacity-0 group-hover:opacity-100 ${textColor}`}>
              {btn.name}
            </span>
          </button>
        ))}
      </div>

      {/* Middle: Document Name */}
      <div className="flex-1 flex justify-center px-4">
        {editingName ? (
          <input
            ref={inputRef}
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            onBlur={() => setEditingName(false)}
            onKeyDown={handleFileNameKey}
            className={`text-center w-[200px] px-2 py-1 rounded border ${
              theme === "light"
                ? "bg-white text-black border-black"
                : "bg-gray-700 text-white border-gray-300"
            }`}
          />
        ) : (
          <span
            onClick={() => setEditingName(true)}
            className={`font-semibold cursor-pointer ${textColor}`}
          >
            {documentName}
          </span>
        )}
      </div>

      {/* Right: Members */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setShowMembersModal(true)}
      >
        {members.map((m) => (
          <div
            key={m.id}
            className="w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-700 text-white flex items-center justify-center overflow-hidden"
          >
            {m.avatar ? (
              <img
                src={m.avatar}
                alt={m.username}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span>{m.username.charAt(0).toUpperCase()}</span>
            )}
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className={`p-6 rounded-lg shadow-lg w-96 ${bgColor}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-lg font-semibold ${textColor}`}>Add Member</h2>
              <button
                onClick={() => setShowAddMemberModal(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                &times;
              </button>
            </div>

            <UserSearchInput
              users={[]} // Pass user list here if needed
              onAdd={(u) => {
                onAddMember(u);
                setShowAddMemberModal(false);
              }}
              placeholder="Search user..."
            />
          </div>
        </div>
      )}

      {/* Members List Modal */}
      {showMembersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className={`p-6 rounded-lg shadow-lg w-96 ${bgColor}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-lg font-semibold ${textColor}`}>Members</h2>
              <button
                onClick={() => setShowMembersModal(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
              {members.map((m) => (
                <div key={m.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                    {m.avatar ? (
                      <img
                        src={m.avatar}
                        alt={m.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white flex items-center justify-center w-full h-full">
                        {m.username.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className={`${textColor} font-medium`}>{m.username}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentToolbar;
