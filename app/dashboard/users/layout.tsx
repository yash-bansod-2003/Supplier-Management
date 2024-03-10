import { getCurrentUser } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

type UserPageLayoutProps = React.PropsWithChildren;

const UserPageLayout: React.FC<UserPageLayoutProps> = async ({ children }) => {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  if (user.role !== "ADMIN") {
    return redirect("/dashboard");
  }

  return <>{children}</>;
};

export default UserPageLayout;
