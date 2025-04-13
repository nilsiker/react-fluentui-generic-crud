import {
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  makeStyles,
  TableRowId,
} from "@fluentui/react-components";
import { Entity } from "../models/Entity";
import React from "react";
import { capitalizeFirstLetter } from "../strings/stringUtilities";
import { useTabContext } from "../hooks/useTabContext";

interface ICrudTableProps<T> {
  items: T[];
  columns: (keyof T)[];
  onSelectionChange: React.Dispatch<React.SetStateAction<T[]>>;
}

const useStyle = makeStyles({
  root: {
    minWidth: "150px",
    maxWidth: "550px",
  },
  header: { borderStartEndRadius: "4px", borderStartStartRadius: "4px" },
  body: {
    ":last-child": {
      borderEndStartRadius: "4px",
      borderEndEndRadius: "4px",
    },
  },
  cell: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "20px",
  },
});

export const CrudTable = <T extends Entity>(
  props: ICrudTableProps<T>
): React.ReactElement => {
  const { activeTab, setActiveTab } = useTabContext();
  
  const classes = useStyle();
  const [selected, setSelected] = React.useState<Set<TableRowId>>(new Set());

  const columnsDefinitions = props.columns.map((column) =>
    createTableColumn({
      columnId: String(column),
      renderHeaderCell: () => capitalizeFirstLetter(String(column)),
      renderCell: (item: T) => {
        return item[column] instanceof Entity ? (
          <a onClick={() => setActiveTab((item[column] as Entity).key)}>
            {String(item[column].id)}
          </a>
        ) : (
          String(item[column] ?? "-")
        );
      },
      compare: (a, b) =>
        a[column] === b[column] ? 0 : a[column] > b[column] ? 1 : 0,
    })
  );

  const onSelectionChange = (
    _: React.ChangeEvent<unknown>,
    data: {
      selectedItems: Set<TableRowId>;
    }
  ) => {
    setSelected(data.selectedItems);
    props.onSelectionChange(
      [...data.selectedItems].map((id) => props.items[Number(id)])
    );
  };

  React.useEffect(() => {
    setSelected(new Set());
  }, [activeTab]);

  return (
    <DataGrid
      className={classes.root}
      columns={columnsDefinitions}
      items={props.items}
      selectionMode="multiselect"
      subtleSelection
      resizableColumns
      selectedItems={selected}
      onSelectionChange={onSelectionChange}
      sortable
    >
      <DataGridHeader>
        <DataGridRow
          className={classes.header}
          appearance="neutral"
          selectionCell={{
            checkboxIndicator: { "aria-label": "Select all rows" },
          }}
        >
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell className={classes.cell}>
              {renderHeaderCell()}
            </DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<T>>
        {({ item, rowId }) => (
          <DataGridRow<T>
            className={classes.body}
            key={rowId}
            selectionCell={{
              checkboxIndicator: { "aria-label": "Select row" },
            }}
          >
            {({ renderCell }) => (
              <DataGridCell className={classes.cell}>
                {renderCell(item)}
              </DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
