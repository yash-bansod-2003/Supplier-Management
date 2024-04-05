"use client";

import * as React from "react";
import { Product } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
      Form,
      FormControl,
      FormDescription,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from "@/components/ui/form"


interface ProductOrderClientProps {
      product: Product
}

function computeTotalPrice(price: number, quantity: number) {
      return price * quantity;
}

export const ProductOrderClient: React.FC<ProductOrderClientProps> = ({ product }) => {

      const formSchema = z.object({
            quantity: z.string()
                  .regex(/^\d+$/)
                  .refine((value) => {
                        const numberValue = parseInt(value, 10);
                        return !isNaN(numberValue) && numberValue >= 1 && numberValue <= 100;
                  }, {
                        message: `Input must be a string representing a number between 0 and ${100}`,
                  })
      })

      const [tax, setTax] = React.useState<number>(18);
      const [subtotal, setSubtotal] = React.useState<number>(product.cost);
      const [total, setTotal] = React.useState<number>(product.cost + tax);

      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  quantity: "1",
            },
      });

      function onSubmit(values: z.infer<typeof formSchema>) {
            console.log({ quantity: values.quantity, total, subtotal, tax, supplierId: product.userId })
      }

      const watchQuantityField = form.watch("quantity");

      React.useEffect(() => {
            setSubtotal(computeTotalPrice(product.cost, Number(watchQuantityField)));
      }, [product.cost, watchQuantityField])

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
                                                <Input disabled id="name" placeholder="0" value={subtotal + tax} />
                                          </div>
                                    </div>
                              </CardContent>
                              <CardFooter className="flex justify-start">
                                    <Button type="submit">Place Order</Button>
                              </CardFooter>
                        </form>
                  </Form>
            </Card>
      )
};