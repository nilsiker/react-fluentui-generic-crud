import {
  makeStyles,
  Toolbar,
  ToolbarButton,
  Tooltip,
} from "@fluentui/react-components";
import { Edit20Regular, Settings20Color } from "@fluentui/react-icons";
import { Add20Regular } from "@fluentui/react-icons/fonts";
import { Entity } from "../models/Entity";

interface ICrudToolbarProps<T> {
  selected: T[];
  onAddNewClick: () => void;
  onEditClick: (item: T) => void;
  onSettingsClick: () => void;
}

const useStyle = makeStyles({
  root: {
    minWidth: "550px",
    justifyContent: "space-between",
  },
});

export const CrudToolbar = <T extends Entity>(
  props: ICrudToolbarProps<T>
): React.ReactElement => {
  const classes = useStyle();

  return (
    <Toolbar className={classes.root}>
      <div>
        <ToolbarButton icon={<Add20Regular />} onClick={props.onAddNewClick}>
          Add New
        </ToolbarButton>
        <Tooltip
          relationship="description"
          positioning="above-start"
          content={
            props.selected.length === 0
              ? "Select an item to edit."
              : props.selected.length === 1
              ? "Edit the selected item."
              : "Editing multiple items is not supported."
          }
        >
          <ToolbarButton
            disabled={props.selected.length !== 1}
            icon={<Edit20Regular />}
            onClick={() => props.onEditClick(props.selected[0])}
          >
            Edit
          </ToolbarButton>
        </Tooltip>
      </div>

      <ToolbarButton
        icon={<Settings20Color />}
        onClick={props.onSettingsClick}
      />
    </Toolbar>
  );
};
