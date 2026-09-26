"use client";

import React, { useState } from "react";
import { WixMadeForDisplayFont } from "@/app/fonts";
import { SUPPORT_CONFIG } from "@/app/lib/support-config";
import { Send, CheckCircle2, AlertCircle, Loader2, RefreshCw } from "lucide-react";

interface FormState {
  name: string;
  contact: string;
  orderId: string;
  service: string;
  issueType: string;
  message: string;
  _gotcha: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  contact?: string;
  message?: string;
}

const initialFormState: FormState = {
  name: "",
  contact: "",
  orderId: "",
  service: "",
  issueType: "",
  message: "",
  _gotcha: "",
};

export default function SupportForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  const validateField = (field: keyof FormState, value: string): string | undefined => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Full name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return undefined;
      case "contact": {
        const trimmed = value.trim();
        if (!trimmed) return "Email or phone number is required.";
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
        const digits = trimmed.replace(/\D/g, "");
        const isPhone = digits.length >= 10 && digits.length <= 15;
        if (!isEmail && !isPhone) {
          return "Please enter a valid email (e.g. name@example.com) or 10-digit mobile number.";
        }
        return undefined;
      }
      case "message":
        if (!value.trim()) return "Message cannot be empty.";
        if (value.trim().length < 10) return "Please provide at least 10 characters with details of your request.";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name as keyof FormState, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name as keyof FormState, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all required fields as touched
    setTouched({ name: true, contact: true, message: true });

    const nameErr = validateField("name", formData.name);
    const contactErr = validateField("contact", formData.contact);
    const messageErr = validateField("message", formData.message);

    if (nameErr || contactErr || messageErr) {
      setErrors({ name: nameErr, contact: contactErr, message: messageErr });
      return;
    }

    setStatus("loading");
    setServerMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.clean7.in";
      const res = await fetch(`${apiUrl.replace(/\/$/, "")}/enquiries/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        setServerMessage(
          data.message ||
          "Your support request has been submitted. Our team will review and contact you shortly."
        );
      } else {
        setStatus("error");
        setServerMessage(
          data.message ||
          "We encountered an issue submitting your request. Please call or email us directly."
        );
      }
    } catch (err) {
      console.error("Support form submit error:", err);
      setStatus("error");
      setServerMessage(
        "Network connection error. Please check your connection or contact us via phone or email."
      );
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setTouched({});
    setErrors({});
    setStatus("idle");
    setServerMessage("");
  };

  const inputClass =
    "w-full rounded-xl border border-[var(--line)] bg-[var(--card)] px-4 py-3.5 text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-soft)]/50 focus:border-[var(--gold)] focus:outline-hidden focus:ring-2 focus:ring-[var(--gold)]/20 transition-all duration-200";
  const labelClass = "block text-sm font-medium text-[var(--ink)] mb-2";

  return (
    <section id="contact-support-form" className="py-12 md:py-16 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 sm:p-10 md:p-12 shadow-sm">
          {/* Header */}
          <div className="mb-8">
            <h2
              className="text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              Send Support a Message
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--ink-soft)]">
              Fill in the details below and a Clean7 representative will get back to you promptly.
            </p>
          </div>

          {/* Success State */}
          {status === "success" ? (
            <div
              className="rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-8 text-center animate-in fade-in duration-300"
              role="status"
              aria-live="polite"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3
                className="text-xl font-semibold text-[var(--ink)] mb-2"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                Thank you for contacting Clean7!
              </h3>
              <p className="text-sm sm:text-base text-[var(--ink-soft)] max-w-md mx-auto leading-relaxed mb-6">
                {serverMessage}
              </p>
              {formData.orderId && (
                <div className="inline-block px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--line)] text-xs text-[var(--ink-soft)] mb-6">
                  Referenced Order ID: <span className="font-semibold text-[var(--ink)]">#{formData.orderId}</span>
                </div>
              )}
              <div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--line)] bg-[var(--card)] text-sm font-semibold text-[var(--ink)] hover:border-[var(--gold)] transition-colors cursor-pointer"
                >
                  <RefreshCw size={14} />
                  <span>Send another message</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Honeypot field (hidden from legitimate users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="support-gotcha">Do not fill this field</label>
                <input
                  id="support-gotcha"
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._gotcha}
                  onChange={handleChange}
                />
              </div>

              {/* Error banner */}
              {status === "error" && (
                <div
                  className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 flex items-start gap-3 text-red-700 dark:text-red-300 text-sm"
                  role="alert"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <div className="leading-snug">{serverMessage}</div>
                </div>
              )}

              {/* Row 1: Name and Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="support-name" className={labelClass}>
                    Full Name <span className="text-[var(--gold)]">*</span>
                  </label>
                  <input
                    id="support-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`${inputClass} ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    disabled={status === "loading"}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="support-contact" className={labelClass}>
                    Email or Phone <span className="text-[var(--gold)]">*</span>
                  </label>
                  <input
                    id="support-contact"
                    name="contact"
                    type="text"
                    required
                    autoComplete="email tel"
                    placeholder="e.g. rahul@example.com or 9876543210"
                    value={formData.contact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.contact}
                    aria-describedby={errors.contact ? "contact-error" : undefined}
                    className={`${inputClass} ${errors.contact ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    disabled={status === "loading"}
                  />
                  {errors.contact && (
                    <p id="contact-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                      {errors.contact}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Order ID (Optional) */}
              <div>
                <label htmlFor="support-order-id" className={labelClass}>
                  Order ID <span className="text-xs font-normal text-[var(--ink-soft)]">(Optional)</span>
                </label>
                <input
                  id="support-order-id"
                  name="orderId"
                  type="text"
                  placeholder="e.g. #624064 (from your app orders tab)"
                  value={formData.orderId}
                  onChange={handleChange}
                  className={inputClass}
                  disabled={status === "loading"}
                />
              </div>

              {/* Row 3: Service and Issue Type Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="support-service" className={labelClass}>
                    Service
                  </label>
                  <select
                    id="support-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m5%208%205%205%205-5z%22%20fill%3D%22%23666%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10`}
                    disabled={status === "loading"}
                  >
                    <option value="">Select a service (optional)</option>
                    {SUPPORT_CONFIG.services.map((svc) => (
                      <option key={svc} value={svc}>
                        {svc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="support-issue-type" className={labelClass}>
                    Issue Type
                  </label>
                  <select
                    id="support-issue-type"
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m5%208%205%205%205-5z%22%20fill%3D%22%23666%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10`}
                    disabled={status === "loading"}
                  >
                    <option value="">Select issue category (optional)</option>
                    {SUPPORT_CONFIG.issueTypes.map((issue) => (
                      <option key={issue} value={issue}>
                        {issue}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Message Textarea */}
              <div>
                <label htmlFor="support-message" className={labelClass}>
                  Message <span className="text-[var(--gold)]">*</span>
                </label>
                <textarea
                  id="support-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Please describe your question, issue, or feedback in detail..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${inputClass} min-h-[140px] resize-y ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  disabled={status === "loading"}
                />
                {errors.message ? (
                  <p id="message-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    {errors.message}
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs text-[var(--ink-soft)]/70">
                    Please provide sufficient detail so we can route your ticket directly to the right specialist.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={
                    status === "loading" ||
                    !formData.name.trim() ||
                    !formData.contact.trim() ||
                    !formData.message.trim() ||
                    !!errors.name ||
                    !!errors.contact ||
                    !!errors.message
                  }
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[var(--gold)] text-white text-[15px] font-semibold tracking-wide hover:bg-[var(--brass)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm active:scale-[0.99] cursor-pointer"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
