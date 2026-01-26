"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const CookieBanner: React.FC = () => {

    const [showBanner, setShowBanner] = useState(() => {
        if (typeof window !== "undefined") {
            // Only check localStorage on client
            return !localStorage.getItem("cookie-consent");
        }
        return false; // On server, render nothing
    });

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "true");
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col md:flex-row justify-between items-center z-50"
            style={{ gap: "10px" }}
        >
            <p className="text-sm max-w-xl">
                We use cookies to improve your experience on our website. By
                continuing, you agree to our{" "}
                <Link href="/legal#cookiepolicy" className="underline">
                    Cookie Policy
                </Link>.
            </p>
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2 md:mt-0"
                onClick={acceptCookies}
            >
                Accept
            </button>
        </div>
    );
};

export default CookieBanner;
