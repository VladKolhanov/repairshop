import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://d4745b8906b08cc45cb21b950b0cabd5@o4508087428644864.ingest.de.sentry.io/4508647308197968",
  ignoreErrors: [/^NEXT_REDIRECT$/],
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});
