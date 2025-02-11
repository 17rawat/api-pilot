import React from "react";

const ResponseHeaders = ({ headers }) => {
  console.log(headers);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <pre className="max-h-[500px] overflow-auto bg-gray-50 p-4 text-sm text-gray-900">
        {JSON.stringify(headers, null, 2)}
      </pre>
    </div>
  );
};

export default ResponseHeaders;
