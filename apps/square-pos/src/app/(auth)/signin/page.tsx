"use client";

import dynamic from "next/dynamic";
import { useSignInPageLogic } from "./useSignInPageLogic";

// * this way it wont be ssr'ed, uses dynamic import
const SignInPageUI = dynamic(() => import("./SignInPageUI"), { ssr: false });

export default function SignInPage() {
  const logic = useSignInPageLogic();
  return <SignInPageUI {...logic} />;
}
