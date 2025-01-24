export type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export type TemplateProps = {
  children: React.ReactNode;
};

export type PageProps<
  TParams extends Record<string, unknown> | undefined = Record<string, unknown>,
  TSearchParams extends Record<string, string> | undefined = undefined
> = {
  params: TParams;
  searchParams: Promise<TSearchParams>;
};
