import { Header } from "@/components/Header";
import { LayoutProps } from "@/types/app";

export default async function RSLayout({ children }: LayoutProps) {
  return (
    <div className="mx-auto w-full max-w-7xl overflow-hidden">
      <Header />
      <div className="px-4 py-2">{children}</div>
    </div>
  );
}
