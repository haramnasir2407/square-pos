"use client";

import dynamic from "next/dynamic";
import useSignInPage from "../../../shared/hooks/useSignInPage";
// import SignInPageUI from "@/components/composites/home/signin/SignInPageUI";

// * this way the client coomponent wont be ssr'ed, perform lazy loading using dynamic import (prevents hydration error)
const SignInPageUI = dynamic(
  () => import("@/components/composites/home/signin/SignInPageUI"),
  { ssr: false }
);

export default function SignInPage() {
  const logic = useSignInPage();
  return <SignInPageUI {...logic} />;
}
