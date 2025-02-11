"use client";

import React, { useState } from "react";
import Response from "./Response";
import TabsNavigation from "./TabsNavigation";
import { Send } from "lucide-react";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const Request = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [queryParams, setQueryParams] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    }
  };

  // console.log(response);

  return (
    <div className="rounded-lg shadow-sm border border-gray-200">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex gap-2">
          <select
            value={method}
            onChange={(event) => setMethod(event.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {methods.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <input
            type="text"
            value={url}
            placeholder="Enter URL"
            onChange={(event) => setUrl(event.target.value)}
            className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Send className="w-4 h-4 mr-2" />
            Send
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

      {response && <Response {...response} />}
    </div>
  );
};

export default Request;
