"use client";

import { useFormStatus } from "react-dom";

import { LoaderCircleIcon } from "@/icons";
import { Button } from "@/components/ui/button";

export const SearchButton = () => {
  const status = useFormStatus();

  return (
    <Button type="submit" disabled={status.pending} className="w-20">
      {status.pending ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        "Search"
      )}
    </Button>
  );
};
