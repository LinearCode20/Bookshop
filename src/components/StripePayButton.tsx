"use client";

import { Button } from "./ui/button";

interface StripePayButtonProps {
  btnText: string; // define prop type
}

export default function StripePayButton({ btnText }: StripePayButtonProps) {
  const handleClick = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
    });

    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <Button  onClick={handleClick} className="btn primary">[ {btnText} ]</Button>
  );
}
