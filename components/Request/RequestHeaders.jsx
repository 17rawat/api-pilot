import React from "react";
import { Plus, Trash2 } from "lucide-react";

const RequestHeaders = ({ headers, setHeaders }) => {
  const addHeader = () => {
    setHeaders([{ key: "", value: "", enabled: true }, ...headers]);
  };

  const removeHeader = (index) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setHeaders(newHeaders);
  };

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="space-y-2 pr-2">
          {headers.map((header, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={header.enabled}
                onChange={(e) =>
                  updateHeader(index, "enabled", e.target.checked)
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              <input
                type="text"
                value={header.key}
                onChange={(e) => updateHeader(index, "key", e.target.value)}
                placeholder="Key"
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none hover:border-gray-300"
              />
              <input
                type="text"
                value={header.value}
                onChange={(e) => updateHeader(index, "value", e.target.value)}
                placeholder="Value"
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none hover:border-gray-300"
              />
              <button
                onClick={() => removeHeader(index)}
                className="inline-flex items-center justify-center rounded-md p-2 text-red-400 outline-none hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 pt-2 bg-white border-t">
        <button
          onClick={addHeader}
          className="w-full inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 outline-none hover:bg-gray-50"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Header
        </button>
      </div>
    </div>
  );
};

export default RequestHeaders;
