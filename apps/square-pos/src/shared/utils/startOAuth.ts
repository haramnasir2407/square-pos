// can i make this a server action?

export const startSquareOAuth = () => {
  const clientId = process.env.NEXT_PUBLIC_SQUARE_CLIENT_ID ?? "";
  const redirectUri = "http://localhost:3000/signin";

  const authUrl = new URL(
    "https://connect.squareupsandbox.com/oauth2/authorize"
  );
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set(
    "scope",
    "MERCHANT_PROFILE_READ ITEMS_READ ITEMS_WRITE INVENTORY_READ INVENTORY_WRITE ORDERS_READ ORDERS_WRITE"
  );
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", redirectUri);

  window.location.href = authUrl.toString();
};
