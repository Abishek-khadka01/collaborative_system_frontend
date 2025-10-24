import React, { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import QuillResizeImage from 'quill-resize-image';
import QuillCursors from 'quill-cursors';
import 'react-quill/dist/quill.snow.css';
import axios from '../../apis/interceptor';
import DocumentToolbar from './DocNavbar';
import { useThemeStore } from '../../stores/ThemeStore';
import { useUserStore } from '../../stores/UserStore';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { QuillBinding } from 'y-quill';
import { useParams } from 'react-router-dom';
import { DOCUMENTS } from '../../apis/Endpoints';
import { GetDocumentContent } from './DocsFunctions';

// Register Quill modules
Quill.register('modules/imageResize', QuillResizeImage);
Quill.register('modules/cursors', QuillCursors);

interface AwarenessUser {
  name: string;
  color: string;
}

const DocPage: React.FC = () => {
  const { id: roomName } = useParams<{ id: string }>();
  const { user } = useUserStore();
  const { theme } = useThemeStore();
  const [content, setContent] = useState<string>('Start Typing');

  const quillRef = useRef<ReactQuill | null>(null);
  const ydocRef = useRef<Y.Doc>(new Y.Doc());
  const providerRef = useRef<WebsocketProvider | null>(null);

  const yText = ydocRef.current.getText('quill');

  // Helper: base64 → Uint8Array
  const base64ToUint8Array = (base64: string): Uint8Array => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  };

 

  // Initialize Yjs WebSocket provider
  useEffect(() => {
    const doc = ydocRef.current;
    const provider = new WebsocketProvider('ws://localhost:4000', roomName as string, doc);
    providerRef.current = provider;

    provider.on('status', (event: { status: string }) => {
      console.log(`WebSocket status: ${event.status}`);
    });

    const awareness = provider.awareness;
    awareness.setLocalStateField('user', {
      name: user?.username || 'Anonymous',
      color: randomHexColor(),
    } as AwarenessUser);

    return () => {
      provider.disconnect();
      doc.destroy();
    };
  }, [roomName, user?.username]);

  // Apply stored Yjs document after WebSocket sync
  useEffect(() => {
    const fetchAndApply = async () => {
      const operations = await GetDocumentContent(roomName as string );
      if (!operations) return ;
      
      const provider = providerRef.current;
      if (!provider) return;

      // Wait until WebSocket sync is done to prevent overwrite
      provider.once('sync', () => {
        const updateBuffer = base64ToUint8Array(operations);
        Y.applyUpdate(ydocRef.current, updateBuffer);
        console.log('Yjs content restored from backend ✅');
      });
    };
    fetchAndApply();
  }, [roomName]);

  // Quill-Yjs binding and remote cursors
  useEffect(() => {
    if (!quillRef.current || !providerRef.current) return;

    const editor = quillRef.current.getEditor();
    const provider = providerRef.current;
    const awareness = provider.awareness;

    const binding = new QuillBinding(yText, editor, awareness);
    const cursors: any = editor.getModule('cursors');

    const renderRemoteCursors = () => {
      cursors.clearCursors();
      awareness.getStates().forEach((state, clientId) => {
        const userInfo = (state as any).user as AwarenessUser | undefined;
        if (!userInfo) return;
        if (clientId !== awareness.clientID) {
          cursors.createCursor(String(clientId), userInfo.name, userInfo.color);
        }
      });
    };

    awareness.on('update', renderRemoteCursors);

    return () => {
      binding.destroy();
      awareness.off('update', renderRemoteCursors);
      cursors.clearCursors();
    };
  }, [yText]);

  // Quill toolbar and modules
  const modules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
    clipboard: { matchVisual: false },
    imageResize: { modules: ['Resize', 'DisplaySize', 'Toolbar'] },
    cursors: true,
  };

  return (
    <div
      className={`flex flex-col h-screen px-4 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      <DocumentToolbar />

      <div className="flex-1 overflow-auto">
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={modules}
          theme="snow"
          className={`
            h-[600px] w-full
            [&_.ql-toolbar]:flex [&_.ql-toolbar]:gap-3
            [&_.ql-toolbar_button]:w-10 [&_.ql-toolbar_button]:h-10 [&_.ql-toolbar_button]:p-2 [&_.ql-toolbar_button]:rounded-lg
            [&_.ql-toolbar_button_svg]:w-6 [&_.ql-toolbar_button_svg]:h-6
            text-base
            ${theme === 'dark' ? 'ql-dark' : ''}
          `}
        />
      </div>
    </div>
  );
};

function randomHexColor(): string {
  const red = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  const green = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  const blue = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  return `#${red}${green}${blue}`;
}

export default DocPage;
