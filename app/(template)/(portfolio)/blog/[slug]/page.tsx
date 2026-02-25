import React from "react";
import { notFound } from "next/navigation";
import { getPostData } from "@/lib/posts";
import TerminalSection from "@/components/ui/TerminalSection";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";

// Custom components for MDX
const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4 text-white" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mt-8 mb-4 text-white border-b border-stone-800 pb-2" {...props} />,
  p: (props: any) => <p className="text-stone-300 leading-relaxed mb-4 font-mono" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2 text-stone-400" {...props} />,
  code: (props: any) => <code className="bg-stone-800 px-1.5 py-0.5 rounded text-tint font-mono text-sm" {...props} />,
  pre: (props: any) => <pre className="bg-stone-900 p-4 border border-stone-800 overflow-x-auto mb-6 rounded-sm font-mono text-sm" {...props} />,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* SECTION 1: HEADER */}
      <TerminalSection id="blog-post-header" className="pt-32 pb-16 bg-gradient-to-b from-black to-stone-950">
        <div className="w-full max-w-4xl px-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-stone-500 hover:text-white transition-colors mb-12 font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            Return to Index
          </Link>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-stone-500 font-mono">
              <div className="flex items-center gap-2">
                <Calendar size={12} className="text-stone-600" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={12} className="text-stone-600" />
                <span>5 MIN_READ</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-[1.1]">
              {post.title}
            </h1>

            {post.tags && (
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-stone-900 border border-stone-800 text-stone-400 text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </TerminalSection>

      {/* SECTION 2: CONTENT */}
      <TerminalSection id="blog-content" className="py-16">
        <div className="w-full max-w-4xl px-4">
          <div 
            className="prose prose-invert prose-stone max-w-none"
          >
            {/* @ts-ignore */}
            <MDXRemote source={post.content} components={components} />
          </div>
          
          <div className="mt-24 pt-12 border-t border-stone-800 flex justify-between items-center">
             <div className="space-y-1">
               <p className="text-[10px] uppercase tracking-widest text-stone-600 font-bold">End of Transmission</p>
               <p className="text-stone-500 font-mono text-xs">Thank you for reading.</p>
             </div>
             <Link 
              href="/blog" 
              className="px-6 py-2 border border-stone-800 hover:bg-stone-900 text-[10px] uppercase tracking-[0.2em] font-bold text-white transition-colors"
             >
              Back to Blog
             </Link>
          </div>
        </div>
      </TerminalSection>
    </div>
  );
}
