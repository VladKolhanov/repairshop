import Form from "next/form";

import { SearchButton } from "@/components/SearchButton";
import { Input } from "@/components/ui/input";
import { Networking } from "@/configs/networking";

export const TicketSearch = () => {
  return (
    <Form action={Networking.TICKETS} className="flex gap-2 items-center">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Tickets"
        className="w-full"
        autoFocus
      />
      <SearchButton />
    </Form>
  );
};
