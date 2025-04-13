import React from "react";
import { NewItemDrawer } from "../components/NewItemDrawer";
import { CrudTable } from "../components/CrudTable";
import { CrudToolbar } from "../components/CrudToolbar";
import { useItems } from "../hooks/useItems";
import { Entity } from "../models/Entity";
import { Person } from "../models/Person";

export const PersonPage = () => {
  const { items } = useItems(Person);
  const [newDrawerOpen, setNewDrawerOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Person[]>([]);

  return (
    <>
      <NewItemDrawer
        open={newDrawerOpen}
        itemType={Person}
        onSubmit={() => setNewDrawerOpen(false)}
      />
      <CrudToolbar
        selected={selected}
        onAddNewClick={() => setNewDrawerOpen(true)}
        onEditClick={(item) => console.log(item)}
        onSettingsClick={() => console.log("settings")}
      />
      <CrudTable
        items={items}
        columns={Entity.COLUMN_NAMES(Person)}
        onSelectionChange={setSelected}
      />
    </>
  );
};
