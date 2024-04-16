import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { UserNameForm } from "@/components/user-name-form";
import { UserRoleForm } from "@/components/user-role-form";
import { UserAddressForm } from "@/components/user-address-form";
import { db } from "@/lib/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploader } from "@/components/file-uploader";
import { DeveloperModeToggle } from "@/components/developer-mode-toggle";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      isRoleUpdated: true,
      address: {
        select: {
          street: true,
          city: true,
          state: true,
          postalCode: true,
        },
      },
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <Tabs defaultValue="account" className="space-y-8">
        <TabsList className="space-x-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="address">Addresses</TabsTrigger>
          {user.role !== "ADMIN" && (
            <TabsTrigger value="documents">Documents</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="account">
          <div className="grid gap-10">
            <UserNameForm user={{ id: user.id, name: user.name || "" }} />
            <UserRoleForm
              user={{
                id: user.id,
                role: user.role || "",
                isRoleUpdated: dbUser?.isRoleUpdated || false,
              }}
            />
          </div>
        </TabsContent>
        <TabsContent value="address">
          <div className="grid gap-10">
            <UserAddressForm user={{ id: user.id, address: dbUser?.address }} />
          </div>
        </TabsContent>
        {user.role !== "ADMIN" && (
          <TabsContent value="documents">
            <FileUploader />
          </TabsContent>
        )}
      </Tabs>
    </DashboardShell>
  );
}
