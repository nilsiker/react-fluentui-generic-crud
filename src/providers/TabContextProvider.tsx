import React, { PropsWithChildren } from "react";
import { TabContext } from "../contexts/TabContext";

export const TabContextProvider = ({ children }: PropsWithChildren) => {
  const [activeTab, setActiveTab] = React.useState("person");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};
