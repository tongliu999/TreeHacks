import Container from "./Container";
import { useState } from "react";

interface EmailPopupProps {
  subject: string;
  body: string;
  onClose: () => void;
}

export default function EmailPopup({ subject, body, onClose }: EmailPopupProps) {
  const [copyStatus, setCopyStatus] = useState<"subject" | "body" | null>(null);

  const copyToClipboard = async (text: string, type: "subject" | "body") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(type);
      setTimeout(() => setCopyStatus(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex items-center justify-center z-10">
      <Container className="items-start gap-4 min-w-[60vw] max-w-[1000px]">
        <h1 className="flex justify-between w-full text-2xl">
          <span>Email Template</span>
          <button onClick={onClose} className="hover:cursor-pointer text-red-600">
            ×
          </button>
        </h1>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Subject</label>
            <div className="flex gap-2">
              <input
                readOnly
                value={subject}
                className="flex-grow p-2 border rounded-lg border-gray-300 bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard(subject, "subject")}
                className="cta-button"
              >
                {copyStatus === "subject" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Body</label>
            <div className="flex gap-2">
              <textarea
                readOnly
                value={body}
                rows={12}
                className="flex-grow p-2 border rounded-lg border-gray-300 bg-gray-50 resize-y"
              />
              <button
                onClick={() => copyToClipboard(body, "body")}
                className="cta-button h-min"
              >
                {copyStatus === "body" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
