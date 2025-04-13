import React from "react";
import "./App.css";
import {
  FluentProvider,
  makeStyles,
  Tab,
  TabList,
  webDarkTheme,
} from "@fluentui/react-components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { PersonPage } from "./pages/PersonPage";
import { JobPage } from "./pages/JobPage";
import { useTabContext } from "./providers/TabProvider";

const useStyles = makeStyles({
  root: {
    borderRadius: "10px",
  },
  content: {
    padding: "10px",
  },
});

export const App = () => {
  const { activeTab, setActiveTab } = useTabContext();

  const navigate = useNavigate();

  const classes = useStyles();

  React.useEffect(() => {
    navigate(activeTab);
    console.log(activeTab);
    
  }, [navigate, activeTab]);

  return (
    <FluentProvider theme={webDarkTheme} className={classes.root}>
      <div className={classes.content}>
        <TabList
          selectedValue={activeTab}
          onTabSelect={(_, data) => setActiveTab(String(data.value))}
        >
          <Tab content="Person" id="person" value={"person"} />
          <Tab content="Job" id="job" value="job"  />
        </TabList>
        <Routes>
          <Route path="/person" element={<PersonPage />} />
          <Route path="/job" element={<JobPage />} />
        </Routes>
      </div>
    </FluentProvider>
  );
};
