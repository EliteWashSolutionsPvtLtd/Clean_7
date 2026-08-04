import type { Metadata } from "next";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/sections/Footer";
import { Calendar, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "../../components/ui/ScrollReveal";
import { notFound } from "next/navigation";
import { generateHTML } from "@tiptap/html/server";
import { StarterKit } from "@tiptap/starter-kit";
import { Image as TiptapImage } from "@tiptap/extension-image";
import { TaskList, TaskItem } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function getBlog(slug: string) {
  try {
    const res = await fetch(`https://api.clean7.in/catalog/blogs/${slug}`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch blog", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.id);
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.id);

  if (!blog) {
    notFound();
  }

  let htmlContent = blog.content;
  try {
    const jsonContent = JSON.parse(blog.content);
    htmlContent = generateHTML(jsonContent, [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TiptapImage,
      TaskList,
      TaskItem.configure({ nested: true }),
      Typography,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
    ]);
  } catch (e) {
    // Fallback if content is already HTML or not JSON
  }

  const formatCategory = (cat: string) => {
    return cat.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="overflow-clip min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 container-px">
        <div className="max-w-[800px] mx-auto">
          {/* Back button */}
          <ScrollReveal delay={0}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--ink-soft)] hover:text-[var(--gold)] transition-colors mb-8 font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </ScrollReveal>

          {/* Article Header */}
          <ScrollReveal delay={150}>
            <div className="mb-10">
              <div className="flex items-center gap-2 text-[var(--gold)] text-[13px] font-bold mb-5 uppercase tracking-widest">
                <span>{formatCategory(blog.category)}</span>
                <span className="text-[var(--ink-soft)] mx-2 opacity-50">
                  ·
                </span>
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-4xl md:text-[48px] font-bold font-serif mb-6 text-[var(--ink)] leading-[1.15] tracking-tight">
                {blog.title}
              </h1>
              <p className="text-[20px] text-[var(--ink-soft)] leading-relaxed mb-8">
                {blog.excerpt}
              </p>
            </div>
          </ScrollReveal>

          {/* Featured Image */}
          <ScrollReveal delay={300}>
            <div className="w-full h-[320px] md:h-[480px] relative rounded-[24px] overflow-hidden mb-16 shadow-lg border border-[var(--line)]">
              <Image
                src={blog.imageUrl || "/images/services/car-wash.png"}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
