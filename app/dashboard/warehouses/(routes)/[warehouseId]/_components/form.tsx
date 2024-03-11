"use client";

import * as React from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { $Enums, Warehouse } from "@prisma/client";
import { DashboardHeader } from "@/components/header";
import { warehouseSchema } from "@/lib/validations/warehouse";
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
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

interface WarehouseFormProps {
  warehouse: Warehouse | null;
}

export const WarehouseForm: React.FC<WarehouseFormProps> = ({ warehouse }) => {
  const mounted = useMounted();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof warehouseSchema>>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: {
      name: warehouse?.name || "",
      capacity: warehouse?.capacity ? String(warehouse?.capacity) : "",
      location: warehouse?.location || "",
    },
  });

  const endpoint = warehouse
    ? `/api/warehouses/${warehouse.id}`
    : "/api/warehouses";
  const method = warehouse ? "PATCH" : "POST";
  const message = warehouse ? "updated" : "created";

  async function onClick(values: z.infer<typeof warehouseSchema>) {
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
        description: `Your warehouse was not ${message}. Please try again.`,
        variant: "destructive",
      });
    }

    const warehouse = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    form.reset();

    router.push("/dashboard/warehouses");

    return toast({
      title: `Warehouse ${message} Successfully.`,
      description: `Your warehouse was ${message} , refer dashboard for future updates`,
    });
  }

  if (!mounted) {
    return null;
  }

  return (
    <>
      <DashboardHeader
        heading="Warehouse"
        text="Create new warehouse or edit a exsisting one at one place."
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
                    placeholder="Enter the name of the warehouse"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a unique and descriptive name for the warehouse.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the maximum capacity of the warehouse in units"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Specify the city, suburb, or address where the warehouse is
                  situated.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the physical location of the warehouse"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Indicate the total number of units or products the warehouse
                  can hold.
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
