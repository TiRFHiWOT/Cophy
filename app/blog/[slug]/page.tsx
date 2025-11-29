import { notFound } from "next/navigation";
import Image from "next/image";
import blogData from "@/data/blog.json";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/formatters";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const posts = blogData as BlogPost[];
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container px-4 py-8 max-w-4xl mx-auto">
      <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden bg-muted">
        <Image
          src={post.image || "https://via.placeholder.com/1024x400?text=Blog"}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/1024x400?text=Blog";
          }}
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
