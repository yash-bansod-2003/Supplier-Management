import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Pricing } from "@/components/landing/pricing";

export const metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return <Pricing />;
}
