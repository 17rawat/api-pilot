import React from "react";
import { Plus, Trash2 } from "lucide-react";

const QueryParams = ({ queryParams, setQueryParams }) => {
  const addQueryParam = () => {
    setQueryParams([{ key: "", value: "" }, ...queryParams]);
  };

  const removeQueryParam = (index) => {
    setQueryParams(queryParams.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updatedParams = queryParams.map((param, i) =>
      i === index ? { ...param, [field]: value } : param
    );
    setQueryParams(updatedParams);
  };

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="space-y-2 pr-2">
          {queryParams.map((param, index) => (
            <div key={index} className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                placeholder="Key"
                value={param.key}
                onChange={(e) => handleChange(index, "key", e.target.value)}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none hover:border-gray-300"
              />
              <input
                type="text"
                placeholder="Value"
                value={param.value}
                onChange={(e) => handleChange(index, "value", e.target.value)}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none hover:border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeQueryParam(index)}
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
          type="button"
          onClick={addQueryParam}
          className="w-full inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 outline-none hover:bg-gray-50"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Param
        </button>
      </div>
    </div>
  );
};

export default QueryParams;
