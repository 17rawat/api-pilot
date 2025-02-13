"use client";
import ResponseHeaders from "@/components/Response/ResponseHeaders";
import ResponseBody from "@/components/Response/ResponseBody";
import Cookies from "@/components/Response/Cookies";
import React, { useState } from "react";
import { FileText, Settings, Cookie } from "lucide-react";

const ResponseTabsNavigation = ({ status, statusText, body, headers }) => {
  const tabs = [
    {
      name: "Response",
      component: ResponseBody,
      icon: FileText,
      props: { status, statusText, body },
    },
    {
      name: "Headers",
      component: ResponseHeaders,
      icon: Settings,
      props: { headers },
    },
    {
      name: "Cookies",
      component: Cookies,
      icon: Cookie,
      props: { cookies: headers["set-cookie"] || [] },
    },
  ];

  const [currentTab, setCurrentTab] = useState(0);
  const CurrentTabComponent = tabs[currentTab].component;

  return (
    <div className="h-full flex flex-col">
      <div className="flex overflow-x-auto border-b bg-gray-50">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.name}
              onClick={() => setCurrentTab(index)}
              className={`flex min-w-[120px] items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 outline-none ${
                currentTab === index
                  ? "border-b-2 border-blue-600 bg-white text-blue-600"
                  : "border-b-2 border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.name}
            </button>
          );
        })}
      </div>

      <div className="flex-1 min-h-0">
        <CurrentTabComponent {...tabs[currentTab].props} />
      </div>
    </div>
  );
};

export default ResponseTabsNavigation;
