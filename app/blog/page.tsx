import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import {
  Search,
  Calendar,
  ArrowRight,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stay updated with expert tips, industry insights, and everything about premium home services.",
};

import { blogs, categories } from "./data";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="overflow-clip min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 container-px">
        <div className="max-w-[1140px] mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <div className="inline-flex px-4 py-1.5 rounded-full border border-[var(--gold)] text-[var(--gold)] text-[11px] font-bold mb-6 tracking-widest uppercase bg-[var(--gold)]/5">
              Our Blog
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold font-serif mb-4 text-[var(--ink)] leading-tight tracking-tight">
                  Insights & <span className="text-[var(--gold)]">Tips</span>
                </h1>
                <p className="text-[var(--ink-soft)] text-lg max-w-md">
                  Stay updated with expert tips, industry insights, and
                  everything about premium home services.
                </p>
              </div>

              <div className="relative w-full md:w-80 lg:w-96 flex-shrink-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--ink-soft)]" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full bg-[var(--ground-soft)] border border-[var(--line)] rounded-[14px] py-[14px] pl-11 pr-4 text-[var(--ink)] text-[15px] focus:outline-none focus:border-[var(--gold)] transition-colors placeholder:text-[var(--ink-soft)] shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                className={`px-[22px] py-[10px] rounded-full text-[14px] font-medium transition-colors border ${
                  idx === 0
                    ? "bg-[var(--gold)] text-[var(--ground)] border-[var(--gold)]"
                    : "bg-[var(--ground-soft)] border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--ink)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link
                href={`/blog/${blog.id}`}
                key={blog.id}
                className="bg-[var(--card)] rounded-[20px] overflow-hidden border border-[var(--line)] hover:border-[var(--gold)]/40 transition-all duration-300 group flex flex-col hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-[240px] relative overflow-hidden bg-[var(--ground-soft)] m-2 rounded-[14px]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6 pt-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[var(--gold)] text-[12px] font-medium mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{blog.date}</span>
                    <span className="text-[var(--ink-soft)] mx-1 opacity-50">
                      ·
                    </span>
                    <span className="text-[var(--gold)]">{blog.category}</span>
                  </div>
                  <h3 className="text-[20px] font-bold text-[var(--ink)] mb-3 leading-snug group-hover:text-[var(--gold)] transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-[var(--ink-soft)] text-[15px] mb-8 flex-grow leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[var(--gold)] text-[14px] font-semibold transition-colors mt-auto group-hover:text-[var(--gold-bright)]">
                    Read More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-16">
            <button className="w-[42px] h-[42px] rounded-[12px] bg-[var(--ground-soft)] border border-[var(--line)] flex items-center justify-center text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors shadow-sm">
              <span className="sr-only">Previous</span>
              <ChevronLeft className="w-[18px] h-[18px]" />
            </button>
            <button className="w-[42px] h-[42px] rounded-[12px] bg-[var(--gold-bright)] text-[var(--ground)] text-[15px] font-medium flex items-center justify-center shadow-md">
              1
            </button>
            <button className="w-[42px] h-[42px] rounded-[12px] bg-[var(--ground-soft)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors text-[15px] font-medium shadow-sm">
              2
            </button>
            <button className="w-[42px] h-[42px] rounded-[12px] bg-[var(--ground-soft)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors text-[15px] font-medium shadow-sm">
              3
            </button>
            <button className="w-[42px] h-[42px] rounded-[12px] bg-[var(--ground-soft)] border border-[var(--line)] flex items-center justify-center text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors shadow-sm">
              <span className="sr-only">Next</span>
              <ChevronRight className="w-[18px] h-[18px]" />
            </button>
          </div>

          {/* Newsletter Section */}
          <div className="mt-20 bg-[var(--card)] border border-[var(--line)] rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-lg">
            {/* Subtle highlight overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/5 to-transparent pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10 w-full md:w-auto">
              <div className="w-[60px] h-[60px] rounded-full bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0 text-[var(--gold)] border border-[var(--gold)]/20 shadow-inner">
                <Mail className="w-[26px] h-[26px]" />
              </div>
              <div>
                <h3 className="text-[22px] font-bold text-[var(--gold)] mb-1.5 font-serif tracking-wide">
                  Stay in the Loop
                </h3>
                <p className="text-[var(--ink-soft)] text-[15px]">
                  Subscribe to our newsletter and never miss the latest tips and
                  updates.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 relative z-10">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[var(--ground-soft)] border border-[var(--line)] rounded-[12px] px-5 py-[14px] flex-grow md:w-[320px] text-[var(--ink)] text-[15px] focus:outline-none focus:border-[var(--gold)] transition-colors placeholder:text-[var(--ink-soft)] shadow-sm"
              />
              <button className="bg-[var(--gold)] text-[var(--ground)] px-8 py-[14px] rounded-[12px] text-[15px] font-bold hover:bg-[var(--gold-bright)] transition-colors whitespace-nowrap shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
