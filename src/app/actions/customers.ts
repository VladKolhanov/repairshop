"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";

import { db } from "@/db/db";
import { customers } from "@/db/schema";
import { actionClient } from "@/libs/safe-action";
import {
  insertCustomerSchema,
  type InsertCustomerSchemaType,
} from "@/zod-schemas/customer";

type SaveCustomerActionArgs = {
  parsedInput: InsertCustomerSchemaType;
};

export const saveCustomerAction = actionClient
  .metadata({
    actionName: "saveCustomer",
  })
  .schema(insertCustomerSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: customer }: SaveCustomerActionArgs) => {
    // New Customer
    if (customer.id === 0) {
      const result = await db
        .insert(customers)
        .values({
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          address1: customer.address1,
          ...(customer.address2?.trim() ? { address2: customer.address2 } : {}),
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
          ...(customer.notes?.trim() ? { notes: customer.notes } : {}),
        })
        .returning({ insertedId: customers.id });

      return {
        message: `Customer ID #${result[0].insertedId} created successfully`,
      };
    }
    // Existing customer
    // updatedAt is set by the database
    const result = await db
      .update(customers)
      .set({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address1: customer.address1,
        address2: customer.address2?.trim() ?? null,
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
        active: customer.active,
        notes: customer.notes?.trim() && null,
      })
      .where(eq(customers.id, customer.id!))
      .returning({ updatedId: customers.id });

    return {
      message: `Customer ID #${result[0].updatedId} updated successfully`,
    };
  });
