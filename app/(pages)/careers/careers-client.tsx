"use client";

import { useEffect, useState, useRef } from "react";
import { PageSectionsAnimation } from "@/app/components/animations/PageAnimations";
import { getLenisInstance } from "@/app/lib/lenis-instance";

interface Career {
  id: string;
  name: string;
  description: string;
}

export function CareersClient() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experienceSummary, setExperienceSummary] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.clean7.in";

  useEffect(() => {
    fetch(`${apiUrl}/careers`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          setCareers(res.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [apiUrl]);

  useEffect(() => {
    const lenis = getLenisInstance();
    if (selectedCareer) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [selectedCareer]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [experienceSummary]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCareer || !resume || !experienceSummary.trim()) return;

    setSubmitting(true);
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("experienceSummary", experienceSummary);
    formData.append("resume", resume);

    try {
      const res = await fetch(`${apiUrl}/careers/${selectedCareer.id}/apply`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        let errorMsg = "Failed to submit application";
        if (typeof data.error === "string") {
          errorMsg = data.error;
        } else if (data.error && typeof data.error === "object") {
          errorMsg = data.error.message || JSON.stringify(data.error);
        }
        alert(errorMsg);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageSectionsAnimation sequentialSections={true} className="w-full">
      <div
        id="open-positions"
        className="page-section flex flex-col md:flex-row md:items-center md:justify-between mb-8 border-b border-[var(--line)] pb-4"
      >
        <h3 className="text-3xl font-bold font-serif">Open Positions</h3>
        <p className="text-[var(--ink-soft)] mt-2 md:mt-0">
          Join our mission to deliver premium care and exceptional experiences.
        </p>
      </div>

      {loading ? (
        <div className="page-section text-center text-[var(--ink-soft)] py-12">
          Loading open positions...
        </div>
      ) : careers.length === 0 ? (
        <p className="page-section text-center text-[var(--ink-soft)] py-12">
          There are currently no open positions. Please check back later.
        </p>
      ) : (
        <div className="page-section flex flex-col gap-4 mb-24">
          {careers.map((career) => (
            <div
              key={career.id}
              className="page-card group flex flex-col md:flex-row md:items-center justify-between p-6 border border-[var(--line)] rounded-2xl bg-[var(--card)] hover:border-[var(--gold)] transition-all"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div>
                  <h4 className="font-semibold text-lg text-[var(--foreground)]">
                    {career.name}
                  </h4>
                  <p className="text-sm text-[var(--ink-soft)] line-clamp-1">
                    {career.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex justify-end">
                <button
                  className="bg-[var(--gold)] hover:brightness-110 text-white px-6 py-2 rounded-full font-semibold cursor-pointer transition-all"
                  onClick={() => {
                    setSelectedCareer(career);
                    setSuccess(false);
                    setFullName("");
                    setEmail("");
                    setPhone("");
                    setExperienceSummary("");
                    setResume(null);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Section */}
      <div className="page-section grid grid-cols-1 md:grid-cols-2 gap-8 p-8 border border-[var(--line)] rounded-3xl bg-[var(--card)]">
        <div className="flex flex-col md:flex-row gap-6 items-start md:border-r border-[var(--line)] md:pr-8">
          <div className="w-16 h-16 flex-shrink-0 rounded-full border border-dashed border-[var(--gold)] flex items-center justify-center text-[var(--gold)]">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2 font-serif">
              Don't see the right role?
            </h4>
            <p className="text-sm text-[var(--ink-soft)] mb-6">
              We're always looking for talented people. Share your profile with
              us and we'll reach out when a suitable opportunity comes up.
            </p>
            <button className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-white px-6 py-2.5 font-semibold transition-colors text-sm">
              Send Your Resume
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <p className="text-xs text-[var(--ink-soft)] mt-4 flex items-center">
              <svg
                className="w-3.5 h-3.5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Your information is safe with us.
            </p>
          </div>
        </div>
        <div className="md:pl-8">
          <h4 className="text-xl font-semibold mb-6 font-serif text-center md:text-left">
            More reasons to join Clean7
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center text-[var(--gold)] mb-2 border border-[var(--line)] rounded-xl bg-[var(--background)]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-3-3v6m-9 1V7a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span className="text-xs text-[var(--ink-soft)]">
                Health Insurance
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center text-[var(--gold)] mb-2 border border-[var(--line)] rounded-xl bg-[var(--background)]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </div>
              <span className="text-xs text-[var(--ink-soft)]">
                Learning Allowance
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center text-[var(--gold)] mb-2 border border-[var(--line)] rounded-xl bg-[var(--background)]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-xs text-[var(--ink-soft)]">
                Paid Time Off
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center text-[var(--gold)] mb-2 border border-[var(--line)] rounded-xl bg-[var(--background)]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="text-xs text-[var(--ink-soft)]">
                Team Events
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {selectedCareer && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden animate-[modalSlideUp_0.2s_ease-out]">
            <div className="p-6 border-b border-[var(--line)] shrink-0">
              <h3 className="text-xl font-bold font-serif text-[var(--foreground)]">
                Apply for {selectedCareer.name}
              </h3>
              <p className="text-sm text-[var(--ink-soft)] mt-1">
                Fill out the form below to apply for this position.
              </p>
            </div>

            <div className="p-6 overflow-y-auto" data-lenis-prevent="true">
              {success ? (
                <div className="py-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--background)] text-[var(--gold)] flex items-center justify-center mx-auto mb-4 border border-[var(--gold)] shadow-[0_0_15px_var(--gold)]">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-[var(--foreground)]">
                    Application Submitted!
                  </h4>
                  <p className="text-[var(--ink-soft)] mt-2 text-sm">
                    Thank you for applying. We will review your application and
                    get back to you soon.
                  </p>
                  <button
                    className="mt-6 w-full bg-[var(--gold)] text-white font-semibold rounded-full px-4 py-3 hover:bg-[var(--gold-bright)] transition-colors"
                    onClick={() => setSelectedCareer(null)}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5 flex flex-col">
                    <label
                      htmlFor="fullName"
                      className="text-sm font-medium text-[var(--foreground)]"
                    >
                      Full Name
                    </label>
                    <input
                      className="rounded-xl border border-[var(--line)] bg-[var(--background)] text-[var(--foreground)] px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-colors"
                      id="fullName"
                      required
                      value={fullName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFullName(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-[var(--foreground)]"
                    >
                      Email
                    </label>
                    <input
                      className="rounded-xl border border-[var(--line)] bg-[var(--background)] text-[var(--foreground)] px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-colors"
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-[var(--foreground)]"
                    >
                      Phone Number
                    </label>
                    <input
                      className="rounded-xl border border-[var(--line)] bg-[var(--background)] text-[var(--foreground)] px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-colors"
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPhone(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label
                      htmlFor="experienceSummary"
                      className="text-sm font-medium text-[var(--foreground)]"
                    >
                      Experience Summary
                    </label>
                    <textarea
                      ref={textareaRef}
                      className="rounded-xl border border-[var(--line)] bg-[var(--background)] text-[var(--foreground)] px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-colors min-h-[100px] max-h-[500px] resize-none overflow-y-auto"
                      id="experienceSummary"
                      required
                      placeholder="Briefly describe your relevant experience..."
                      value={experienceSummary}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setExperienceSummary(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label
                      htmlFor="resume"
                      className="text-sm font-medium text-[var(--foreground)]"
                    >
                      Resume (PDF, DOCX)
                    </label>
                    <input
                      className="rounded-xl border border-[var(--line)] bg-[var(--background)] text-[var(--ink-soft)] px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-colors file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[var(--line)] file:text-[var(--foreground)] hover:file:bg-opacity-80"
                      id="resume"
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setResume(e.target.files?.[0] || null)
                      }
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      className="flex-1 rounded-full border border-[var(--line)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--line)] transition-colors"
                      onClick={() => setSelectedCareer(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-full bg-[var(--gold)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--gold-bright)] transition-colors disabled:opacity-50"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </PageSectionsAnimation>
  );
}
