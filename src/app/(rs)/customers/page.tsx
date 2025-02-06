import * as Sentry from "@sentry/nextjs";

import { PageProps } from "@/types/app";
import { getCustomerSearch } from "@/services/customers";

import { CustomerSearch } from "./_components/CustomerSearch";
import { CustomerTable } from "./_components/CustomerTable";

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

  const span = Sentry.startInactiveSpan({ name: "getCustomerSearch-2" });
  const results = await getCustomerSearch(searchText);
  span.end();

  return (
    <>
      <CustomerSearch />
      {results.length ? (
        <CustomerTable data={results} />
      ) : (
        <p className="mt-4">No results found</p>
      )}
    </>
  );
}
