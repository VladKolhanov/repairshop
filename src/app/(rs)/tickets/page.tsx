import { PageProps } from "@/types/app";

import { getOpenTickets, getTicketSearch } from "@/services/tickets";

import { TicketSearch } from "./_components/TicketSearch";
import { TicketTable } from "./_components/TicketTable";

type Props = PageProps<undefined, { searchText: string }>;

export const metadata = {
  title: "Ticket Search",
};

export default async function Tickets({ searchParams }: Props) {
  const { searchText } = await searchParams;

  if (!searchText) {
    const results = await getOpenTickets();

    return (
      <>
        <TicketSearch />
        {results.length ? (
          <TicketTable data={results} />
        ) : (
          <p className="mt-4">No open tickets found</p>
        )}
      </>
    );
  }

  const results = await getTicketSearch(searchText);

  return (
    <>
      <TicketSearch />
      {results.length ? (
        <TicketTable data={results} />
      ) : (
        <p className="mt-4">No results found</p>
      )}
    </>
  );
}
