export async function POST(request) {
  try {
    const { url, method, headers, body } = await request.json();

    // console.log(url, method, headers, body);

    const requestConfig = {
      method,
      headers,
    };

    if (["POST", "PUT", "PATCH"].includes(method) && body) {
      requestConfig.body = body;
    }

    const response = await fetch(url, requestConfig);

    let responseData;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    const formattedHeaders = {};

    response.headers.forEach((value, key) => {
      if (key === "set-cookie") {
        if (!formattedHeaders[key]) {
          formattedHeaders[key] = [];
        }
        const cookies = value.split(",").map((cookie) => cookie.trim());
        formattedHeaders[key].push(...cookies);
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
    return Response.json(
      {
        status: "Error",
        statusText: error.message,
        headers: {},
        body: null,
      },
      { status: 500 }
    );
  }
}
