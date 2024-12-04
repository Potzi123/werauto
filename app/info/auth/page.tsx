import React from "react";

export default function ConfirmEmailPrompt() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Confirm Your Email</h1>
      <p className="text-lg mb-6">
        A confirmation email has been sent to your email address. Please check your inbox and follow the instructions to confirm your email and proceed.
      </p>
      <p className="text-sm text-gray-600">
        If you don&apos;t see the email, please check your spam folder or <a href="#" className="text-blue-500 underline">resend confirmation</a>.
      </p>
    </div>
  );
}
