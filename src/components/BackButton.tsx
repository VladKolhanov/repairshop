"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type ButtonProps = Omit<React.ComponentProps<typeof Button>, "size">;

type Props = {
  title: string;
  className?: string;
} & ButtonProps;

export function BackButton({ title, variant, className, ...props }: Props) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => router.back()}
      title={title}
      {...props}
    >
      {title}
    </Button>
  );
}
