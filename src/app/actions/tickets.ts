"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";

import { db } from "@/db/db";
import { tickets } from "@/db/schema";
import { actionClient } from "@/libs/safe-action";
import {
  insertTicketSchema,
  type InsertTicketSchemaType,
} from "@/zod-schemas/ticket";

type SaveTicketActionArgs = {
  parsedInput: InsertTicketSchemaType;
};

export const saveTicketAction = actionClient
  .metadata({
    actionName: "saveTicket",
  })
  .schema(insertTicketSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: ticket }: SaveTicketActionArgs) => {
    // New Ticket
    if (ticket.id === "(New)") {
      const result = await db
        .insert(tickets)
        .values({
          customerId: ticket.customerId,
          title: ticket.title,
          description: ticket.description,
          tech: ticket.tech,
        })
        .returning({ insertedId: tickets.id });

      return {
        message: `Ticket ID #${result[0].insertedId} created successfully`,
      };
    }

    // Updating ticket
    const result = await db
      .update(tickets)
      .set({
        customerId: ticket.customerId,
        title: ticket.title,
        description: ticket.description,
        completed: ticket.completed,
        tech: ticket.tech,
      })
      .where(eq(tickets.id, ticket.id!))
      .returning({ updatedId: tickets.id });

    return {
      message: `Ticket ID #${result[0].updatedId} updated successfully`,
    };
  });
