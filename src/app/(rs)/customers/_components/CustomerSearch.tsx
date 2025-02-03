import Form from "next/form";

import { SearchButton } from "@/components/SearchButton";
import { Input } from "@/components/ui/input";
import { Networking } from "@/configs/networking";

export const CustomerSearch = () => {
  return (
    <Form action={Networking.CUSTOMERS} className="flex gap-2 items-center">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Customers"
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
};
