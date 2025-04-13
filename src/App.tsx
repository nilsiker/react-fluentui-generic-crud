import React, { useState } from "react";
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


const useStyles = makeStyles({
  root: {
    borderRadius: "10px",
  },
  content: {
    padding: "10px",
  },
});

export const App = () => {
  const [activeTab, setActiveTab] = useState("person");
  const navigate = useNavigate();

  const classes = useStyles();

  React.useEffect(() => {
    navigate(activeTab);
  }, [navigate, activeTab]);

  return (
    <FluentProvider theme={webDarkTheme} className={classes.root}>
      <div className={classes.content}>
        <TabList
          defaultSelectedValue={activeTab}
          onTabSelect={(_, data) => setActiveTab(String(data.value))}
        >
          <Tab content="Person" value={"person"} />
          <Tab content="Job" value="job" />
        </TabList>
        <Routes>
          <Route path="/person" element={<PersonPage />} />
          <Route path="/:schema" element={<JobPage />} />
        </Routes>
      </div>
    </FluentProvider>
  );
};
