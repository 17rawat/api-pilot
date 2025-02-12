"use client";

import React, { useState } from "react";
import QueryParams from "@/components/Request/QueryParams";
import RequestHeaders from "@/components/Request/RequestHeaders";
import RequestBody from "@/components/Request/RequestBody";
import { Database, FileJson, Settings } from "lucide-react";

const RequestTabsNavigation = ({
  queryParams,
  setQueryParams,
  headers,
  setHeaders,
  body,
  setBody,
}) => {
  const tabs = [
    {
      name: "Params",
      icon: Database,
      component: QueryParams,
      props: { queryParams, setQueryParams },
    },
    {
      name: "Headers",
      icon: Settings,
      component: RequestHeaders,
      props: { headers, setHeaders },
    },
    {
      name: "Body",
      icon: FileJson,
      component: RequestBody,
      props: { body, setBody },
    },
  ];

  const [currentTab, setCurrentTab] = useState(0);
  const CurrentTabComponent = tabs[currentTab].component;

  return (
    <div className="rounded-lg border bg-white shadow-sm" role="tablist">
      <div className="flex overflow-x-auto border-b bg-gray-50">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.name}
              onClick={() => setCurrentTab(index)}
              role="tab"
              aria-selected={currentTab === index}
              aria-controls={`${tab.name}-panel`}
              id={`${tab.name}-tab`}
              className={`flex min-w-[120px] items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 outline-none ${
                currentTab === index
                  ? "border-b-2 border-blue-600 bg-white text-blue-600"
                  : "border-b-2 border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {tab.name}
            </button>
          );
        })}
      </div>

      <div
        className="p-4 md:p-6"
        role="tabpanel"
        aria-labelledby={`${tabs[currentTab].name}-tab`}
        id={`${tabs[currentTab].name}-panel`}
      >
        <CurrentTabComponent {...tabs[currentTab].props} />
      </div>
    </div>
  );
};

export default RequestTabsNavigation;
