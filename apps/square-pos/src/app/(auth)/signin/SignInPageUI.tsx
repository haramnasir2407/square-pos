import Authenticated from "@/components/composites/home/auth/Authenticated";
import AuthenticationProcessor from "@/components/composites/home/auth/AuthenticationProcessor";
import SignInButton from "@/components/composites/home/signin/SignInButton";
import SignInText from "@/components/composites/home/signin/SignInText";
import ErrorComponent from "@/components/primitives/derived/ErrorComponent";
import HomeLoader from "@/components/primitives/derived/HomeLoader";
import type { Session } from "next-auth";
import { css } from "../../../../styled-system/css";

interface SignInPageUIProps {
  session: Session | null;
  status: string;
  isProcessing: boolean;
  error: string | null;
  hasOAuthCode: string | null;
}

export default function SignInPageUI({
  session,
  status,
  isProcessing,
  error,
  hasOAuthCode,
}: SignInPageUIProps) {
  if (status === "loading") {
    return <HomeLoader />;
  }

  if (session && !hasOAuthCode && !isProcessing) {
    return <Authenticated session={session} />;
  }

  if (isProcessing) {
    return <AuthenticationProcessor />;
  }

  return (
    !isProcessing && (
      <div
        className={css({
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(to bottom right, #eff6ff, #e0e7ff, #f3e8ff)",
          padding: "16px",
        })}
      >
        <div
          className={css({
            maxWidth: "448px",
            width: "100%",
          })}
        >
          <div
            className={css({
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              padding: "32px",
            })}
          >
            <SignInText />

            {error && <ErrorComponent error={error} />}

            <SignInButton />

            <div
              className={css({
                marginTop: "32px",
                textAlign: "center",
              })}
            >
              <p
                className={css({
                  fontSize: "14px",
                  color: "#6b7280",
                })}
              >
                By signing in, you agree to our{" "}
                <a
                  href="/terms"
                  className={css({
                    color: "#2563eb",
                    _hover: {
                      color: "#1d4ed8",
                    },
                    fontWeight: "500",
                  })}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/policy"
                  className={css({
                    color: "#2563eb",
                    _hover: {
                      color: "#1d4ed8",
                    },
                    fontWeight: "500",
                  })}
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
