import { Button } from "@/components/primitives/ui/button";
import { startSquareOAuth } from "@/shared/utils/startOAuth";
import { css } from "~/styled-system/css";
import { flex } from "~/styled-system/patterns";

export default function SignInButton() {
  return (
    <Button
      type="button"
      onClick={startSquareOAuth}
      variant="primary"
      size="lg"
      shape="rounded"
      width="full"
      className={css({
        width: "100%",
        background: "linear-gradient(to right, #2563eb, #4f46e5)",
        color: "white",
        padding: "16px 24px",
        borderRadius: "12px",
        fontWeight: "600",
        _hover: {
          background: "linear-gradient(to right, #1d4ed8, #4338ca)",
          transform: "scale(1.02)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        },
        _focus: {
          outline: "none",
          ring: "2px",
          ringColor: "#3b82f6",
          ringOffset: "2px",
        },
        transition: "all 0.2s",
        transform: "scale(1)",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      })}
    >
      <div
        className={flex({
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        })}
      >
        <svg
          className={css({ height: "24px", width: "24px" })}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Success checkmark</title>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <span>Sign in with Square</span>
      </div>
    </Button>
  );
}
