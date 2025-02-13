export async function POST(request) {
  try {
    const { url, method, headers, body } = await request.json();

    const requestConfig = {
      method,
      headers,
      credentials: "include",
    };

    if (["POST", "PUT", "PATCH"].includes(method) && body) {
      requestConfig.body = body;
    }

    const response = await fetch(url, requestConfig);

    let responseData;
    const contentType = response.headers.get("content-type");

    responseData =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    const formattedHeaders = {};

    response.headers.forEach((value, key) => {
      if (key === "set-cookie") {
        formattedHeaders[key] = formattedHeaders[key] || [];
        formattedHeaders[key] = formattedHeaders[key].concat(
          value.split(/,(?=\s*\w+=)/)
        );
      } else {
        formattedHeaders[key] = value;
      }
    });

    return Response.json({
      status: response.status,
      statusText: response.statusText,
      headers: formattedHeaders,
      body: responseData,
    });
  } catch (error) {
    // console.error("Request processing error:", error);

    return Response.json({
      status: "500",
      statusText: error.message || "An unexpected error occurred",
      headers: {},
      body: {},
    });
  }
}
