"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type PaymentUIState =
  | "loading"
  | "pending"
  | "success"
  | "failed"
  | "canceled"
  | "unsubscribe-success"
  | "already-unsubscribed";

interface Props {
  isOpen: boolean;
  pageParms: { tx?: string, status?: string }
  onClose: () => void;
}

export default function PaymentConfirmationPopup({
  isOpen,
  pageParms,
  onClose,
}: Props) {
  const status = pageParms.status;
  const [uiState, setUIState] = useState<PaymentUIState>("loading");
  const router = useRouter();
  // helper functions for API calls are created inside the effect where they are used

  useEffect(() => {
  if (!isOpen) return;

  document.body.style.overflow = "hidden";

    // API helpers
    const handleUnsubscribe = async () => {
      try {
        const tx = pageParms.tx;
        if (!tx) {
          setUIState("failed");
          return;
        }

        const res = await fetch(`/api/unsubscribe?tx=${tx}`);
        const data = await res.json();

        if (data.status === "unsubscribed") {
          setUIState("unsubscribe-success");
        } else if (data.status === "already_unsubscribed") {
          setUIState("already-unsubscribed");
        } else {
          setUIState("failed");
        }
      } catch (err) {
        console.error(err);
        setUIState("failed");
      }
    };

    const handleUpdateTransactionStatus = async () => {
      try {
        const tx = pageParms.tx;
        if (!tx) return;

        await fetch(`/api/transactions/update-status?tx=${tx}&status=canceled`);
      } catch (err) {
        console.error("Failed to update transaction status", err);
      }
    };

  //Show loading immediately (defer to avoid sync setState within effect)
  setTimeout(() => setUIState("loading"), 0);

    //Simulate confirmation delay
    const pendingTimer = setTimeout(() => {
      setUIState("pending");
    }, 800);

    //Resolve final state
    const finalTimer = setTimeout(() => {

      switch (status) {
        case "success":
          setUIState("success");
          break;
        case "canceled":
          // update transactions table and show canceled UI
          handleUpdateTransactionStatus();
          setUIState("canceled");
          break;
        case "failed":
          setUIState("failed");
          break;
        case "Unsubscribe":
          handleUnsubscribe();
          break;
        default:
          setUIState("pending");
      }
    }, 2000);

    return () => {
      clearTimeout(pendingTimer);
      clearTimeout(finalTimer);
    };

    

  }, [isOpen, pageParms, status]);

  const closePopup = () => {
    document.body.style.overflow = "auto";
    onClose();

    //URL rest
    router.replace("/book");
  };

  if (!isOpen) return null;

  const Spinner = () => (
    <div className="spinner" />
  );

  function renderUI(state: PaymentUIState) {
    switch (state) {
      case "loading":
        return (
          <>
            <Spinner />
            <h2 className="text-white text-xl mt-4">
              Preparing result...
            </h2>
          </>
        );

      case "pending":
        return (
          <>
            <Spinner />
            <h2 className="text-gray-400 text-xl mt-4">
              Confirming result...
            </h2>
            <p className="text-white mt-2">
              Please don’t close this window
            </p>
          </>
        );

      case "success":
        return (
          <>
            <h2 className="text-gray-500 text-2xl mt-4">
              Payment confirmed.
            </h2>
            <p className="text-white mt-2">Your Digital Edition is now available.</p>
            <p className="text-white mt-2">Access has been sent to this email address.
            </p>
          </>
        );

      case "failed":
        return (
          <>
            <h2 className="text-gray-500 text-2xl mt-4">
              Payment Failed
            </h2>
            <p className="text-white mt-2">
              Please try again.
            </p>
          </>
        );

      case "canceled":
        return (
          <>
            <h2 className="text-gray-400 text-2xl mt-4">
              Payment Canceled
            </h2>
            <p className="text-white mt-2">
              You canceled the payment.
            </p>
          </>
        );
      case "unsubscribe-success":
        return (
          <>
            <h2 className="text-gray-500 text-2xl mt-4">
              You have been unsubscribed.
            </h2>
            <p className="text-white mt-2">
              You will no longer receive follow-up emails.
            </p>
          </>
        );

      case "already-unsubscribed":
        return (
          <>
            <h2 className="text-gray-500 text-2xl mt-4">
              Already Unsubscribed
            </h2>
            <p className="text-white mt-2">
              You have already unsubscribed earlier.
            </p>
          </>
        );

    }
  }

  return (
    <div className="modal-overlay show">
      <div className="modal show text-center">
        {renderUI(uiState)}

        <button className="modal-close" onClick={closePopup}>
          ×
        </button>
      </div>
    </div>
  );
}
