import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";

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
        <div></div>
        <Button size="sm" variant="secondary">
          Place Order
        </Button>
      </CardContent>
    </Card>
  );
};
