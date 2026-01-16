"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentResult() {
  const tx = useSearchParams().get("tx");

  return (
    <div>
      <h1>Thanks!</h1>
      <p>Transaction ID: {tx}</p>
    </div>
  );
}
