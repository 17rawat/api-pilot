import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const Response = ({ status, statusText, body, headers }) => {
  // console.log(status);

  const isSuccess = status >= 200 && status < 300;
  const StatusIcon = isSuccess ? CheckCircle : XCircle;

  return (
    <div className="border-t border-gray-200 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Response</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <StatusIcon
            className={`w-5 h-5 ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          />
          <span className="font-medium text-gray-700">Status:</span>
          <span
            className={`text-gray-900  border rounded px-2 py-1 ${
              isSuccess
                ? "text-green-500 bg-green-100"
                : "text-red-500 bg-red-100"
            }`}
          >
            {status} {statusText}
          </span>
        </div>

        {headers && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Headers:</h3>
            <pre className="bg-gray-50 p-3 rounded-md text-sm text-gray-900 overflow-auto">
              {JSON.stringify(headers, null, 2)}
            </pre>
          </div>
        )}

        {body && (
          <div className="max-h-[600px] overflow-y-auto">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Body:</h3>
            <pre className="bg-gray-50 p-3 rounded-md text-sm text-gray-900 overflow-auto">
              {typeof body === "string" ? body : JSON.stringify(body, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Response;
