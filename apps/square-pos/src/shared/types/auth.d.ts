import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    merchantId?: string;
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
    };
  }
}