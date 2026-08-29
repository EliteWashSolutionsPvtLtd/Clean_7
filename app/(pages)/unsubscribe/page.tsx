"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUnsubscribe = async () => {
    if (!email) return;

    setLoading(true);
    setErrorMessage("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.clean7.in";
      const response = await fetch(`${apiUrl}/newsletters/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
      } else {
        setErrorMessage(data.message || "Failed to unsubscribe");
      }
    } catch (error) {
      setErrorMessage("An error occurred while unsubscribing.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Unsubscribed Successfully</h1>
        <p className="text-gray-600 dark:text-gray-300">
          You have been successfully removed from our mailing list. You will no longer receive newsletter emails from us.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Invalid Link</h1>
        <p className="text-gray-600 dark:text-gray-300">
          The unsubscribe link is invalid or missing the email parameter.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Unsubscribe from Newsletter</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Are you sure you want to unsubscribe <span className="font-semibold text-gray-900 dark:text-white">{email}</span> from our newsletter?
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
          {errorMessage}
        </div>
      )}

      <button
        onClick={handleUnsubscribe}
        disabled={loading}
        className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-red-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Unsubscribing..." : "Confirm Unsubscribe"}
      </button>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <UnsubscribeContent />
        </Suspense>
      </div>
    </div>
  );
}
