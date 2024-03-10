import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { UserItem } from "./user-item";

type UsersClientProps = React.HTMLAttributes<HTMLDivElement> & {
  users: Array<User>;
};

const UsersClient: React.FC<UsersClientProps> = ({
  users,
  className,
  ...props
}) => {
  return (
    <div className={cn("", className)} {...props}>
      <Tabs defaultValue="list" className="space-y-8">
        <TabsList className="space-x-4">
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div>
            {users?.length ? (
              <div className="space-y-5">
                {users.map((user) => (
                  <UserItem key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <EmptyPlaceholder>
                <EmptyPlaceholder.Icon name="group" />
                <EmptyPlaceholder.Title>No users</EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                  You don&apos;t have any users yet.
                </EmptyPlaceholder.Description>
              </EmptyPlaceholder>
            )}
          </div>
        </TabsContent>
        <TabsContent value="table">
          <p>
            Table view of users,{" "}
            <span className="font-bold">comming soon..</span>
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { UsersClient };
