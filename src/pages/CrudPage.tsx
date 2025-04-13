import React from "react";
import { useItems } from "../hooks/useItems";
import { Entity } from "../models/Entity";
import { NewItemDrawer } from "../components/NewItemDrawer";
import { CrudToolbar } from "../components/CrudToolbar";
import { CrudTable } from "../components/CrudTable";
import { makeStyles } from "@fluentui/react-components";
import { useTabContext } from "../providers/TabProvider";

interface ICrudPageProps<T> {
  entity: new () => T;
}

const useStyle = makeStyles({
  root: {
    height: "100%",
  },
});

export const CrudPage = <T extends Entity>({ entity }: ICrudPageProps<T>) => {
  const { items } = useItems(entity);
  const [isNewFormOpen, setIsNewFormOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<T[]>([]);

  const { activeTab } = useTabContext();

  React.useEffect(() => {
    setSelected([]);
  }, [activeTab]);

  const classes = useStyle();

  return (
    <div className={classes.root}>
      <NewItemDrawer
        entity={entity}
        open={isNewFormOpen}
        onSubmit={() => setIsNewFormOpen(false)}
      />
      <CrudToolbar
        selected={selected}
        onAddNewClick={() => setIsNewFormOpen(true)}
        onEditClick={(item) => console.log(item)}
        onSettingsClick={() => console.log("settings")}
      />
      <CrudTable
        items={items}
        columns={Entity.COLUMN_NAMES(entity)}
        onSelectionChange={setSelected}
      />
    </div>
  );
};
