import React from "react";
import { NewForm } from "../components/NewForm";
import { CrudTable } from "../components/CrudTable";
import { CrudToolbar } from "../components/CrudToolbar";
import { useItems } from "../hooks/useItems";
import { Entity } from "../models/Entity";
import { Person } from "../models/Person";

export const PersonPage = () => {
  const { items } = useItems<Person>("person");
  const [formOpen, setFormOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Person[]>([]);

  return (
    <>
      <NewForm open={formOpen} onSubmit={() => setFormOpen(false)} />
      <CrudToolbar
        selected={selected}
        onAddNewClick={() => setFormOpen(true)}
        onEditClick={(item) => console.log(item)}
        onSettingsClick={() => console.log("settings")}
      />
      <CrudTable<Person>
        items={items}
        columns={Entity.columns(Person)}
        onSelectionChange={setSelected}
      />
    </>
  );
};
