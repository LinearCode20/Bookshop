import { Settings, Shield, ShieldOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SettingModel() {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaLoading, setMfaLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMfaStatus = async () => {
      try {
        const res = await fetch("/api/auth/2fa/status");
        if (res.ok) {
          const data = await res.json();
          setMfaEnabled(data.mfa_enabled);
        }
      } catch (error) {
        console.error("Failed to fetch 2FA status:", error);
      }
    };
    fetchMfaStatus();
  }, []);

  const handleEnable2FA = () => {
    setSettingsModalOpen(false);
    router.push("/auth/mfa-setup?from=settings");
  };

  const handleDisable2FA = async () => {
    setMfaLoading(true);
    try {
      const res = await fetch("/api/auth/2fa/disable", {
        method: "POST",
      });

      if (res.ok) {
        setMfaEnabled(false);
        toast.success("2FA disabled successfully");
        setSettingsModalOpen(false);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to disable 2FA");
      }
    } catch (error) {
      toast.error("Failed to disable 2FA");
    } finally {
      setMfaLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setSettingsModalOpen(true)}
        className="border border-white px-4 py-2 text-white hover:bg-white hover:text-black transition"
        title="2FA Settings"
      >
        <Settings size={18} />
      </button>

      {settingsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl text-white font-semibold">
                Two-Factor Authentication
              </h2>
              <button
                onClick={() => setSettingsModalOpen(false)}
                className="text-neutral-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-neutral-800 rounded-lg">
                {mfaEnabled ? (
                  <Shield className="text-green-500" size={24} />
                ) : (
                  <ShieldOff className="text-red-500" size={24} />
                )}
                <div>
                  <p className="text-white font-medium">
                    {mfaEnabled ? "2FA Enabled" : "2FA Disabled"}
                  </p>
                  <p className="text-neutral-400 text-sm">
                    {mfaEnabled
                      ? "Your account is protected with two-factor authentication"
                      : "Your account is not protected with two-factor authentication"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                {mfaEnabled ? (
                  <button
                    onClick={handleDisable2FA}
                    disabled={mfaLoading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {mfaLoading ? "Disabling..." : "Disable 2FA"}
                  </button>
                ) : (
                  <button
                    onClick={handleEnable2FA}
                    className="flex-1 bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md transition"
                  >
                    Enable 2FA
                  </button>
                )}
                <button
                  onClick={() => setSettingsModalOpen(false)}
                  className="flex-1 border border-neutral-600 hover:border-neutral-500 text-white px-4 py-2 rounded-md transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
