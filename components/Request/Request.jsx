"use client";

import React, { useState } from "react";
import RequestTabsNavigation from "@/components/Request/RequestTabsNavigation";
import { Send } from "lucide-react";
import ResponseTabsNavigation from "@/components/Response/ResponseTabsNavigation";
import { DEFAULT_HEADERS } from "@/utils/defaultHeaders";
import { updateHeadersWithCookies } from "@/utils/updateHeadersWithCookies";
const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const Request = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [queryParams, setQueryParams] = useState([]);
  const [headers, setHeaders] = useState(DEFAULT_HEADERS);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // handling URL with or without params
      const urlObj = new URL(url);
      queryParams.forEach(({ key, value }) => {
        if (key && value) {
          urlObj.searchParams.append(key, value);
        }
      });
      const finalUrl = urlObj.toString();

      // handling REQUEST HEADERS
      const headerObj = {};
      headers.forEach(({ key, value, enabled }) => {
        if (key && value && enabled) {
          headerObj[key] = value;
        }
      });

      const response = await fetch("/api/proxy", {
        method: "POST",
        body: JSON.stringify({
          url: finalUrl,
          method,
          headers: headerObj,
          body: ["POST", "PUT", "PATCH"].includes(method) ? body : undefined,
        }),
      });

      // console.log(response);

      const data = await response.json();

      // Set Cookie in headers for further requests
      if (data.headers["set-cookie"]?.length > 0) {
        const updatedHeaders = updateHeadersWithCookies(
          headers,
          data.headers["set-cookie"][0]
        );
        setHeaders(updatedHeaders);
      }

      setResponse(data);
    } catch (error) {
      // console.log(error);
      setResponse({
        status: "Error",
        statusText: error.message,
        headers: {},
        body: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-3rem)]">
      <div className="h-full flex flex-col gap-2">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <form onSubmit={handleSubmit} className="p-3">
            <div className="flex flex-col gap-3 md:flex-row md:gap-2">
              <label className="sr-only" htmlFor="method-select">
                HTTP Method
              </label>
              <select
                id="method-select"
                value={method}
                onChange={(event) => setMethod(event.target.value)}
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 outline-none hover:border-gray-300 md:w-auto"
              >
                {methods.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <label className="sr-only" htmlFor="url-input">
                URL
              </label>
              <input
                id="url-input"
                type="url"
                value={url}
                placeholder="http://example.com/"
                onChange={(event) => setUrl(event.target.value)}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none hover:border-gray-300"
                required
              />

              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white outline-none ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <Send
                  className={`mr-2 h-4 w-4 ${isLoading ? "animate-pulse" : ""}`}
                />
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>

          <RequestTabsNavigation
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            headers={headers}
            setHeaders={setHeaders}
            body={body}
            setBody={setBody}
          />
        </div>

        <div className="flex-1 min-h-0 rounded-lg border border-gray-200 bg-white shadow-sm">
          {response ? (
            <ResponseTabsNavigation {...response} />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500 text-md">
              Enter the URL and click SEND to get response
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Request;
