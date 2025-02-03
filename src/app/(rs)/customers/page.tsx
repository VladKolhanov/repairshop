import { PageProps } from "@/types/app";
import { getCustomerSearch } from "@/services/customers";

import { CustomerSearch } from "./_components/CustomerSearch";

type Props = PageProps<
  undefined,
  {
    searchText: string;
  }
>;

export const metadata = {
  title: "Customer Search",
};

export default async function Customers({ searchParams }: Props) {
  const { searchText } = await searchParams;

  if (!searchText) return <CustomerSearch />;

  const results = await getCustomerSearch(searchText);

  return (
    <>
      <CustomerSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
}
