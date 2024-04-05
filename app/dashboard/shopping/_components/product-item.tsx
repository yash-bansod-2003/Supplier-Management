import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Product } from "@prisma/client";
import Link from "next/link";

type ProductItemProps = {
  product: Product;
};

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-4">
          <p>quantity : <span>{product.quantity}</span></p>
          <p>price per unit : <span>{product.cost}</span></p>
        </div>
        <Link href={`/dashboard/shopping/order/${product.id}`} className={buttonVariants({ size: "sm", variant: "secondary" })} >
          Place Order
        </Link>
      </CardContent>
    </Card>
  );
};
