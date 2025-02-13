import * as Sentry from "@sentry/nextjs";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from "@kinde/management-api-js";

import { PageProps } from "@/types/app";
import { getCustomer } from "@/services/customers";
import { getTicket } from "@/services/tickets";
import { BackButton } from "@/components/BackButton";

import TicketForm from "./_components/TicketForm";

type Props = PageProps<
  undefined,
  {
    customerId: string;
    ticketId: string;
  }
>;

export async function generateMetadata({ searchParams }: Props) {
  const { customerId, ticketId } = await searchParams;

  if (!customerId && !ticketId)
    return {
      title: "Missing Ticket ID or Customer ID",
    };

  if (customerId)
    return {
      title: `New Ticket for Customer ${customerId}`,
    };

  if (ticketId)
    return {
      title: `Edit Ticket #${ticketId}`,
    };

  return { title: `Missing Ticket ID or Customer ID` };
}

export default async function TicketsFormPage({ searchParams }: Props) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID required to load ticket form
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    const { getPermission, getUser } = getKindeServerSession();
    const [managePermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ]);
    const isManager = managePermission?.isGranted;

    // New ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is not active
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      if (isManager) {
        kindeInit(); // Initializes the Kinde Management API
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];

        return (
          <TicketForm customer={customer} techs={techs} isManager={isManager} />
        );
      } else {
        return <TicketForm customer={customer} />;
      }
    }

    // Edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId);

      if (isManager) {
        kindeInit(); // Initializes the Kinde Management API
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({
              id: user.email?.toLowerCase() || "",
              description: user.email?.toLowerCase() || "",
            }))
          : [];

        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            techs={techs}
            isManager={isManager}
          />
        );
      } else {
        const isEditable =
          user.email?.toLowerCase() === ticket.tech.toLowerCase();

        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            isEditable={isEditable}
          />
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
