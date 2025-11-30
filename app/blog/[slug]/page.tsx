import { notFound } from "next/navigation";
import Image from "next/image";
import blogData from "@/data/blog.json";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/formatters";

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
    <article className="container px-4 py-12 max-w-4xl mx-auto">
      <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden bg-muted">
        <Image
          src={post.image || "https://via.placeholder.com/1024x400?text=Blog"}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
      </div>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {formatDate(post.date)} • {post.author} • {post.category}
        </p>
      </div>
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>
        <div className="whitespace-pre-wrap">{post.content}</div>
      </div>
    </article>
  );
}
