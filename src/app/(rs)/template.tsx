import { TemplateProps } from "@/types/app";

export default function Template({ children }: TemplateProps) {
  return <div className="animate-appear">{children}</div>;
}
