"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { Loader2 } from "lucide-react";

export default function ReviewsClient() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async (pageNum: number) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.clean7.in";
      const res = await fetch(`${apiUrl}/reviews?page=${pageNum}&limit=12`);
      const json = await res.json();
      if (json.success && json.data && Array.isArray(json.data.reviews)) {
        const fetchedReviews = json.data.reviews;
        if (fetchedReviews.length < 12) {
          setHasMore(false);
        }
        setReviews((prev) => (pageNum === 1 ? fetchedReviews : [...prev, ...fetchedReviews]));
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchReviews(nextPage);
  };

  return (
    <>
      <Navbar />
      <main className="pt-[120px] pb-[100px] px-[24px] md:px-[48px] bg-[var(--ground)] min-h-screen">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-[64px]">
            <h1
              className="text-[40px] md:text-[56px] lg:text-[72px] text-[var(--ink)] mb-[24px] leading-[1.05]"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Customer Reviews
            </h1>
            <p className="text-[var(--ink-soft)] text-[18px] leading-[1.7] max-w-[600px] mx-auto">
              See what our customers are saying about their Clean7 experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {reviews.map((r, idx) => {
              const name = r.order?.customer?.fullName || "Verified Customer";
              const avatar = name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <ScrollReveal delay={(idx % 12) * 50} key={r.id || idx} className="h-full">
                  <div className="bg-[var(--card)] rounded-[24px] p-[32px] sm:p-[40px] shadow-sm border border-[var(--line)] flex flex-col justify-between h-full">
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill={star <= r.rating ? "var(--gold)" : "none"}
                            stroke={star <= r.rating ? "var(--gold)" : "var(--line)"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-[15px] text-[var(--ink)] leading-[1.6] mb-[32px]">
                        &quot;{r.description || "Excellent service, highly recommended!"}&quot;
                      </p>
                    </div>
                    <div className="pt-[24px] border-t border-[var(--line)] flex items-center gap-[16px]">
                      <div className="w-[48px] h-[48px] rounded-full bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] font-medium text-[16px]">
                        {avatar}
                      </div>
                      <div>
                        <h4
                          className="text-[17px] text-[var(--ink)] font-medium mb-[2px]"
                          style={{ fontFamily: "var(--font-fraunces)" }}
                        >
                          {name}
                        </h4>
                        <p className="text-[13px] text-[var(--ink-soft)]">
                          {new Date(r.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {loading && (
            <div className="flex justify-center mt-12">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--gold)]" />
            </div>
          )}

          {!loading && hasMore && reviews.length > 0 && (
            <div className="flex justify-center mt-16">
              <button
                onClick={loadMore}
                className="bg-[var(--gold)] text-[var(--card)] px-[32px] py-[16px] rounded-[16px] font-bold text-[16px] hover:opacity-90 transition-opacity"
              >
                Load More
              </button>
            </div>
          )}

          {!loading && reviews.length === 0 && (
            <div className="text-center py-20 text-[var(--ink-soft)] text-lg">
              No reviews available yet.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
