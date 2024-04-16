import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Product, User } from "@prisma/client";
import Link from "next/link";

interface IProduct extends Product {
  user: User;
  orders: unknown[];
}

type ProductItemProps = {
  product: IProduct;
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
          <p>
            quantity : <span>{product.quantity}</span>
          </p>
          <p>
            price per unit : <span>{product.cost}</span>
          </p>
          <p>
            Supplier : <span>{product.user.name}</span>
          </p>
          <p>This Product Orders {product.orders.length} Times</p>
        </div>
        {product.quantity ? (
          <Link
            href={`/dashboard/shopping/order/${product.id}`}
            className={buttonVariants({ size: "sm", variant: "secondary" })}
          >
            Place Order
          </Link>
        ) : (
          <Button disabled variant="destructive">
            Out Of Stock
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
