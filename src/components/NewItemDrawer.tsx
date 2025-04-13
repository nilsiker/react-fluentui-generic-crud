import {
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Input,
  Label,
  makeStyles,
  OverlayDrawer,
} from "@fluentui/react-components";
import { Entity } from "../models/Entity";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { capitalizeFirstLetter } from "../strings/stringUtilities";

interface INewFormProps<T extends Entity> {
  open: boolean;
  entity: new () => T;
  onSubmit: () => void;
}

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: "flex",
    flexDirection: "column",
    // Use 2px gap below the label (per the design system)
    gap: "2px",
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: "400px",
  },
});

export const NewItemDrawer = <T extends Entity>(props: INewFormProps<T>) => {
  const properties = Entity.COLUMN_NAMES(props.entity).filter(
    (col) => col !== "id"
  );
  console.log(properties);

  const styles = useStyles();

  return (
    <OverlayDrawer open={props.open} position="end">
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={props.onSubmit}
            />
          }
        >
          Add New
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody>
        {properties.map((property) => (
          <div className={styles.root}>
            <Label>{capitalizeFirstLetter(String(property))}: </Label>
            <Input />
          </div>
        ))}
      </DrawerBody>
      <DrawerFooter>
        <Button appearance="primary" onClick={props.onSubmit}>
          Submit
        </Button>
      </DrawerFooter>
    </OverlayDrawer>
  );
};
