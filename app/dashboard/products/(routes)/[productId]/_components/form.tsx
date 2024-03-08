"use client";

import * as React from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, $Enums } from "@prisma/client";
import { DashboardHeader } from "@/components/header";
import { productSchema } from "@/lib/validations/product";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import {
      Form,
      FormControl,
      FormDescription,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
      useFormField,
} from "@/components/ui/form";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

interface ProductFormProps {
      product: Product | null;
}

export const ProductForm: React.FC<ProductFormProps> = ({
      product
}) => {
      const mounted = useMounted();
      const router = useRouter();
      const [isLoading, setIsLoading] = React.useState<boolean>(false);

      const form = useForm<z.infer<typeof productSchema>>({
            resolver: zodResolver(productSchema),
            defaultValues: {
                  name: product?.name || "",
                  description: product?.description || "",
                  color: product?.color || "",
                  weight: String(product?.weight) || "0",
                  unit: product?.unit || $Enums.Units.KILOGRAM,
                  cost: String(product?.cost) || "0"
            },
      });

      async function onClick(values: z.infer<typeof productSchema>) {
            setIsLoading(true);

            const response = await fetch("/api/products", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
            });

            setIsLoading(false);

            if (!response?.ok) {
                  return toast({
                        title: "Something went wrong.",
                        description: "Your post was not created. Please try again.",
                        variant: "destructive",
                  });
            }

            const post = await response.json();

            // This forces a cache invalidation.
            router.refresh();

            form.reset();

            router.push("/dashboard/products");

            return toast({
                  title: "Product Created Successfully.",
                  description:
                        "Your product was created , refer dashboard for future updates",
            });
      }

      if (!mounted) {
            return null;
      }

      return (
            <>
                  <DashboardHeader
                        heading="Product"
                        text="Create new product or edit a exsisting one at one place."
                  >
                        <Button onClick={form.handleSubmit(onClick)}>
                              {isLoading ? (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                    <Icons.save className="mr-2 h-4 w-4" />
                              )}
                              Save Changes
                        </Button>
                  </DashboardHeader>
                  <Form {...form}>
                        <form className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                              <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="Natural Rubber" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                      Enter the name of the raw materia.
                                                </FormDescription>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />

                              <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                      <Input
                                                            placeholder="High-quality natural rubber for various applications"
                                                            {...field}
                                                      />
                                                </FormControl>
                                                <FormDescription>
                                                      Provide a brief description of the raw material.
                                                </FormDescription>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />

                              <FormField
                                    control={form.control}
                                    name="weight"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Weight</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="400" type="number" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                      {" "}
                                                      Specify the weight of the raw material.
                                                </FormDescription>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />

                              <FormField
                                    control={form.control}
                                    name="unit"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Unit</FormLabel>
                                                <Select
                                                      onValueChange={field.onChange}
                                                      defaultValue={field.value}
                                                >
                                                      <FormControl>
                                                            <SelectTrigger>
                                                                  <SelectValue placeholder="Select a color" />
                                                            </SelectTrigger>
                                                      </FormControl>
                                                      <SelectContent>
                                                            <SelectItem
                                                                  key={$Enums.Units.KILOGRAM}
                                                                  value={$Enums.Units.KILOGRAM}
                                                            >
                                                                  KILOGRAM
                                                            </SelectItem>
                                                            <SelectItem
                                                                  key={$Enums.Units.LITER}
                                                                  value={$Enums.Units.LITER}
                                                            >
                                                                  LITER
                                                            </SelectItem>
                                                      </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                      Select the unit of measurement
                                                </FormDescription>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />

                              <FormField
                                    control={form.control}
                                    name="cost"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Cost</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="17" type="number" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                      Enter the cost of the raw material.
                                                </FormDescription>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                        </form>
                  </Form>
            </>
      );
};
