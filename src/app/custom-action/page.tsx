"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";

function Page() {
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");
    const [emails, setEmails] = useState<string[]>([""]);
    const [loading, setLoading] = useState(false); // spinner + form lock

    const [invalidFields, setInvalidFields] = useState<{
        category?: boolean;
        level?: boolean;
        emails?: boolean[];
    }>({ emails: [] });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // lock form

        let hasError = false;
        const newInvalidFields: { category?: boolean; level?: boolean; emails?: boolean[] } = {
            emails: [],
        };

        // Validation
        if (!category) {
            toast.error("Please select a type.");
            newInvalidFields.category = true;
            hasError = true;
        }
        if (!level) {
            toast.error("Please select a level.");
            newInvalidFields.level = true;
            hasError = true;
        }

        if (level === "custom") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            emails.forEach((email, index) => {
                if (!email.trim()) {
                    newInvalidFields.emails![index] = true;
                    hasError = true;
                    toast.error(`Email ${index + 1} is required.`);
                } else if (!emailRegex.test(email)) {
                    newInvalidFields.emails![index] = true;
                    hasError = true;
                    toast.error(`Email ${index + 1} is invalid.`);
                }
            });
        }

        setInvalidFields(newInvalidFields);
        if (hasError) {
            setLoading(false);
            return;
        }

        const payload = {
            email: level === "custom" ? emails : [],
            subject: level,
            emailType: category,
        };

        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to send emails");

            toast.success("Emails sent successfully.");

            setCategory("");
            setLevel("");
            setEmails([""]);
            setInvalidFields({ emails: [] });
        } catch (error: any) {
            toast.error(error.message || "Something went wrong while sending emails");
        } finally {
            setLoading(false); // unlock form
        }
    };

    const handleEmailChange = (value: string, index: number) => {
        const updated = [...emails];
        updated[index] = value;
        setEmails(updated);

        setInvalidFields((prev) => {
            const updatedEmails = [...(prev.emails || [])];
            updatedEmails[index] = false;
            return { ...prev, emails: updatedEmails };
        });
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
        if (value) setInvalidFields((prev) => ({ ...prev, category: false }));
    };

    const handleLevelChange = (value: string) => {
        setLevel(value);
        if (value) setInvalidFields((prev) => ({ ...prev, level: false }));
    };

    const addEmailField = () => {
        setEmails([...emails, ""]);
        setInvalidFields((prev) => ({ emails: [...(prev.emails || []), false] }));
    };

    const removeEmailField = (index: number) => {
        setEmails(emails.filter((_, i) => i !== index));
        setInvalidFields((prev) => ({ emails: prev.emails?.filter((_, i) => i !== index) }));
    };

    return (
        <div className="flex min-h-dvh items-center justify-center bg-black text-white">
            <section className="container mx-auto px-6 max-w-3xl text-center">
                <h1 className="mt-3.5 text-2xl tracking-widest">Send Custom Emails</h1>

                <div className="mt-12">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">
                        {/* Select Row */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <select
                                value={category}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                disabled={loading}
                                className={`w-64 bg-neutral-900 border px-4 py-2 text-white focus:outline-none transition ${
                                    invalidFields.category ? "border-red-500" : "border-neutral-700"
                                } ${loading ? "cursor-not-allowed opacity-70" : ""}`}
                            >
                                <option value="">Select Type</option>
                                <option value="1">Refund declined</option>
                                <option value="2">Access issue</option>
                                <option value="3">General support</option>
                                <option value="4">Product update</option>
                            </select>

                            <select
                                value={level}
                                onChange={(e) => handleLevelChange(e.target.value)}
                                disabled={loading}
                                className={`w-64 bg-neutral-900 border px-4 py-2 text-white focus:outline-none transition ${
                                    invalidFields.level ? "border-red-500" : "border-neutral-700"
                                } ${loading ? "cursor-not-allowed opacity-70" : ""}`}
                            >
                                <option value="">Select Level</option>
                                <option value="all">All Users</option>
                                <option value="custom">Custom Email Address</option>
                            </select>
                        </div>

                        {/* Email Fields */}
                        {level === "custom" && (
                            <div className="w-full max-w-md space-y-4">
                                {emails.map((email, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => handleEmailChange(e.target.value, index)}
                                            placeholder="Enter email address"
                                            disabled={loading}
                                            className={`flex-1 bg-neutral-900 border px-4 py-2 text-white placeholder-gray-500 focus:outline-none transition ${
                                                invalidFields.emails?.[index]
                                                    ? "border-red-500"
                                                    : "border-neutral-700"
                                            } ${loading ? "cursor-not-allowed opacity-70" : ""}`}
                                        />
                                        {index === emails.length - 1 && (
                                            <button
                                                type="button"
                                                onClick={addEmailField}
                                                disabled={loading}
                                                className={`p-2 border border-neutral-700 hover:border-green-500 hover:text-green-500 transition rounded ${
                                                    loading ? "cursor-not-allowed opacity-70" : ""
                                                }`}
                                            >
                                                <Plus size={18} />
                                            </button>
                                        )}
                                        {emails.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeEmailField(index)}
                                                disabled={loading}
                                                className={`p-2 border border-neutral-700 hover:border-red-500 hover:text-red-500 transition rounded ${
                                                    loading ? "cursor-not-allowed opacity-70" : ""
                                                }`}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Submit Button */} 
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-white text-black hover:bg-gray-200 px-6 flex items-center justify-center cursor-pointer"
                        >
                            {loading ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-black"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                            ) : (
                                "SUBMIT"
                            )}
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Page;
