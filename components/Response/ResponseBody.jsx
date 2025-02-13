import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const ResponseBody = ({ status, statusText, body }) => {
  const isSuccess = status >= 200 && status < 300;
  const StatusIcon = isSuccess ? CheckCircle : XCircle;

  const formatBody = () => {
    try {
      // If body is already an object, stringify it
      const jsonString =
        typeof body === "string" ? body : JSON.stringify(body, null, 2);
      // Try to parse and re-stringify to format JSON properly
      return JSON.stringify(JSON.parse(jsonString), null, 2);
    } catch (e) {
      // If not valid JSON, return as is
      return typeof body === "string" ? body : JSON.stringify(body, null, 2);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <StatusIcon
          className={`w-6 h-6 ${isSuccess ? "text-green-500" : "text-red-500"}`}
        />
        <span className="font-medium text-gray-700">Status:</span>
        <span
          className={`text-sm font-semibold border rounded-lg px-3 py-1 ${
            isSuccess
              ? "text-green-700 bg-green-100 border-green-400"
              : "text-red-700 bg-red-100 border-red-400"
          }`}
        >
          {status} {statusText}
        </span>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        <SyntaxHighlighter
          language="json"
          style={tomorrow}
          customStyle={{
            margin: 0,
            height: "100%",
          }}
        >
          {formatBody()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default ResponseBody;
