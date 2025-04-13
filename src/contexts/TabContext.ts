import React from "react";

export interface ITabContext {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

export const TabContext = React.createContext<ITabContext | undefined>(undefined);
