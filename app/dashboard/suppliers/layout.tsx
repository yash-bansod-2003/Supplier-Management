import { getCurrentUser } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

type UserPageLayoutProps = React.PropsWithChildren;

const UserPageLayout: React.FC<UserPageLayoutProps> = async ({ children }) => {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  if (user.role === "ORGANIZATION" || user.role === "ADMIN") {
  } else {
    return redirect("/dashboard");
  }

  return <>{children}</>;
};

export default UserPageLayout;
