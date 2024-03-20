import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type DeveloperModeToggleProps = {
  isOn: boolean;
};

const DeveloperModeToggle: React.FC<DeveloperModeToggleProps> = ({ isOn }) => {
  return (
    <>
      <Card className="px-4 py-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span className="font-semibold">Developer Mode</span>
            <span className="font-normal leading-snug text-muted-foreground">
              This will help to developer to know the endpoints and proper
              workflow of the system.
            </span>
          </Label>
          <Switch id="necessary" checked={isOn} />
        </div>
      </Card>
    </>
  );
};

export { DeveloperModeToggle };
