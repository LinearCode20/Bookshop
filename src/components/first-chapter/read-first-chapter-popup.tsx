import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
const STORAGE_KEY = "chapter_one_email";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  expired?: boolean;
  sendMail?: boolean;
}

export default function EmailModal({
  isOpen,
  onClose,
  expired = false,
  sendMail=false
}: EmailModalProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";

      const savedEmail = localStorage.getItem(STORAGE_KEY);
      // Prefill ONLY if saved email exists
      if (savedEmail) {
        setEmail(savedEmail);
      } else {
        setEmail("");
      }

      setError("");
    } else {
      setTimeout(() => setVisible(false), 250);
      document.body.style.overflow = "auto";

      // Reset state on close
      setEmail("");
      setError("");
    }
  }, [isOpen]);

  if (!visible) return null;

  const isValidEmail = (value: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("error");
      toast.error("Email is required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("error");
      toast.error("Please enter a valid email address.");
      return;
    }

    // Save email
    localStorage.setItem(STORAGE_KEY, email);
    const MailType = sendMail ? "No-Mail" : "First-Chapter";
    const emailSubject = sendMail ? "You're on the list!" : "Chapter One - Trapped";
    sendEmail(email, emailSubject, MailType);
    
    // Close modal
    //onClose();
  };

  // send email
  const sendEmail = async (Email: string, Subject: string, emailType: string) => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: Email,
          subject: Subject,
          emailType: emailType
        }),
      });

      const data = await res.json();
      if (res.ok || data.success) {
        onClose(); //close the popup
        toast.success("Email send successfully.");

        if(emailType !== "No-Mail") {
          // Open Chapter 1 PDF in new tab
          window.open("/pdfs/chapter-one.pdf", "_blank", "noopener,noreferrer");
        }
        // Open Chapter 1 PDF in new tab
        //window.open("/pdfs/chapter-one.pdf", "_blank", "noopener,noreferrer");
      } else {
        const message = data?.message || "Failed to send email.";
        toast.error(message);
        setError("error"); // optional, show in modal
        console.error("API error:", message);
      }
    } catch (err: any) {
      // Network or unexpected error
      toast.error(err.message || "Something went wrong while sending the email.");
      setError(err.message || "Unexpected error occurred.");
      console.error("Send email error:", err);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <div className={`modal-overlay ${isOpen ? "show" : "hide"}`}>
      <div className={`modal ${isOpen ? "show" : "hide"}`}>

        {expired ? (
          // Show only expired message
          <div className="text-center">
            <h1 className="text-2xl text-gray-400 mb-4">
              This download link has expired.
            </h1>
            <p className="text-white">Please request a new link to access the content.</p>
          </div>
        ) : (
          <>
            <h1 className="modal-subtitle text-2xl text-white">
              Access Full Chapter
            </h1>

            <form className="modal-form" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={handleEmailChange}
              />

              {error && <p className="modal-error"></p>}

              <button type="submit">CONTINUE</button>
            </form>
          </>
        )}
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
