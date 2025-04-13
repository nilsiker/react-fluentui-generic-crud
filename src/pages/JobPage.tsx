import { makeStyles } from "@fluentui/react-components";
import { CrudTable } from "../components/CrudTable";
import { useItems } from "../hooks/useItems";
import { Entity } from "../models/Entity";
import { Job } from "../models/Job";
import { CrudToolbar } from "../components/CrudToolbar";
import { NewForm } from "../components/NewForm";
import React from "react";

const useStyle = makeStyles({
  root: {
    height: "100%",
  },
});

export const JobPage = (): React.ReactElement => {
  const { items } = useItems<Job>("job");
  const [isNewFormOpen, setIsNewFormOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Job[]>([]);

  const classes = useStyle();

  return (
    <div className={classes.root}>
      <NewForm open={isNewFormOpen} onSubmit={() => setIsNewFormOpen(false)} />
      <CrudToolbar
        selected={selected}
        onAddNewClick={() => setIsNewFormOpen(true)}
        onEditClick={(item) => console.log(item)}
        onSettingsClick={() => console.log("settings")}
      />
      <CrudTable<Job>
        items={items}
        columns={Entity.columns(Job)}
        onSelectionChange={setSelected}
      />
    </div>
  );
};
