import React from "react";

const ResponseHeaders = ({ headers = {} }) => {
  const isEmpty = Object.keys(headers).length === 0;

  const TableRow = ({ keyName, value }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2 text-sm font-medium text-gray-900">{keyName}</td>
      <td className="px-4 py-2 text-sm text-gray-500 font-mono break-all">
        {value}
      </td>
    </tr>
  );

  const EmptyState = () => (
    <div className="h-full flex flex-col items-center justify-center py-12 px-4 text-gray-500">
      <svg
        className="w-16 h-16 mb-4 text-gray-400"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm0-2h2V7h-2z" />
      </svg>
      <p className="text-base font-medium text-gray-600">
        No Headers received from the server
      </p>
    </div>
  );

  return (
    <div className="h-full bg-white">
      <div className="h-full overflow-auto">
        {isEmpty ? (
          <EmptyState />
        ) : (
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border-b">
                  Key
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border-b">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(headers).map(([key, value]) => {
                if (
                  key.toLowerCase() === "set-cookie" &&
                  Array.isArray(value)
                ) {
                  return value.map((cookie, index) => (
                    <TableRow
                      key={`${key}-${index}`}
                      keyName={key}
                      value={cookie}
                    />
                  ));
                }
                return <TableRow key={key} keyName={key} value={value} />;
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ResponseHeaders;
