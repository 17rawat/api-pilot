"use client";

import React, { useState } from "react";
import TabsNavigation from "@/components/Request/TabsNavigation";
import { Send } from "lucide-react";
import ResponseTabNavigation from "../Response/ResponseTabNavigation";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const Request = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [queryParams, setQueryParams] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const urlObj = new URL(url);
      queryParams.forEach(({ key, value }) => {
        if (key && value) {
          urlObj.searchParams.append(key, value);
        }
      });

      const finalUrl = urlObj.toString();
      const res = await fetch(finalUrl, { method });

      // console.log(res);

      let responseData;
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        responseData = await res.json();
      } else {
        responseData = await res.text();
      }

      // console.log(responseData);
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        body: responseData,
      });
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

  // console.log(response);

  return (
    <div
      className="w-full rounded-lg border border-gray-200 bg-white shadow-sm"
      role="region"
      aria-label="API Request Form"
    >
      <form onSubmit={handleSubmit} className="p-3 md:p-4">
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
            placeholder="Enter URL"
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

      <TabsNavigation
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        headers={headers}
        setHeaders={setHeaders}
        body={body}
        setBody={setBody}
      />

      <div>{response && <ResponseTabNavigation {...response} />}</div>
    </div>
  );
};

export default Request;
