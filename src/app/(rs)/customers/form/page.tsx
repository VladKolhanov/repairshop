import * as Sentry from "@sentry/nextjs";

import { getCustomer } from "@/services/customers";
import { PageProps } from "@/types/app";
import { BackButton } from "@/components/BackButton";

import CustomerForm from "./_components/CustomerForm";

type Props = PageProps<
  undefined,
  {
    customerId: string;
  }
>;

export default async function CustomerFormPage({ searchParams }: Props) {
  const { customerId } = await searchParams;

  try {
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

      return <CustomerForm customer={customer} />;
    } else {
      return <CustomerForm />;
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
