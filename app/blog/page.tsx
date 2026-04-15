"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import blogData from "@/data/blog.json";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/formatters";
import { ArrowRight, Search, X, Clock, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function calculateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export default function BlogPage() {
  const allPosts = blogData as BlogPost[];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allPosts.map((post) => post.category)));
    return cats.sort();
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    let filtered = allPosts.filter((post) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      if (selectedCategory !== "all") {
        if (post.category !== selectedCategory) return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    return filtered;
  }, [allPosts, searchQuery, selectedCategory, sortBy]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="bg-lot-paper min-h-screen">
      {/* Hero Strip */}
      <section className="bg-lot-forest text-white py-24 md:py-32">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto text-center">
             <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-lot-amber uppercase">
                Addis Ababa Trade Desk
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-black mb-6 tracking-tighter leading-tight">
              Market Insights
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
              Harvest projections, supply chain technicalities, and origin intelligence direct from Ethiopia.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="py-6 border-b border-lot-earth/20 bg-white">
        <div className="container px-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lot-earth" />
              <Input
                type="text"
                placeholder="Search intel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 rounded-none border-lot-earth/30 focus-visible:ring-1 focus-visible:ring-lot-amber shadow-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lot-earth hover:text-lot-forest"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px] rounded-none border-lot-earth/30 focus:ring-1 focus:ring-lot-amber shadow-none font-bold uppercase text-xs tracking-widest text-lot-forest">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="rounded-none border border-lot-forest shadow-xl">
                <SelectItem value="all" className="font-bold text-xs uppercase tracking-widest cursor-pointer">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="font-bold text-xs uppercase tracking-widest cursor-pointer">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
              <SelectTrigger className="w-full md:w-[200px] rounded-none border-lot-earth/30 focus:ring-1 focus:ring-lot-amber shadow-none font-bold uppercase text-xs tracking-widest text-lot-forest">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="rounded-none border border-lot-forest shadow-xl">
                <SelectItem value="newest" className="font-bold text-xs uppercase tracking-widest cursor-pointer">Newest First</SelectItem>
                <SelectItem value="oldest" className="font-bold text-xs uppercase tracking-widest cursor-pointer">Oldest First</SelectItem>
                <SelectItem value="title" className="font-bold text-xs uppercase tracking-widest cursor-pointer">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 md:py-20">
          <div className="container px-6">
            <h2 className="text-xs font-bold text-lot-earth tracking-widest uppercase mb-8 border-b border-lot-earth/20 pb-4">
              Latest Intel
            </h2>
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block overflow-hidden bg-white border border-lot-earth/20 border-l-4 border-l-lot-amber transition-all duration-300 hover:shadow-xl hover:border-lot-amber/30"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-[300px] md:h-[400px] overflow-hidden border-r border-lot-earth/10">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-lot-forest text-white text-[10px] uppercase tracking-widest font-bold shadow-md">
                        {featuredPost.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-lot-earth mb-6">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {formatDate(featuredPost.date)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {calculateReadingTime(featuredPost.content)} MIN READ
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-black mb-6 text-lot-forest group-hover:text-lot-amber transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lot-earth mb-8 leading-relaxed text-lg line-clamp-3 font-light">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono font-bold uppercase tracking-widest text-lot-amber">
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center text-lot-forest font-bold uppercase text-xs tracking-widest group-hover:gap-2 transition-all">
                        Read Report
                        <ArrowRight className="ml-1 h-4 w-4 text-lot-amber" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          </div>
        </section>
      )}

      {/* Grid */}
      {regularPosts.length > 0 && (
        <section className="py-12 pb-24 md:pb-32">
          <div className="container px-6">
            <h2 className="text-xs font-bold text-lot-earth tracking-widest uppercase mb-8 border-b border-lot-earth/20 pb-4">
              {searchQuery || selectedCategory !== "all"
                ? `Results (${regularPosts.length})` : "Archive Reports"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group h-full flex flex-col bg-white border border-lot-earth/20 hover:border-lot-amber/40 transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-lot-forest border-b border-lot-earth/20">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-2.5 py-1 bg-lot-forest text-white text-[10px] font-bold uppercase tracking-widest">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col p-6">
                      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-lot-earth mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.date)}
                        </div>
                      </div>
                      <h2 className="text-xl font-serif font-black mb-3 text-lot-forest group-hover:text-lot-amber transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-lot-earth line-clamp-3 mb-6 leading-relaxed flex-1 text-sm font-light">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-lot-earth/10">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-lot-amber">
                          {post.author}
                        </span>
                        <ArrowRight className="h-4 w-4 text-lot-forest group-hover:text-lot-amber group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty Space */}
      {filteredPosts.length === 0 && (
        <section className="py-32">
          <div className="container px-6 text-center">
             <Search className="h-10 w-10 mx-auto mb-6 text-lot-earth/30" />
             <h3 className="text-2xl font-serif font-bold text-lot-forest mb-4">No reports found</h3>
             <p className="text-lot-earth mb-8 max-w-sm mx-auto font-light">
               We couldn't find any intelligence reports matching your filters.
             </p>
             <Button
               variant="outline"
               onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
               className="uppercase font-bold tracking-widest text-xs rounded-none border-lot-forest text-lot-forest px-8"
             >
               Clear Filters
             </Button>
          </div>
        </section>
      )}
    </div>
  );
}
