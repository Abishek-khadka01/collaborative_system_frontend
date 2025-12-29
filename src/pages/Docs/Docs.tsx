  import React, { useEffect, useRef, useState } from 'react';
  import ReactQuill, { Quill } from 'react-quill';
  import QuillResizeImage from 'quill-resize-image';
  import QuillCursors from 'quill-cursors';
  import 'react-quill/dist/quill.snow.css';
  import axios from '../../apis/interceptor'
  import DocumentToolbar from './DocNavbar';
  import { useThemeStore } from '../../stores/ThemeStore';
  import { useUserStore } from '../../stores/UserStore';
import { useNavigate } from 'react-router-dom';
  import * as Y from 'yjs';
  import { WebsocketProvider } from 'y-websocket';
  import { QuillBinding } from 'y-quill';
  import { useParams } from 'react-router-dom';
  import { DOCUMENTS } from '../../apis/Endpoints';
  import type { Member } from './DocNavbar';
  // Register Quill modules
  Quill.register('modules/imageResize', QuillResizeImage);
  Quill.register('modules/cursors', QuillCursors);


  interface AwarenessUser {
    name: string;
    color: string;
  }

  const DocPage: React.FC = () => {
    const { theme } = useThemeStore();
    const { user } = useUserStore();
    const { id: roomName } = useParams();
    const navigate = useNavigate()
    const [content, setContent] = useState<string>('Start Typing');
    const [documentName, setDocumentName] = useState<string>('');
    const [members, setMembers] = useState<Member[]>([]);

    // Quill + Yjs
    const quillRef = useRef<ReactQuill | null>(null);
    const ydocRef = useRef<Y.Doc>(new Y.Doc());
    const providerRef = useRef<WebsocketProvider | null>(null);
    const yText = ydocRef.current.getText('quill');

    
    useEffect(() => {
      (async () => {
        console.log(`The roomname is ${roomName}`)
        const response = await axios.get(`${DOCUMENTS}/${roomName}`);

        if(response.status ==400){
          alert(`NO access to the document`)
          navigate('/dashboard')
        }
        console.log(response)

        const result = response.data.data
        console.log(result)

        if (result.length > 0) {
          setDocumentName(result[0].Document.documentname);
        }

        const extractedMembers = result.map((item: any) => ({
          id: item.User.id,
          username: item.User.username,
          avatar: item.User.profilepicture,
        }));
        console.log(`The extracted members is ${extractedMembers}`)
        setMembers(extractedMembers);
      })();
    }, [roomName]);


    useEffect(() => {
      const doc = ydocRef.current;

      const provider = new WebsocketProvider(
        `ws://localhost:4000/documents/${user.accessToken}`,
        roomName!,
        doc
      );
      providerRef.current = provider;

      provider.on('status', (event: { status: string }) => {
        console.log(`WebSocket status: ${event.status}`);
      });

      // Awareness (cursor syncing)
      provider.awareness.setLocalStateField('user', {
        name: user?.username,
        color: randomHexColor(),
      } as AwarenessUser);

      return () => {
        provider.disconnect();
        doc.destroy();
      };
    }, [roomName, user?.username]);

    // -------------------------------------------------------
    // BIND Yjs to Quill
    // -------------------------------------------------------
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
    }, [quillRef.current, providerRef.current]);

    // -------------------------------------------------------
    // QUILL CONFIG
    // -------------------------------------------------------
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

    // -------------------------------------------------------
    // RENDER
    // -------------------------------------------------------
    return (
      <div
        className={`flex flex-col h-screen px-4 transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gray-900 text-gray-100'
            : 'bg-white text-gray-900'
        }`}
      >
        <DocumentToolbar
          documentName={documentName}
          setDocumentName={setDocumentName}
          onAddMember={(user) =>
            setMembers((prev : any) => [
              ...prev,
              {
                id: user.id,
                username: user.username,
                avatar: user.profile,
              },
            ])
          }
          onSave={() => console.log('Save Pressed')}
          onRename={() => console.log('Rename Pressed')}
          onMakeAdmin={() => console.log('Make Admin Pressed')}
          onConvertToPDF={() => console.log('Convert PDF Pressed')}
          members={ members}
        />

        <div className="flex-1 overflow-auto">
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            theme="snow"
            className="h-[600px] w-full text-base"
          />
        </div>
      </div>
    );
  };

  function randomHexColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  export default DocPage;
