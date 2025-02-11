import React, { useState } from "react";
import QueryParams from "./QueryParams";
import Headers from "./Headers";
import Body from "./Body";
import { Database, FileJson, Settings } from "lucide-react";

const TabsNavigation = ({
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
      component: Headers,
      props: { headers, setHeaders },
    },
    {
      name: "Body",
      icon: FileJson,
      component: Body,
      props: { body, setBody },
    },
  ];

  const [currentTab, setCurrentTab] = useState(0);
  const CurrentTabComponent = tabs[currentTab].component;

  return (
    <div>
      <div className="flex border-t border-gray-200">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.name}
              onClick={() => setCurrentTab(index)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 ${
                currentTab === index
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
            </button>
          );
        })}
      </div>

      <div className="p-4">
        <CurrentTabComponent {...tabs[currentTab].props} />
      </div>
    </div>
  );
};

export default TabsNavigation;
