import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText?: string;
  isPopular?: boolean;
}

interface PricingSectionProps {
  title?: string;
  description?: string;
  tiers?: PricingTier[];
  onSelectTier?: (tierName: string) => void;
}

const defaultTiers: PricingTier[] = [
  {
    name: "Basic",
    price: "$19",
    description: "Perfect for getting started",
    features: [
      "3 AI Avatars",
      "Basic customization",
      "Community access",
      "Email support",
      "Content generation (5/day)",
    ],
    buttonText: "Start Free Trial",
    cryptoPrice: "0.01 ETH",
  },
  {
    name: "Creator",
    price: "$49",
    description: "For serious content creators",
    features: [
      "10 AI Avatars",
      "Advanced customization",
      "Priority support",
      "Analytics dashboard",
      "Content generation (20/day)",
      "Auto-posting to social",
      "Custom poses & outfits",
    ],
    buttonText: "Get Creator",
    isPopular: true,
    cryptoPrice: "0.025 ETH",
  },
  {
    name: "Agency",
    price: "$199",
    description: "For professional agencies",
    features: [
      "Unlimited AI Avatars",
      "White-label solution",
      "24/7 VIP support",
      "Advanced analytics",
      "Unlimited content generation",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
    ],
    buttonText: "Contact Sales",
    cryptoPrice: "0.1 ETH",
  },
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out our service",
    features: [
      "1 AI Avatar",
      "Basic customization",
      "Community support",
      "Basic analytics",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: "$29",
    description: "Best for professional creators",
    features: [
      "5 AI Avatars",
      "Advanced customization",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
      "API access",
    ],
    buttonText: "Start Pro",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale operations",
    features: [
      "Unlimited AI Avatars",
      "Full customization",
      "24/7 priority support",
      "Custom analytics",
      "White-label solution",
      "Custom API integration",
      "Dedicated account manager",
    ],
    buttonText: "Contact Sales",
  },
];

const PricingSection = ({
  title = "Simple, transparent pricing",
  description = "Choose the perfect plan for your AI avatar creation needs",
  tiers = defaultTiers,
  onSelectTier = () => {},
}: PricingSectionProps) => {
  return (
    <section className="py-16 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col ${tier.isPopular ? "border-primary shadow-lg scale-105" : ""}`}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 left-0 right-0">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  {tier.name}
                </CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== "Custom" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <p className="text-muted-foreground mt-2">{tier.description}</p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="text-primary h-5 w-5 flex-shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="mt-8 w-full"
                  variant={tier.isPopular ? "default" : "outline"}
                  onClick={() => onSelectTier(tier.name)}
                >
                  {tier.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
