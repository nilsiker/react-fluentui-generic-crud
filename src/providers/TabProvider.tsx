import React, { PropsWithChildren } from "react";

interface ITabContext {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

const TabContext = React.createContext<ITabContext | undefined>(undefined);

export const TabProvider = ({ children }: PropsWithChildren) => {
  const [activeTab, setActiveTab] = React.useState("person");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = (): ITabContext => {
  if (TabContext === undefined) {
    throw new Error("useTab must be used within a TabProvider");
  }

  return React.useContext(TabContext) as ITabContext;
};
