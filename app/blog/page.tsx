"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import blogData from "@/data/blog.json";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/formatters";
import { ArrowRight } from "lucide-react";

function BlogPage() {
  const posts = blogData as BlogPost[];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=1920&h=1080&fit=crop"
          alt="Coffee blog"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Green Overlay */}
        <div className="absolute inset-0 bg-[hsl(var(--dark-green))]/80" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="container px-4 relative z-10 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
                BLOG
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto">
                Stories, insights, and updates from the world of specialty
                coffee
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group h-full flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-muted mb-6 rounded-lg">
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
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground mb-3 font-medium">
                        {formatDate(post.date)} • {post.author}
                      </p>
                      <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
