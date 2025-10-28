import React, { useState, useRef, useEffect } from 'react';
import { useThemeStore } from '../../stores/ThemeStore';
import UserSearchInput, {type UserType} from '../../components/AddMember';

const allUsers: UserType[] = [
  { id: 1, username: 'John Doe', email: 'john@example.com', profile: 'https://i.pravatar.cc/40?img=1' },
  { id: 2, username: 'Jane Smith', email: 'jane@example.com', profile: 'https://i.pravatar.cc/40?img=2' },
  { id: 3, username: 'Doe Ray', email: 'doe@example.com', profile: 'https://i.pravatar.cc/40?img=3' },
];

const onlineMembers = [
  {
    id: 1,
    username: 'Alice',
    avatar: 'https://t4.ftcdn.net/jpg/16/90/93/63/240_F_1690936360_j3C0S6h9mMYDVmezy3EOHkPakUZmjfxw.jpg',
  },
  { id: 2, username: 'Bob', avatar: '/avatars/bob.png' },
  { id: 3, username: 'Charlie', avatar: '/avatars/charlie.png' },
  { id: 4, username: 'David', avatar: '/avatars/david.png' },
  { id: 5, username: 'Eva', avatar: '/avatars/eva.png' },
];

interface Member {
  id: number;
  username: string;
  avatar?: string;
}

const DocumentToolbar: React.FC = () => {
  const { theme } = useThemeStore();
  const [members, setMembers] = useState<Member[]>([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showMembersDropdown, setShowMembersDropdown] = useState(false);
  const [fileName, setFileName] = useState('MyDocument.txt');
  const [editingName, setEditingName] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const membersRef = useRef<HTMLDivElement | null>(null);

  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-100';
  const hoverBg = theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800';
  const plusBg = theme === 'light' ? 'bg-gray-300' : 'bg-gray-600';
  const tooltipBg = theme === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-white';
  const itemHoverBg = theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800';
  const transitionAll = 'transition-colors duration-500 ease-in-out';

  useEffect(() => {
    if (editingName && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingName]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (membersRef.current && !membersRef.current.contains(e.target as Node)) {
        setShowMembersDropdown(false);
      }
    };
    if (showMembersDropdown) {
      document.addEventListener('mousedown', onClickOutside);
    }
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [showMembersDropdown]);

  const displayedMembers = onlineMembers.slice(0, 3);
  const extraCount = onlineMembers.length - displayedMembers.length;

  const toolbarButtons = [
    {
      name: 'Rename',
      onClick: () => setEditingName(true),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 
               2 0 002-2v-5M16.5 3.5l3 3L12 14l-4 1 1-4 
               7.5-7.5z"
          />
        </svg>
      ),
    },
    {
      name: 'Save',
      onClick: () => alert('Save action (dummy)'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      name: 'Make Admin',
      onClick: () => alert('Make Admin action (dummy)'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
               1.79-4 4 1.79 4 4 4zm0 2c-2.67 
               0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>
      ),
    },
    {
      name: 'Add Members',
      onClick: () => setShowAddMemberModal(true),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      name: 'Members',
      onClick: () => setShowMembersDropdown((s) => !s),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5V8h-5M2 20h5V4H2m8 
               16h4V12h-4v8zm6-8h5V8h-5v4zM8 12H3V8h5v4z"
          />
        </svg>
      ),
    },
    {
      name: 'Convert to PDF',
      onClick: () => alert('Convert to PDF clicked'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 2h10a2 2 0 012 
               2v16a2 2 0 01-2 2H7a2 2 0 
               01-2-2V4a2 2 0 012-2zm0 
               0l5 6h6"
          />
        </svg>
      ),
    },
  ];

  const handleFileNameKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setEditingName(false);
    }
  };

  // Add member from UserSearchInput
  const handleAddMember = (user: UserType) => {
    if (members.find((m) => m.id === user.id)) return;
    setMembers((prev) => [...prev, { id: user.id, username: user.username, avatar: user.profile }]);
    setShowAddMemberModal(false);
  };

  return (
    <div className={`flex items-center justify-between px-4 py-2 ${bgColor} shadow-md ${transitionAll}`}>

      {/* Toolbar Buttons */}
      <div className="flex items-center gap-2">
        {toolbarButtons.map((btn) => (
          <button
            key={btn.name}
            onClick={btn.onClick}
            className={`group flex flex-col items-center gap-1 p-2 rounded ${hoverBg} ${transitionAll}`}
          >
            <div className={`${textColor} ${transitionAll} transform`}>{btn.icon}</div>
            <span className={`${textColor} mt-1 text-xs text-center opacity-0 group-hover:opacity-100 ${transitionAll}`}>
              {btn.name}
            </span>
          </button>
        ))}
      </div>

      {/* Document Name */}
      <div className="flex-1 flex justify-center px-4">
        {editingName ? (
          <input
            ref={inputRef}
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            onKeyDown={handleFileNameKey}
            onBlur={() => setEditingName(false)}
            className={`text-center w-[200px] px-2 py-1 rounded border focus:outline-none
              ${theme === 'light' ? 'bg-white text-black border-black' : 'bg-gray-700 text-white border-gray-100'}
              ${transitionAll}`}
          />
        ) : (
          <span className={`${textColor} font-semibold truncate block text-center ${transitionAll}`} title={fileName}>
            {fileName}
          </span>
        )}
      </div>

      {/* Members Avatars */}
      <div className="flex items-center gap-2">
        {displayedMembers.map((m) => (
          <div key={m.id} className="relative group">
            <img src={m.avatar} alt={m.username} className="h-8 w-8 rounded-full object-cover cursor-pointer" />
            <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 text-xs rounded ${tooltipBg} opacity-0 group-hover:opacity-100 ${transitionAll}`}>
              {m.username}
            </div>
          </div>
        ))}

        {extraCount > 0 && (
          <div className="relative" ref={membersRef}>
            <button
              onClick={() => setShowMembersDropdown((s) => !s)}
              className={`h-8 w-8 flex items-center justify-center rounded-full ${plusBg} text-white text-xs ${transitionAll}`}
            >
              +{extraCount}
            </button>
            {showMembersDropdown && (
              <div className={`absolute right-0 mt-2 w-56 ${bgColor} shadow-lg rounded-md p-2 ${transitionAll} z-50`}>
                <div className="max-h-64 overflow-auto">
                  {onlineMembers.map((member) => (
                    <div key={member.id} className={`flex items-center gap-2 px-2 py-1 rounded ${itemHoverBg} cursor-pointer ${transitionAll}`}>
                      <img src={member.avatar} alt={member.username} className="h-8 w-8 rounded-full object-cover" />
                      <div className={`${textColor} text-sm ${transitionAll}`}>{member.username}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Member</h2>
              <button onClick={() => setShowAddMemberModal(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <UserSearchInput
              users={allUsers}
              onAdd={handleAddMember}
              placeholder="Search by email..."
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default DocumentToolbar;
