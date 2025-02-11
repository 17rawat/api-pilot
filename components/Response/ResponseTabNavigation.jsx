"use client";
import ResponseHeaders from "@/components/Response/ResponseHeaders";
import ResponseBody from "@/components/Response/ResponseBody";
import Cookies from "@/components/Response/Cookies";
import React, { useState } from "react";
import { FileText, Settings, Cookie } from "lucide-react";

const ResponseTabNavigation = ({ status, statusText, body, headers }) => {
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
    },
  ];

  const [currentTab, setCurrentTab] = useState(0);
  const CurrentTabComponent = tabs[currentTab].component;

  return (
    <div className="border-t border-gray-200">
      <div className="flex overflow-x-auto">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.name}
              onClick={() => setCurrentTab(index)}
              className={`flex min-w-[120px] items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors outline-none ${
                currentTab === index
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              <Icon className="h-4 w-4" />
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

export default ResponseTabNavigation;
