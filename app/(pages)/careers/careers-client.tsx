"use client";

import { useEffect, useState } from "react";

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
  const [resume, setResume] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/careers`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          setCareers(res.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCareer || !resume) return;

    setSubmitting(true);
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("resume", resume);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/careers/${selectedCareer.id}/apply`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        alert(data.error || "Failed to submit application");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center text-muted-foreground py-12">
        Loading open positions...
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center">Open Positions</h3>
      {careers.length === 0 ? (
        <p className="text-center text-muted-foreground">
          There are currently no open positions. Please check back later.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {careers.map((career) => (
            <div
              key={career.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col"
            >
              <h4 className="text-xl font-semibold mb-2">{career.name}</h4>
              <p className="text-gray-500 mb-6 flex-1 whitespace-pre-wrap">
                {career.description}
              </p>
              <button
                className="bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800 transition-colors w-full"
                onClick={() => {
                  setSelectedCareer(career);
                  setSuccess(false);
                  setFullName("");
                  setEmail("");
                  setPhone("");
                  setResume(null);
                }}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold">
                Apply for {selectedCareer.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Fill out the form below to apply for this position.
              </p>
            </div>

            <div className="p-6">
              {success ? (
                <div className="py-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6"
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
                  <h4 className="text-lg font-medium">
                    Application Submitted!
                  </h4>
                  <p className="text-gray-500 mt-2">
                    Thank you for applying. We will review your application and
                    get back to you soon.
                  </p>
                  <button
                    className="mt-6 w-full bg-black text-white rounded-md px-4 py-2"
                    onClick={() => setSelectedCareer(null)}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5 flex flex-col">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      id="fullName"
                      required
                      value={fullName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFullName(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
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
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
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
                    <label htmlFor="resume" className="text-sm font-medium">
                      Resume (PDF, DOCX)
                    </label>
                    <input
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
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
                      className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                      onClick={() => setSelectedCareer(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
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
    </div>
  );
}
