"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl bg-[var(--ink)]/5 px-4 py-4 text-[16px] text-[var(--ink)] placeholder:text-[var(--ink)]/40 transition-colors focus:bg-[var(--ink)]/10 focus:outline-none border-none";

const labelClass =
  "mb-2 block text-[14px] md:text-[15px] font-medium text-[var(--gold)]";

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
        className="rounded-2xl bg-[var(--ink)]/5 px-6 py-10 text-center"
        role="status"
      >
        <p className="text-[18px] font-semibold text-[var(--gold)]">
          Thank you for reaching out.
        </p>
        <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-soft)]">
          We usually respond within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[16px] font-semibold text-[var(--ink)] underline decoration-[var(--ink)]/40 underline-offset-4 transition-colors hover:decoration-[var(--ink)]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
      <div className="pt-2">
        <button
          type="submit"
          className="w-full rounded-full bg-[var(--gold)] px-8 py-3.5 text-[16px] font-semibold text-[#fff] shadow-lg shadow-[var(--gold)]/30 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-[0.99] sm:w-auto"
        >
          Send message
        </button>
      </div>
    </form>
  );
}
