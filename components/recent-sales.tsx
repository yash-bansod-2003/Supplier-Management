import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>GT</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Gopal Tayade</p>
          <p className="text-sm text-muted-foreground">tayadeg47@gmail.com</p>
        </div>
        <div className="ml-auto font-medium">+$400</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>YB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Yash Bansod</p>
          <p className="text-sm text-muted-foreground">
            yashbansod2020@gmail.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$200</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>CW</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Chandan Werulkar</p>
          <p className="text-sm text-muted-foreground">chandanw03@gmail.com</p>
        </div>
        <div className="ml-auto font-medium">+$100</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>GT</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Gopal Tayade</p>
          <p className="text-sm text-muted-foreground">tayadeg47@gmail.com</p>
        </div>
        <div className="ml-auto font-medium">+$300</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>YB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Yash Bansod</p>
          <p className="text-sm text-muted-foreground">
            yashbansod2020@gmail.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$200</div>
      </div>
    </div>
  );
}
