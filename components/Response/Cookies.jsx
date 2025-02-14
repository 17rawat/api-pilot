import React from "react";
import { Copy, Download } from "lucide-react";
import { handleCopy } from "@/utils/handleCopy";
import { handleDownload } from "@/utils/handleDownload";
import { cookieParser } from "@/utils/cookieParser";

const TableRow = ({ cookie }) => {
  const { name, value, path, httpOnly, secure, nameValuePair } =
    cookieParser(cookie);

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2 text-sm font-medium text-gray-900">{name}</td>
      <td className="px-4 py-2 text-sm text-gray-500 font-mono break-all">
        {value}
      </td>
      <td className="px-4 py-2 text-sm text-gray-500">{path}</td>
      <td className="px-4 py-2 text-sm text-gray-500">
        {httpOnly ? "true" : "false"}
      </td>
      <td className="px-4 py-2 text-sm text-gray-500">
        {secure ? "true" : "false"}
      </td>
      <td className="px-4 py-2">
        <button
          onClick={() => handleCopy(nameValuePair)}
          className="p-1 hover:bg-gray-200 rounded"
          title="Copy cookie"
        >
          <Copy size={16} />
        </button>
      </td>
      <td className="px-4 py-2">
        <button
          onClick={() => handleDownload(nameValuePair)}
          className="p-1 hover:bg-gray-200 rounded"
          title="Download cookie"
        >
          <Download size={16} />
        </button>
      </td>
    </tr>
  );
};

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
      No cookies received from the server
    </p>
  </div>
);

const CookiesTable = ({ cookies }) => (
  <table className="w-full">
    <thead className="sticky top-0 bg-gray-100">
      <tr>
        {[
          "Name",
          "Value",
          "Path",
          "HttpOnly",
          "Secure",
          "Copy",
          "Download",
        ].map((header) => (
          <th
            key={header}
            className="px-4 py-2 text-left text-sm font-medium text-gray-500 border-b"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {cookies.map((cookie) => (
        <TableRow key={cookie} cookie={cookie} />
      ))}
    </tbody>
  </table>
);

const Cookies = ({ cookies }) => {
  const value = cookies
    .map((cookie) => cookieParser(cookie).value)
    .filter((v) => v === "");

  // console.log(value.length);

  return (
    <div className="h-full bg-white">
      {cookies.length > 0 && value.length === 0 ? (
        <div className="h-full overflow-auto">
          <CookiesTable cookies={cookies} />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Cookies;
