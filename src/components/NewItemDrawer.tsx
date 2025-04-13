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
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from "@fluentui/react-components";
import { Entity } from "../models/Entity";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { capitalizeFirstLetter } from "../strings/stringUtilities";

interface INewFormProps<T extends Entity> {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  entity: new () => T;
  onSubmit: () => void;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    maxWidth: "400px",
  },
});

export const NewItemDrawer = <T extends Entity>(props: INewFormProps<T>) => {
  const properties = Entity.COLUMN_NAMES(props.entity).filter(
    (col) => col !== "id"
  );

  const styles = useStyles();

  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <OverlayDrawer
      {...restoreFocusSourceAttributes}
      open={props.isOpen}
      position="end"
      onOpenChange={(_, { open }) => props.setIsOpen(open)}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              {...restoreFocusTargetAttributes}
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
          <div key={String(property)} className={styles.root}>
            <Label>{capitalizeFirstLetter(String(property))}: </Label>
            <Input />
          </div>
        ))}
      </DrawerBody>
      <DrawerFooter>
        <Button
          {...restoreFocusTargetAttributes}
          appearance="primary"
          onClick={props.onSubmit}
        >
          Submit
        </Button>
      </DrawerFooter>
    </OverlayDrawer>
  );
};
