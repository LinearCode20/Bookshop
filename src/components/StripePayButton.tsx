"use client";

import { Button } from "./ui/button";

export default function StripePayButton() {
  const handleClick = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
    });

    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <Button  onClick={handleClick} className="btn primary">[ RESERVE DIGITAL ACCESS ]</Button>
  );
}
