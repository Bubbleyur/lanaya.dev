import React from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import TerminalSection from "@/components/ui/TerminalSection";
import { getSortedPostsData, PostData } from "@/lib/posts";
import BlogHero from "./BlogHero";

export default async function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO */}
      <BlogHero />

      {/* SECTION 2: BLOG POSTS LIST */}
      <TerminalSection id="blog-posts" className="py-24">
        <div className="w-full max-w-5xl px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-1 bg-stone-800" />
            <h2 className="text-xs uppercase tracking-[0.6em] text-stone-600 font-bold whitespace-nowrap">
              Published_Entries
            </h2>
            <div className="h-[1px] w-12 bg-stone-800" />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/blog/${post.slug}`}
                  className="group block p-8 border border-stone-800 bg-stone-900/20 backdrop-blur-sm transition-all duration-300 hover:bg-stone-900/40 relative"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-widest text-stone-500 font-mono">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-stone-600" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-stone-600" />
                        <span>5 MIN_READ</span>
                      </div>
                      {post.tags && (
                        <div className="flex items-center gap-2">
                          <Tag size={12} className="text-stone-600" />
                          <div className="flex gap-2">
                            {post.tags.slice(0, 3).map((tag: string) => (
                              <span key={tag} className="px-2 py-0.5 bg-stone-800/50 text-stone-500 border border-stone-700/50">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-bold text-white transition-colors group-hover:opacity-80">
                        {post.title}
                      </h3>
                      <p className="text-stone-400 font-mono line-clamp-2 leading-relaxed text-sm">
                        {post.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-600 group-hover:text-stone-400 transition-colors">
                      <span>Establish Connection</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-12 border border-dashed border-stone-800 text-center">
                <BookOpen size={48} className="mx-auto text-stone-800 mb-4" />
                <p className="text-stone-500 font-mono italic">No communication logs found in directory.</p>
              </div>
            )}
          </div>
        </div>
      </TerminalSection>
    </div>
  );
}
