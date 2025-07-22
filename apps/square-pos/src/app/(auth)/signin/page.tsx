"use client";

import SignInPageUI from "./SignInPageUI";
import { useSignInPageLogic } from "./useSignInPageLogic";

export default function SignInPage() {
  const logic = useSignInPageLogic();
  return <SignInPageUI {...logic} />;
}
