"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { $Enums, User } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userRoleSchema } from "@/lib/validations/user";
import { buttonVariants } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "role" | "isRoleUpdated">;
}

type FormData = z.infer<typeof userRoleSchema>;

export function UserRoleForm({ user, className, ...props }: UserNameFormProps) {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(userRoleSchema),
    defaultValues: {
      role: user?.role || $Enums.UserRole.SUPPLIER,
    },
  });
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/users/${user.id}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: data.role,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your role was not updated. Please try again.",
        variant: "destructive",
      });
    }

    toast({
      description: "Your role has been updated.",
    });

    router.refresh();
  }

  return (
    <Form {...form}>
      <form className={cn(className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Your Role</CardTitle>
            <CardDescription>
              Please select your role or a authorization type you are oprating
              with with.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                Role
              </Label>

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      disabled={user.isRoleUpdated}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select the role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={$Enums.UserRole.SUPPLIER}>
                          SUPPLIER
                        </SelectItem>
                        <SelectItem value={$Enums.UserRole.ORGANIZATION}>
                          ORGANIZATION
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className={cn(buttonVariants(), className)}
                  disabled={isSaving || user.isRoleUpdated}
                >
                  {isSaving && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <span>Save</span>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently change
                    your account role and only can alter by super admin.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isSaving || user.isRoleUpdated}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
