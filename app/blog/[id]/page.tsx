import type { Metadata } from "next";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/sections/Footer";
import { Calendar, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs } from "../data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = blogs.find(b => b.id.toString() === resolvedParams.id);
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

export async function generateStaticParams() {
  return blogs.map(blog => ({ id: blog.id.toString() }));
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const blog = blogs.find(b => b.id.toString() === resolvedParams.id);
  
  if (!blog) {
    notFound();
  }

  return (
    <div className="overflow-clip min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 container-px">
        <div className="max-w-[800px] mx-auto">
          {/* Back button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--ink-soft)] hover:text-[var(--gold)] transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          
          {/* Article Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-[var(--gold)] text-[13px] font-bold mb-5 uppercase tracking-widest">
              <span>{blog.category}</span>
              <span className="text-[var(--ink-soft)] mx-2 opacity-50">·</span>
              <Calendar className="w-4 h-4" />
              <span>{blog.date}</span>
            </div>
            <h1 className="text-4xl md:text-[48px] font-bold font-serif mb-6 text-[var(--ink)] leading-[1.15] tracking-tight">
              {blog.title}
            </h1>
            <p className="text-[20px] text-[var(--ink-soft)] leading-relaxed mb-8">
              {blog.excerpt}
            </p>
          </div>

          {/* Featured Image */}
          <div className="w-full h-[320px] md:h-[480px] relative rounded-[24px] overflow-hidden mb-16 shadow-lg border border-[var(--line)]">
            <Image 
              src={blog.image} 
              alt={blog.title} 
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div 
            className="text-[17px] md:text-[18px] [&>p]:text-[var(--ink-soft)] [&>p]:leading-[1.8] [&>p]:mb-7 [&>h3]:text-[28px] [&>h3]:font-bold [&>h3]:font-serif [&>h3]:text-[var(--ink)] [&>h3]:mt-12 [&>h3]:mb-6"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
