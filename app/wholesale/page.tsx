import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, Package, Users } from "lucide-react";

export default function WholesalePage() {
  return (
    <div className="container px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Wholesale</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Partner with Archers Coffee to bring exceptional specialty coffee to
          your business.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Coffee className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Roasted Coffee</h3>
              <p className="text-sm text-muted-foreground">
                Freshly roasted specialty coffee beans for your cafe or
                restaurant
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Green Coffee</h3>
              <p className="text-sm text-muted-foreground">
                Premium green coffee beans for your own roasting operation
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Support</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated support and training for your team
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Get Started</h2>
            <p className="text-muted-foreground mb-6">
              Contact us to discuss wholesale pricing and partnership
              opportunities.
            </p>
            <Button size="lg">Contact Wholesale Team</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
