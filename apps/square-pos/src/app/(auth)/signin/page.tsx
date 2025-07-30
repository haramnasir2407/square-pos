"use client";

import { Button } from "@/components/primitives/ui/button";
import { css } from "~/styled-system/css";

// import dynamic from "next/dynamic";
// import useSignInPage from "../../../shared/hooks/useSignInPage";
// // import SignInPageUI from "@/components/composites/home/signin/SignInPageUI";

// // * this way the client coomponent wont be ssr'ed, perform lazy loading using dynamic import (prevents hydration error)
// const SignInPageUI = dynamic(
//   () => import("@/components/composites/home/signin/SignInPageUI"),
//   { ssr: false }
// );

export default function SignInPage() {
  return (
    <Button
      variant="outlined"
      size="lg"
      className={css({
        borderColor: "border",
        color: "text.secondary",
        bg: "surface.elevated",
        _hover: {
          color: "text",
        },
      })}
    >
      Components
    </Button>
  );
  // const logic = useSignInPage();
  // return <SignInPageUI {...logic} />;
}
