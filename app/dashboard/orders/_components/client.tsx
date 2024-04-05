import { cn } from "@/lib/utils";
import { Order, User } from "@prisma/client";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "./data-table";

type OrderClientProps = React.HTMLAttributes<HTMLDivElement> & {
  orders: Array<Order>;
  currentUser: Pick<User, "role">;
};

const OrderClient: React.FC<OrderClientProps> = ({
  orders,
  className,
  currentUser,
  ...props
}) => {
  const formattedOrdersArray: OrderColumn[] = orders.reduce<OrderColumn[]>(
    (acc, order) => {
      const { id, subtotal, total, shipping, tax } = order;
      acc.push({
        id,
        subtotal,
        total,
        shipping,
        tax,
      });
      return acc;
    },
    [],
  );

  return (
    <div className={cn("", className)} {...props}>
      <DataTable columns={columns} data={formattedOrdersArray} />
    </div>
  );
};

export { OrderClient };
