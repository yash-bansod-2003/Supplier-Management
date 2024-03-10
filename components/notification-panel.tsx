import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

type NotificationPanelProps = React.AllHTMLAttributes<HTMLDivElement>;

const NotificationPanel: React.FC<NotificationPanelProps> = () => {
  return (
    <Button variant="ghost" size="icon">
      <Icons.notification className="w-5 h-5" />
    </Button>
  );
};

export { NotificationPanel };
