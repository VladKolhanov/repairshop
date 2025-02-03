import { eq, ilike, or } from "drizzle-orm";

import { db } from "@/db/db";
import { customers } from "@/db/schema";

export async function getCustomer(id: number) {
  const customer = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));

  return customer[0];
}

export async function getCustomerSearch(searchText: string) {
  const results = await db
    .select()
    .from(customers)
    .where(
      or(
        ilike(customers.firstName, `%${searchText}%`),
        ilike(customers.lastName, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.address1, `%${searchText}%`),
        ilike(customers.address2, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.state, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        ilike(customers.notes, `%${searchText}%`)
      )
    );

  return results;
}
