// // gateway that connects Next.js app to the Auth.js authentication system

// import { API_CONFIG } from "@/shared/constants/api";
// import NextAuth from "next-auth";

// export const { auth, handlers, signIn, signOut } = NextAuth({
//   providers: [
//     {
//       id: "square",
//       name: "Square",
//       type: "oauth",
//       clientId: process.env.SQUARE_CLIENT_ID ?? "",
//       clientSecret: process.env.SQUARE_CLIENT_SECRET ?? "",
//       authorization: {
//         url: `${process.env.SQUARE_API_BASE}/oauth2/authorize`,
//         params: {
//           scope:
//             "MERCHANT_PROFILE_READ ITEMS_READ ITEMS_WRITE INVENTORY_READ INVENTORY_WRITE ORDERS_READ ORDERS_WRITE", // * permissions allowed
//           response_type: "code",
//         },
//       },
//       // * token exchange after receiving authorization code at the redirect callback uri
//       token: {
//         url: `${process.env.SQUARE_API_BASE}/oauth2/token`,
//         async request({ params }: { params: Record<string, unknown> }) {
//           const response = await fetch(
//             `${process.env.SQUARE_API_BASE}/oauth2/token`,
//             {
//               method: "POST",
//               headers: {
//                 "Square-Version": `${API_CONFIG.SQUARE_VERSION}`,
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 client_id: process.env.SQUARE_CLIENT_ID ?? "",
//                 client_secret: process.env.SQUARE_CLIENT_SECRET ?? "",
//                 code: params.code,
//                 grant_type: "authorization_code",
//                 redirect_uri: `${process.env.SQUARE_REDIRECT_URI ?? ""}`,
//               }),
//             }
//           );

//           if (!response.ok) {
//             throw new Error(`Token exchange failed: ${response.status}`);
//           }

//           const tokens = await response.json();
//           // console.log("Successfully received tokens:", tokens);
//           return { tokens };
//         },
//       },
//       userinfo: {
//         url: `${process.env.SQUARE_API_BASE}/v2/merchants/me`,
//         async request({ tokens }: { tokens: Record<string, unknown> }) {
//           const res = await fetch(
//             `${process.env.SQUARE_API_BASE}/v2/merchants/me`,
//             {
//               headers: {
//                 Authorization: `Bearer ${tokens.access_token}`,
//                 "Content-Type": "application/json",
//                 "Square-Version": `${API_CONFIG.SQUARE_VERSION}`,
//               },
//             }
//           );
//           const data = await res.json();
//           // console.log(data.merchant);
//           return data;
//         },
//       },
//       profile(profile) {
//         return {
//           id: profile.merchant?.id || "default-id",
//           name: profile.merchant?.business_name || null,
//           email: profile.email || null,
//           image: null,
//         };
//       },
//     },
//   ],
//   callbacks: {
//     // * jwt is used to persist custom properties in the token
//     async jwt({ token, account, profile }) {
//       if (account && profile) {
//         token.sub =
//           (profile as { merchant?: { id?: string } }).merchant?.id ||
//           "default-id";
//         token.name =
//           (profile as { merchant?: { business_name?: string } }).merchant
//             ?.business_name || null;
//         token.email = (profile as { email?: string }).email || null;
//         token.accessToken = account?.access_token;
//       }
//       // * On subsequent requests, just return the token as is
//       // console.log(token);
//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub ?? "";
//       }
//       session.accessToken = token.accessToken as string;
//       // console.log("session:", session);
//       // console.log("session:", session.accessToken);
//       return session;
//     },
//     async signIn({ account }) {
//       // console.log("Access Token:", account?.access_token);
//       return true;
//     },
//   },
//   // secret: process.env.NEXTAUTH_SECRET,
//   debug: false,
// });
// import { authConfig } from "./src/app/lib/auth/config";

// export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     {
//       id: "square",
//       name: "Square",
//       type: "oauth",
//       clientId: process.env.SQUARE_CLIENT_ID!,
//       clientSecret: process.env.SQUARE_CLIENT_SECRET!,
//       authorization: {
//         url: "https://connect.squareupsandbox.com/oauth2/authorize",
//         params: { scope: "MERCHANT_PROFILE_READ", response_type: "code" },
//       },
//       token: "https://connect.squareupsandbox.com/oauth2/token",
//       userinfo: {
//         url: "https://connect.squareupsandbox.com/v2/merchants/me",
//         async request({ tokens }: { tokens: { access_token: string } }) {
//           const res = await fetch(
//             "https://connect.squareupsandbox.com/v2/merchants/me",
//             {
//               headers: {
//                 Authorization: `Bearer ${tokens.access_token}`,
//                 "Square-Version": "2023-10-18",
//               },
//             }
//           );
//           const data = await res.json();
//           return data.merchant;
//         },
//       },
//       profile(profile) {
//         return {
//           id: profile.id,
//           name: profile.business_name || profile.name || "Square User",
//           email: profile.email || null,
//           image: null,
//         };
//       },
//     },
//   ],
//   debug: true,
// });

import NextAuth from "next-auth";
import type { Account, Profile, Session, User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
// Extend Session type to include custom properties
interface CustomSession extends Session {
  accessToken?: string;
  merchantId?: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        accessToken: { label: "Access Token", type: "text" },
        refreshToken: { label: "Refresh Token", type: "text" },
        merchantId: { label: "Merchant ID", type: "text" },
        merchantName: { label: "Merchant Name", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.accessToken) {
          return null;
        }

        return {
          id: credentials.merchantId as string,
          name: credentials.merchantName as string,
          email: null,
          image: null,
          accessToken: credentials.accessToken as string,
          refreshToken: credentials.refreshToken as string,
          merchantId: credentials.merchantId as string,
        };
      },
    },
    {
      id: "square",
      name: "Square",
      type: "oauth",
      clientId: process.env.SQUARE_CLIENT_ID ?? "",
      clientSecret: process.env.SQUARE_CLIENT_SECRET ?? "",
      authorization: {
        url: "https://connect.squareupsandbox.com/oauth2/authorize",
        params: {
          scope:
            "MERCHANT_PROFILE_READ ITEMS_READ ITEMS_WRITE INVENTORY_READ INVENTORY_WRITE ORDERS_READ ORDERS_WRITE",
          response_type: "code",
        },
      },
      token: {
        url: "https://connect.squareupsandbox.com/oauth2/token",
        async request({
          client,
          params,
          checks,
          provider,
        }: {
          client: {
            clientId: string;
            clientSecret: string;
            redirectUri: string;
          };
          params: { code?: string };
          checks?: { code_verifier?: string };
          provider: { token?: { url?: string } };
        }) {
          console.log("Custom token request for Square");
          console.log("Code:", params.code);
          console.log("Redirect URI:", client.redirectUri);
          console.log("Checks:", checks);

          const body = new URLSearchParams({
            client_id: client.clientId,
            client_secret: client.clientSecret,
            code: params.code ?? "",
            grant_type: "authorization_code",
            redirect_uri: client.redirectUri,
          });

          // Add PKCE code verifier if present (even though we don't want PKCE, NextAuth might still send it)
          if (checks?.code_verifier) {
            console.log("Adding code_verifier:", checks.code_verifier);
            body.append("code_verifier", checks.code_verifier);
          }

          console.log("Request body:", body.toString());

          const response = await fetch(provider.token?.url ?? "", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
            body,
          });

          console.log("Token response status:", response.status);
          console.log(
            "Token response headers:",
            Object.fromEntries(response.headers.entries())
          );

          const responseText = await response.text();
          console.log("Token response body:", responseText);

          if (!response.ok) {
            console.error(
              "Token request failed:",
              response.status,
              responseText
            );
            throw new Error(
              `Token request failed: ${response.status} ${responseText}`
            );
          }

          const tokens = JSON.parse(responseText);
          console.log("Received tokens:", tokens);

          // Return the format NextAuth expects
          return {
            tokens: {
              access_token: tokens.access_token,
              refresh_token: tokens.refresh_token,
              expires_in: tokens.expires_at
                ? Math.floor(
                    (new Date(tokens.expires_at).getTime() - Date.now()) / 1000
                  )
                : undefined,
              token_type: tokens.token_type,
            },
          };
        },
      },
      userinfo: {
        url: "https://connect.squareupsandbox.com/v2/merchants/me",
        async request({ tokens }: { tokens: { access_token: string } }) {
          const res = await fetch(
            "https://connect.squareupsandbox.com/v2/merchants/me",
            {
              headers: {
                Authorization: `Bearer ${tokens.access_token}`,
                "Square-Version": "2023-10-18",
              },
            }
          );

          if (!res.ok) {
            const errorText = await res.text();
            console.error("Userinfo request failed:", res.status, errorText);
            throw new Error(
              `Userinfo request failed: ${res.status} ${errorText}`
            );
          }

          const data = await res.json();
          return data.merchant;
        },
      },
      profile(profile: {
        id: string;
        business_name?: string;
        name?: string;
        owner_email?: string;
        email?: string;
      }) {
        return {
          id: profile.id,
          name: profile.business_name || profile.name || "Square User",
          email: profile.owner_email || profile.email || null,
          image: null,
        };
      },
      checks: [], // Try to disable PKCE
    },
  ],
  callbacks: {
    async jwt({
      token,
      account,
      profile,
      user,
    }: {
      token: JWT;
      account?: Account | null;
      profile?: Profile;
      user?: User | AdapterUser;
    }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        // merchant_id is not standard, so check type
        if (
          account &&
          typeof account === "object" &&
          "merchant_id" in account
        ) {
          token.merchantId = (account as { merchant_id?: string }).merchant_id;
        }
      }

      // Handle credentials provider
      if (user && typeof user === "object" && "accessToken" in user) {
        token.accessToken = (user as { accessToken?: string }).accessToken;
        token.refreshToken = (user as { refreshToken?: string }).refreshToken;
        token.merchantId = (user as { merchantId?: string }).merchantId;
      }

      return token;
    },
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken =
        typeof token.accessToken === "string" ? token.accessToken : undefined;
      session.merchantId =
        typeof token.merchantId === "string" ? token.merchantId : undefined;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  //   debug: process.env.NODE_ENV === "development",
});
