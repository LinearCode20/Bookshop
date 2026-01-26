import { useState } from "react";
import StripePayButton from "../StripePayButton";
import Link from "next/link"; // ✅ correct import

interface PopupModalProps {
  popUpOpen: boolean;
  onClose: () => void;
}

export default function PopUp({ popUpOpen, onClose }: PopupModalProps) {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  const isButtonDisabled = !(check1 && check2);

  if (!popUpOpen) return null;

  return (
    <div className={`modal-overlay ${popUpOpen ? "show" : "hide"}`}>
      <div className={`modal ${popUpOpen ? "show" : "hide"}`}>
        <div className="text-left">

          {/* Checkboxes */}
          <div className="flex flex-col gap-3 mt-4">

            <label className="flex flex-wrap items-center gap-2 text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={check1}
                onChange={(e) => setCheck1(e.target.checked)}
                className="h-4 w-4"
              />
              <span>
                I agree to the{" "}
                <Link href="/legal#terms" className="underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/legal#privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <label className="flex items-start gap-2 text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={check2}
                onChange={(e) => setCheck2(e.target.checked)}
                className="h-4 w-4 mt-1"
              />
              <span>
                I consent to immediate access to digital content and acknowledge I lose my right to cancel once the download begins.
              </span>
            </label>

          </div>

          {/* Stripe Button (NOT clickable until both checked) */}
          <div
            className={`mt-6 ${isButtonDisabled ? "pointer-events-none opacity-50" : ""}`}
          >
            <StripePayButton btnText="Digital Edition" />
          </div>

        </div>

        <button className="modal-close" onClick={onClose}>
          ×
        </button>

      </div>
    </div>
  );
}
