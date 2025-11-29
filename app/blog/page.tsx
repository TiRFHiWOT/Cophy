import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import blogData from "@/data/blog.json";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/formatters";

export default function BlogPage() {
  const posts = blogData as BlogPost[];

  return (
    <div className="container px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Archers Coffee Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              <div className="relative h-48 w-full bg-muted">
                <Image
                  src={
                    post.image ||
                    "https://via.placeholder.com/400x200?text=Blog"
                  }
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/400x200?text=Blog";
                  }}
                />
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  {formatDate(post.date)} • {post.author}
                </p>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
