"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type PaymentUIState =
  | "loading"
  | "pending"
  | "success"
  | "failed"
  | "canceled";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentConfirmationPopup({
  isOpen,
  onClose,
}: Props) {
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [uiState, setUIState] = useState<PaymentUIState>("loading");

  useEffect(() => {
    if (!isOpen) return;

    setVisible(true);
    document.body.style.overflow = "hidden";

    //Show loading immediately
    setUIState("loading");

    //Simulate confirmation delay
    const pendingTimer = setTimeout(() => {
      setUIState("pending");
    }, 800);

    //Resolve final state
    const finalTimer = setTimeout(() => {
      const status = searchParams.get("status");

      switch (status) {
        case "success":
          setUIState("success");
          break;
        case "canceled":
          setUIState("canceled");
          break;
        case "failed":
          setUIState("failed");
          break;
        default:
          setUIState("pending");
      }
    }, 2000);

    return () => {
      clearTimeout(pendingTimer);
      clearTimeout(finalTimer);
    };
  }, [isOpen, searchParams]);

  const closePopup = () => {
    setVisible(false);
    document.body.style.overflow = "auto";
    onClose();
  };

  if (!visible) return null;


const FailedIcon = () => <div className="text-6xl">❌</div>;
const CanceledIcon = () => <div className="text-6xl">🚫</div>;
const Spinner = () => (
  <div className="spinner" />
);
const PendingIcon = () => (
  <div className="text-6xl animate-pulse">⏳</div>
);
const SuccessIcon = () => (
  <div className="text-6xl animate-bounce">✅</div>
);

  function renderUI(state: PaymentUIState) {
  switch (state) {
    case "loading":
      return (
        <>
          <Spinner />
          <h2 className="text-white text-xl mt-4">
            Preparing payment result...
          </h2>
        </>
      );

    case "pending":
      return (
        <>
          <PendingIcon />
          <h2 className="text-yellow-400 text-xl mt-4">
            Confirming your payment
          </h2>
          <p className="text-white mt-2">
            Please don’t close this window
          </p>
        </>
      );

    case "success":
      return (
        <>
          <SuccessIcon />
          <h2 className="text-green-500 text-2xl mt-4">
            Payment Successful 🎉
          </h2>
          <p className="text-white mt-2">
            Your payment has been confirmed.
          </p>
        </>
      );

    case "failed":
      return (
        <>
          <FailedIcon />
          <h2 className="text-red-500 text-2xl mt-4">
            Payment Failed ❌
          </h2>
          <p className="text-white mt-2">
            Please try again.
          </p>
        </>
      );

    case "canceled":
      return (
        <>
          <CanceledIcon />
          <h2 className="text-gray-400 text-2xl mt-4">
            Payment Canceled
          </h2>
          <p className="text-white mt-2">
            You canceled the payment.
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
