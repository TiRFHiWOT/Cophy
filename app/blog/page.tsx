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

// Calculate reading time (average 200 words per minute)
function calculateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

function BlogPage() {
  const allPosts = blogData as BlogPost[];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allPosts.map((post) => post.category)));
    return cats.sort();
  }, [allPosts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = allPosts.filter((post) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== "all") {
        if (post.category !== selectedCategory) return false;
      }

      return true;
    });

    // Sort posts
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

  // Featured post (most recent)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = filteredPosts.slice(1);

  return (
    <div>
      {/* Search and Filter Bar */}
      <section className="py-8 md:py-12 bg-background border-b">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Dropdown */}
              <Select
                value={sortBy}
                onValueChange={(v) => setSortBy(v as typeof sortBy)}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || selectedCategory !== "all") && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm text-muted-foreground">
                  Active filters:
                </span>
                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="h-7 text-xs"
                  >
                    Search: &quot;{searchQuery}&quot;
                    <X className="ml-1 h-3 w-3" />
                  </Button>
                )}
                {selectedCategory !== "all" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                    className="h-7 text-xs"
                  >
                    Category: {selectedCategory}
                    <X className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Featured Article
                </h2>
                <p className="text-muted-foreground">
                  Our latest story from the world of specialty coffee
                </p>
              </div>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group block overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                      <Image
                        src={
                          featuredPost.image ||
                          "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop"
                        }
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(featuredPost.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {calculateReadingTime(featuredPost.content)} min read
                        </div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed text-lg line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          By {featuredPost.author}
                        </div>
                        <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                          Read Article
                          <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      {regularPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {searchQuery || selectedCategory !== "all"
                    ? `Articles (${regularPosts.length})`
                    : "More Articles"}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {regularPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                        <Image
                          src={
                            post.image ||
                            "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop"
                          }
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col p-6">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.date)}
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {calculateReadingTime(post.content)} min
                          </div>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed flex-1 text-sm">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-xs text-muted-foreground">
                            {post.author}
                          </span>
                          <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                            Read More
                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <section className="py-24 bg-background">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Search className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-4">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery
                    ? `We couldn't find any articles matching "${searchQuery}". Try adjusting your search or filters.`
                    : "No articles match your current filters. Try selecting a different category."}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear all filters
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default BlogPage;
