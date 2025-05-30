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

import { CrudPage } from "./pages/CrudPage";
import { Person } from "./models/Person";
import { Job } from "./models/Job";
import { Task } from "./models/Task";
import { useTabContext } from "./hooks/useTabContext";

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
  }, [navigate, activeTab]);

  return (
    <FluentProvider theme={webDarkTheme} className={classes.root}>
      <div className={classes.content}>
        <TabList
          selectedValue={activeTab}
          onTabSelect={(_, data) => setActiveTab(String(data.value))}
        >
          <Tab content="Person" id="person" value={"person"} />
          <Tab content="Job" id="job" value="job" />
          <Tab content="Task" id="task" value="task" />
        </TabList>
        <Routes>
          <Route path="/person" element={<CrudPage entity={Person} />} />
          <Route path="/job" element={<CrudPage entity={Job} />} />
          <Route path="/task" element={<CrudPage entity={Task} />} />
        </Routes>
      </div>
    </FluentProvider>
  );
};
