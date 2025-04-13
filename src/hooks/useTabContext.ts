import React from "react";
import { ITabContext, TabContext } from "../contexts/TabContext";

export const useTabContext = (): ITabContext => {
    if (TabContext === undefined) {
        throw new Error("useTab must be used within a TabProvider");
    }

    return React.useContext(TabContext) as ITabContext;
};
