import React from "react";
import { useItems } from "../hooks/useItems";
import { Entity } from "../models/Entity";
import { NewItemDrawer } from "../components/NewItemDrawer";
import { CrudToolbar } from "../components/CrudToolbar";
import { CrudTable } from "../components/CrudTable";
import { makeStyles } from "@fluentui/react-components";
import { useTabContext } from "../hooks/useTabContext";

interface ICrudPageProps<T> {
  entity: new () => T;
}

const useStyle = makeStyles({
  root: {
    height: "100%",
  },
});

export const CrudPage = <T extends Entity>({ entity }: ICrudPageProps<T>) => {
  const { activeTab } = useTabContext();

  const { items } = useItems(entity);
  const [isNewFormOpen, setIsNewFormOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<T[]>([]);

  React.useEffect(() => {}, [selected]);

  React.useEffect(() => {
    setSelected([]);
  }, [activeTab]);

  const classes = useStyle();

  return (
    <div className={classes.root}>
      <NewItemDrawer
        entity={entity}
        isOpen={isNewFormOpen}
        setIsOpen={setIsNewFormOpen}
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
