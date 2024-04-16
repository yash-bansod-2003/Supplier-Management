import { cn } from "@/lib/utils";
import { Order, Product, User } from "@prisma/client";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "./data-table";

interface IOrder extends Order {
  product: Product;
  supplier: User;
  organization: User;
}

type OrderClientProps = React.HTMLAttributes<HTMLDivElement> & {
  orders: Array<IOrder>;
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
      const {
        id,
        subtotal,
        total,
        shipping,
        tax,
        product,
        organization,
        supplier,
        quantity,
      } = order;
      acc.push({
        id,
        subtotal,
        quantity,
        total,
        shipping,
        tax,
        product: product.name,
        organization: organization.name || "",
        supplier: supplier.name || "",
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
