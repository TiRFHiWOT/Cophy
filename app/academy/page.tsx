import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import academyData from "@/data/academy.json";
import { AcademyCourse } from "@/types";
import { formatPrice } from "@/lib/formatters";

export default function AcademyPage() {
  const courses = academyData as AcademyCourse[];

  return (
    <div className="container px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Coffee Academy</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          As a CQI and SCA-certified campus, Archers Academy delivers learning
          programs that meet global standards, in an environment customized for
          coffee education.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="relative h-48 w-full bg-muted">
              <Image
                src={
                  course.image ||
                  "https://via.placeholder.com/400x200?text=Course"
                }
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://via.placeholder.com/400x200?text=Course";
                }}
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                  {course.type.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground">
                  {course.level}
                </span>
              </div>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Duration: {course.duration}
                </span>
                <span className="font-bold text-lg">
                  {formatPrice(course.price)}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Enroll Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
