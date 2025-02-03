import { PageProps } from "@/types/app";

import { getOpenTickets, getTicketSearch } from "@/services/tickets";

import { TicketSearch } from "./_components/TicketSearch";

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
        <p>{JSON.stringify(results)}</p>
      </>
    );
  }

  const results = await getTicketSearch(searchText);

  return (
    <>
      <TicketSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
}
