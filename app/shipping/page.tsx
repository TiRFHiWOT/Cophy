import { Truck, RefreshCw, Shield } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="container px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Shipping & Returns
        </h1>

        <div className="space-y-8">
          {/* Shipping Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Truck className="h-6 w-6 text-primary" />
              Shipping Information
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                We ship our premium coffee directly to your door, ensuring
                freshness and quality from our roastery to your home.
              </p>

              <div className="bg-muted p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Shipping Rates
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Free shipping</strong> on orders over ETB 8,500
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Standard shipping:</strong> ETB 1,150 (5-7
                        business days)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Express shipping:</strong> ETB 2,000 (2-3
                        business days)
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Processing Time
                  </h3>
                  <p>
                    Orders are typically processed within 1-2 business days.
                    During peak seasons, processing may take up to 3 business
                    days.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Returns */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <RefreshCw className="h-6 w-6 text-primary" />
              Returns & Exchanges
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                We want you to be completely satisfied with your purchase. If
                you&apos;re not happy with your coffee, we&apos;re here to help.
              </p>

              <div className="bg-muted p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Return Policy
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Returns accepted within <strong>30 days</strong> of
                        purchase
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Products must be unopened and in original packaging
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Refunds will be processed to the original payment method
                        within 5-7 business days
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    How to Return
                  </h3>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Contact us at info@cophy.com with your order number</li>
                    <li>We&apos;ll provide you with a return shipping label</li>
                    <li>Package the item securely and ship it back</li>
                    <li>Once received, we&apos;ll process your refund</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Quality Guarantee */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Quality Guarantee
            </h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-gray-600 leading-relaxed">
                We stand behind the quality of our coffee. If you receive a
                product that doesn&apos;t meet our standards, please contact us
                immediately. We&apos;ll make it right with a replacement or full
                refund.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="border-t pt-8">
            <p className="text-gray-600">
              Questions about shipping or returns?{" "}
              <a
                href="/contact"
                className="text-primary hover:underline font-medium"
              >
                Contact us
              </a>{" "}
              and we&apos;ll be happy to help.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
