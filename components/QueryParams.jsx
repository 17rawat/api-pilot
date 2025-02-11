import React from "react";
import { Plus, X } from "lucide-react";

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
    <div>
      <div className="space-y-3">
        {queryParams.map((param, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Key"
              value={param.key}
              onChange={(e) => handleChange(index, "key", e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Value"
              value={param.value}
              onChange={(e) => handleChange(index, "value", e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => removeQueryParam(index)}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addQueryParam}
        className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Query Param
      </button>
    </div>
  );
};

export default QueryParams;
