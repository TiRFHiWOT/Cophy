import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import blogData from "@/data/blog.json";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/formatters";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const posts = blogData as BlogPost[];
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-lot-paper min-h-screen pb-32">
      {/* Header Back Link */}
      <div className="bg-lot-forest border-b border-white/10 pt-32 pb-8">
        <div className="container px-6 max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-lot-amber hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Insights
          </Link>
        </div>
      </div>

      <article className="container px-6 max-w-4xl mx-auto -mt-4 relative z-10">
        {/* Main Post Header */}
        <div className="bg-white border border-lot-earth/20 p-8 md:p-12 shadow-xl border-t-4 border-t-lot-amber mb-12">
           <div className="flex flex-wrap items-center gap-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-lot-earth mb-8 border-b border-lot-earth/20 pb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-lot-amber" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-lot-amber" />
                <span className="text-lot-forest font-mono">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-lot-amber" />
                {post.category}
              </div>
           </div>
           
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-lot-forest leading-tight tracking-tight mb-8">
             {post.title}
           </h1>
           <p className="text-xl md:text-2xl text-lot-earth font-light leading-relaxed border-l-4 border-lot-earth/20 pl-6">
             {post.excerpt}
           </p>
        </div>

        {/* Feature Image */}
        <div className="relative h-[400px] md:h-[500px] w-full mb-12 bg-lot-forest border border-lot-earth/20 shadow-sm">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-90"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lot-forest/40 to-transparent" />
        </div>

        {/* Article Body */}
        <div className="bg-white border border-lot-earth/20 p-8 md:p-16 shadow-sm">
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-lot-forest prose-p:text-lot-earth prose-p:font-light prose-p:leading-loose prose-a:text-lot-amber">
            <div className="whitespace-pre-wrap">{post.content}</div>
          </div>
        </div>
      </article>
    </div>
  );
}
