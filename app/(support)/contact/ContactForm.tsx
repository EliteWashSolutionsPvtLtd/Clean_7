"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-[#E8DFD6] bg-white px-4 py-3 text-[18px] text-[#33302E] placeholder:text-[#91776C]/70 transition-colors focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20";

const labelClass = "mb-1.5 block text-sm font-medium text-[#584E46]";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-[#E8DFD6] bg-[#FBF6F2] px-6 py-10 text-center"
        role="status"
      >
        <p className="text-[18px] font-semibold text-[#33302E]">
          Thank you for reaching out.
        </p>
        <p className="mt-2 text-[18px] leading-relaxed text-[#5E5450]">
          We usually respond within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[16px] font-semibold text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-[#E8DFD6] bg-white p-6 sm:p-8"
    >
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Full Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email Address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          Phone Number
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
          placeholder="10-digit mobile"
        />
      </div>
      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          className={inputClass}
          placeholder="What is this about?"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={`${inputClass} min-h-[140px] resize-y`}
          placeholder="Tell us how we can help"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-orange px-8 py-3.5 text-[18px] font-semibold text-white shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99] sm:w-auto"
      >
        Send message
      </button>
    </form>
  );
}
