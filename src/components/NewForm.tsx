import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Input,
} from "@fluentui/react-components";

interface INewFormProps {
  open: boolean;
  onSubmit: () => void;
}

export const NewForm = (props: INewFormProps) => {
  console.log(props.open);
  
  return (
    <Drawer open={props.open}>
      <DrawerHeader>Schema Form Header</DrawerHeader>
      <DrawerBody>
        <Input type="date" />
        <Input appearance="underline" />
        <Input appearance="underline" />
        <Input appearance="underline" />
        <Input appearance="underline" />
        <Input appearance="underline" />
      </DrawerBody>
      <DrawerFooter>
        <Button appearance="primary" onClick={props.onSubmit}>
          Submit
        </Button>
      </DrawerFooter>
    </Drawer>
  );
};
