import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Heart, Leaf, Award, Users, Globe, Target } from "lucide-react";

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

  const stats = [
    { icon: Globe, label: "Countries Sourced", value: "10+" },
    { icon: Users, label: "Producing Partners", value: "50+" },
    { icon: Award, label: "Years of Excellence", value: "15+" },
    { icon: Coffee, label: "Coffee Varieties", value: "100+" },
  ];

  return (
    <div className="container px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              About Cophy
            </h1>
            <div className="w-1/4 h-1 bg-gray-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-lg text-muted-foreground mt-4">
            Quality. Transparency. Sustainability.
          </p>
        </div>

        {/* Main Story */}
        <div className="mb-12">
          <Card className="border-none shadow-none mb-8">
            <CardContent>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-foreground">
                  Our coffees are seasonally sourced and delicately roasted to
                  showcase the hard work and dedication of our producing
                  partners. It&apos;s a product of passion and consistency
                  passed down from several generations.
                </p>
                <p className="text-lg leading-relaxed text-foreground">
                  We want to honor that work by interfering as little as
                  possible, roasting carefully to bring out diversity of
                  flavors, aromatics, and acidities allowing each coffee to tell
                  its own story.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <Card
                key={value.title}
                className="border border-gray-200 shadow-none"
              >
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="border border-gray-200 shadow-none"
              >
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border border-gray-200 shadow-none">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Our Mission
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To bring exceptional specialty coffee to coffee lovers while
                supporting sustainable farming practices and building lasting
                relationships with our producing partners.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-none">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading specialty coffee company that connects coffee
                enthusiasts with the finest Ethiopian and Panamanian coffees,
                while empowering local producers and preserving traditional
                coffee culture.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <Card className="border-none shadow-none">
          <CardContent>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in Addis Ababa, Cophy was born from a deep appreciation
                for the rich coffee heritage of Ethiopia and the exceptional
                quality of specialty coffees from Panama. We recognized that
                great coffee is not just about the final cup, but about the
                entire journey from farm to cup.
              </p>
              <p>
                Our team travels directly to coffee farms, working closely with
                producers to understand their methods, challenges, and
                aspirations. This direct relationship allows us to ensure fair
                compensation for farmers while bringing you coffees that tell a
                story of place, people, and passion.
              </p>
              <p>
                Every batch we roast is carefully crafted to highlight the
                unique characteristics of each coffee, respecting the terroir
                and the hard work that goes into producing exceptional beans. We
                believe that when you drink our coffee, you&apos;re not just
                enjoying a beverage—you&apos;re participating in a tradition
                that spans generations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
