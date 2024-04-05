"use client";

import * as React from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, $Enums, Inventory } from "@prisma/client";
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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

interface ProductFormProps {
  product: Product | null;
  inventories: Array<Inventory>;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  inventories,
  product,
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
      weight: product?.weight ? String(product?.weight) : "0",
      unit: product?.unit || $Enums.Units.GRAM,
      cost: product?.cost ? String(product?.cost) : "0",
      category: product?.category || "",
      inventoryId: product?.inventoryId || "",
      quantity: product?.quantity ? String(product?.quantity) : "",
    },
  });

  const endpoint = product ? `/api/products/${product.id}` : "/api/products";
  const method = product ? "PATCH" : "POST";
  const message = product ? "updated" : "created";

  async function onClick(values: z.infer<typeof productSchema>) {
    setIsLoading(true);

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: `Your post was not ${message}. Please try again.`,
        variant: "destructive",
      });
    }

    const product = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    form.reset();

    router.push("/dashboard/products");

    return toast({
      title: `Product ${message} Successfully.`,
      description: `Your product was ${message} , refer dashboard for future updates`,
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
                  <Input
                    placeholder="Enter the name of the product"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a clear and descriptive name for the product.
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
                    placeholder="Enter a brief description of the product"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Briefly describe the key features or use case of the product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a color the product" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the hexadecimal code of a color.
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
                  <Input
                    placeholder="Enter a weight of the product"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Specify the weight of the product.
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
                      <SelectValue placeholder="Select the unit of the measurment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      key={$Enums.Units.GRAM}
                      value={$Enums.Units.GRAM}
                    >
                      GRAM
                    </SelectItem>
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
                  <Input placeholder="Enter a cost of the product" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the cost of the product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a quantity of the product"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the quantity of the product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a category of the product"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the category of the product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inventoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inventory</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inventory" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {inventories.map((inventory) => (
                      <SelectItem key={inventory.id} value={inventory.id}>
                        {inventory.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Specify which inventory is a associated with.
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
