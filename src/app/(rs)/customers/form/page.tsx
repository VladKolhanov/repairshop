import * as Sentry from "@sentry/nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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

export async function generateMetadata({ searchParams }: Props) {
  const { customerId } = await searchParams;

  if (!customerId) return { title: "New Customer" };

  return { title: `Edit Customer #${customerId}` };
}

export default async function CustomerFormPage({ searchParams }: Props) {
  const { customerId } = await searchParams;

  try {
    const { getPermission } = getKindeServerSession();
    const managerPermission = await getPermission("manager");
    const isManager = managerPermission?.isGranted;

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

      return (
        <CustomerForm
          key={customerId}
          isManager={isManager}
          customer={customer}
        />
      );
    } else {
      return <CustomerForm key="new" isManager={isManager} />;
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
