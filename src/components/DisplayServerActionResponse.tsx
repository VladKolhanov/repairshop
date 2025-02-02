import { cn } from "@/utils";

type Props = {
  result: {
    data?: {
      message?: string;
    };
    serverError?: string;
    validationErrors?: Record<string, string[] | undefined>;
  };
};

type MessageBoxArgs = {
  type: "success" | "error";
  content: React.ReactNode;
};

const MessageBox = ({ type, content }: MessageBoxArgs) => (
  <div
    className={cn("bg-accent px-4 py-2 my-2 rounded-lg", {
      "text-red-500": type === "error",
    })}
  >
    {type === "success" ? "🎉" : "💡"} {content}
  </div>
);

export const DisplayServerActionResponse = ({ result }: Props) => {
  const { data, serverError, validationErrors } = result;

  return (
    <div>
      {data?.message && (
        <MessageBox type="success" content={`Success: ${data.message}`} />
      )}

      {serverError && <MessageBox type="error" content={serverError} />}

      {validationErrors && (
        <MessageBox
          type="error"
          content={Object.keys(validationErrors).map((key) => (
            <p key={key}>
              {`${key}: ${
                validationErrors[key as keyof typeof validationErrors]
              }`}
            </p>
          ))}
        />
      )}
    </div>
  );
};
