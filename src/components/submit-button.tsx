"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CircleDashed } from "lucide-react";
import { ReactNode } from "react";

const SubmitButton = ({
  className,
  children,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={cn("rounded-none w-full", className)}>
      {pending ? <CircleDashed className="animate-spin" /> : children}
    </Button>
  );
};
export default SubmitButton;
