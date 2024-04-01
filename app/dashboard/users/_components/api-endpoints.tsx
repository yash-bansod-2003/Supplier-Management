"use client";

import { Clipboard } from "@/components/clipboard";
import { useOrigin } from "@/hooks/use-origin";
import { ScrollArea } from "@/components/ui/scroll-area";

const ApiEndpoints = () => {
  const { origin } = useOrigin();

  return (
    <div className="space-y-5">
      <Clipboard text="/users/{userId}" />
      <Clipboard request="POST" text="/users/{userId}" />
      <Clipboard request="PATCH" text="/users/{userId}" />
      <Clipboard request="DELETE" text="/users/{userId}" />
    </div>
  );
};

export { ApiEndpoints };
