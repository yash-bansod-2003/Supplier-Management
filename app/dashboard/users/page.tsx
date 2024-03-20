import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { db } from "@/lib/db";
import { UsersClient } from "./_components/client";

export const metadata = {
  title: "Users",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const users = await db.user.findMany();

  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Manage all user at one place." />
      <UsersClient users={users} currentUser={{ role: user.role }} />
    </DashboardShell>
  );
}
