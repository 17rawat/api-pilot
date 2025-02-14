export const cookieParser = (cookieStr) => {
  console.log("just checking");

  if (!cookieStr) return null;

  const parts = cookieStr.split(";").map((part) => part.trim());
  const [nameValue, ...attributes] = parts;
  const [name, value] = nameValue.split("=");

  return {
    name, // token
    value, // token
    path:
      attributes
        .find((attr) => attr.toLowerCase().startsWith("path="))
        ?.split("=")[1] || "",
    httpOnly: attributes.some((attr) => attr.toLowerCase() === "httponly"),
    secure: attributes.some((attr) => attr.toLowerCase() === "secure"),

    nameValuePair: nameValue, // name=value
  };
};

export const getCookieNameValuePair = (cookieStr) => {
  const { nameValuePair, name, value } = cookieParser(cookieStr);
  return { nameValuePair, name, value };
};
