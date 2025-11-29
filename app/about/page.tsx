import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Heart, Leaf } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Coffee,
      title: "Quality",
      description:
        "Our coffees are seasonally sourced and delicately roasted to showcase the hard work and dedication of our producing partners.",
    },
    {
      icon: Heart,
      title: "Transparency",
      description:
        "We believe in full transparency about our sourcing, pricing, and relationships with producers.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "We work with producers who share our commitment to sustainable farming practices and environmental stewardship.",
    },
  ];

  return (
    <div className="container px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Archers Coffee
          </h1>
          <p className="text-lg text-muted-foreground">
            Quality. Transparency. Sustainability.
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg leading-relaxed mb-6 text-foreground">
            Our coffees are seasonally sourced and delicately roasted to
            showcase the hard work and dedication of our producing partners.
            It's a product of passion and consistency passed down from several
            generations.
          </p>
          <p className="text-lg leading-relaxed text-foreground">
            We want to honor that work by interfering as little as possible,
            roasting carefully to bring out diversity of flavors, aromatics, and
            acidities allowing each coffee to tell its own story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {values.map((value) => (
            <Card key={value.title}>
              <CardContent className="p-6 text-center">
                <value.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              To bring exceptional specialty coffee to coffee lovers while
              supporting sustainable farming practices and building lasting
              relationships with our producing partners.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
