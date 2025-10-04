
import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import QuillResizeImage from "quill-resize-image";
import "react-quill/dist/quill.snow.css";
import DocumentToolbar from "./DocNavbar";
import { useThemeStore } from "../../stores/ThemeStore";

Quill.register("modules/imageResize", QuillResizeImage);

const DocPage: React.FC = () => {
  const { theme } = useThemeStore();
  const [content, setContent] = useState<string>("Start Typing");
  const [deltaContent, setDeltaContent] = useState<any>(null);
  const [fontSize, setFontSize] = useState<string>("text-base");
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    try {
      setDeltaContent(content);
    } catch (err) {
      console.error("Error converting HTML to Delta:", err);
    }
  }, [content]);

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
  };

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: { matchVisual: false },
    imageResize: { modules: ["Resize", "DisplaySize", "Toolbar"] },
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (!input.files) return;
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const range = quillRef.current?.getEditor().getSelection();
        if (range) {
          quillRef.current
            ?.getEditor()
            .insertEmbed(range.index, "image", reader.result);
        }
      };
      reader.readAsDataURL(file);
    };
  };

  return (
    <div
      className={`flex flex-col h-screen px-4 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
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
            ${fontSize}
            ${theme === "dark" ? "ql-dark" : ""}
          `}
        />
      </div>

      
    </div>
  );
};

export default DocPage;

