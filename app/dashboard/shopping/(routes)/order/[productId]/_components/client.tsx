"use client";

import * as React from "react";
import { Product } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface ProductOrderClientProps {
  product: Product;
}

function computeTotalPrice(price: number, quantity: number) {
  return price * quantity;
}

export const ProductOrderClient: React.FC<ProductOrderClientProps> = ({
  product,
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const formSchema = z.object({
    quantity: z
      .string()
      .regex(/^\d+$/)
      .refine(
        (value) => {
          const numberValue = parseInt(value, 10);
          return (
            !isNaN(numberValue) &&
            numberValue >= 1 &&
            numberValue <= product.quantity
          );
        },
        {
          message: `Input must be a string representing a number between 1 and ${product.quantity}`,
        },
      ),
  });

  const [tax, setTax] = React.useState<number>(18);
  const [subtotal, setSubtotal] = React.useState<number>(product.cost);
  const [shipping, setShipping] = React.useState<number>(50);
  const [total, setTotal] = React.useState<number>(
    product.cost + tax + shipping,
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [productId, setProductId] = React.useState<string>(product.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: "1",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shipping,
        subtotal,
        total,
        tax,
        productId,
        quantity: Number(values.quantity),
      }),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: `Your order was not placed. Please try again.`,
        variant: "destructive",
      });
    }

    const product = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    form.reset();

    router.push("/dashboard/orders");

    return toast({
      title: `order  placed Successfully.`,
      description: `Your product was placed , refer dashboard for future updates`,
    });
  }

  const watchQuantityField = form.watch("quantity");

  React.useEffect(() => {
    setSubtotal(computeTotalPrice(product.cost, Number(watchQuantityField)));
  }, [product.cost, watchQuantityField]);

  return (
    <Card className="w-[350px]">
      <Form {...form}>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
                <Label htmlFor="subtotal">Subtotal</Label>
                <Input disabled id="subtotal" value={subtotal} />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="tax">Tax</Label>
                <Input disabled id="tax" value={tax} />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="tax">Shipping</Label>
                <Input disabled id="tax" value={shipping} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name">Total</Label>
                <Input
                  disabled
                  id="name"
                  placeholder="0"
                  value={subtotal + tax}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-start">
            <Button type="submit">Place Order</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
