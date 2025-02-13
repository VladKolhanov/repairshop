import { LoaderCircleIcon } from "@/icons";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 gb-background/80">
      <div className="w-full h-dvh grid place-content-center">
        <LoaderCircleIcon className="h-48 w-48 animate-spin text-foreground/20" />
      </div>
    </div>
  );
}
