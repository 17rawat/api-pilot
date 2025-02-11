import React from "react";
import { Plus, Trash } from "lucide-react";

const QueryParams = ({ queryParams, setQueryParams }) => {
  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: "", value: "" }]);
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
    <div className="space-y-4">
      <div className="max-h-[200px] space-y-3 overflow-y-auto">
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
              <Trash className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addQueryParam}
        className="inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 outline-none hover:bg-gray-50"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Params
      </button>
    </div>
  );
};

export default QueryParams;
