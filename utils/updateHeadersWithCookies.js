import { getCookieNameValuePair } from "@/utils/cookieParser";

export const updateHeadersWithCookies = (headers, cookie) => {
  const { nameValuePair, value } = getCookieNameValuePair(cookie);

  // Check for logout case token=;
  if (value === "") {
    return headers.filter((h) => h.key !== "Cookie");
  }

  return [
    {
      key: "Cookie",
      value: nameValuePair,
      enabled: true,
    },
    ...headers.filter((h) => h.key !== "Cookie"),
  ];
};
