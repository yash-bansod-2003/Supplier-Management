"use client";

import * as React from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { $Enums, Inventory, Warehouse } from "@prisma/client";
import { DashboardHeader } from "@/components/header";
import { inventorySchema } from "@/lib/validations/inventory";
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

interface InventoryFormProps {
  inventory: Inventory | null;
  warehouses: Array<Warehouse>;
}

export const InventoryForm: React.FC<InventoryFormProps> = ({
  inventory,
  warehouses,
}) => {
  const mounted = useMounted();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof inventorySchema>>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      location: inventory?.location || "",
      quantity: inventory?.quantity ? String(inventory?.quantity) : "",
      reorderPoint: inventory?.reorderPoint
        ? String(inventory?.reorderPoint)
        : "",
      warehouseId: inventory?.warehouseId || "",
    },
  });

  const endpoint = inventory
    ? `/api/inventories/${inventory.id}`
    : "/api/inventories";
  const method = inventory ? "PATCH" : "POST";
  const message = inventory ? "updated" : "created";

  async function onClick(values: z.infer<typeof inventorySchema>) {
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
        description: `Your inventory was not ${message}. Please try again.`,
        variant: "destructive",
      });
    }

    const inventory = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    form.reset();

    router.push("/dashboard/inventories");

    return toast({
      title: `Inventory ${message} Successfully.`,
      description: `Your inventory was ${message} , refer dashboard for future updates`,
    });
  }

  if (!mounted) {
    return null;
  }

  return (
    <>
      <DashboardHeader
        heading="Inventory"
        text="Create new Inventory or edit a exsisting one at one place."
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the location within the warehouse"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Specify where the product is physically stored in the
                  warehouse.
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
                    placeholder="Enter the quantity of the product in stock"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Specify the initial quantity of the product being added to the
                  inventory.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reorderPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reorder Point</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the minimum quantity that triggers a reorder"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Specify the threshold at which the system should initiate a
                  reorder for this product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="warehouseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Warehouse</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {warehouses.map((warehouse) => (
                      <SelectItem key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Specify which warehouse inventory is a part of.
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
