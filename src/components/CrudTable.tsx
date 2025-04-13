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

interface ICrudTableProps<T> {
  items: T[];
  columns: (keyof T)[];
  onSelectionChange: React.Dispatch<React.SetStateAction<T[]>>;
}

const useStyle = makeStyles({
  root: {
    minWidth: "150",
  },
});

export const CrudTable = <T extends Entity>(
  props: ICrudTableProps<T>
): React.ReactElement => {

  const classes = useStyle();
  
  const columnsDefinitions = props.columns.map((column) =>
    createTableColumn({
      columnId: String(column),
      renderHeaderCell: () => String(column),
      renderCell: (item: T) => String(item[column]),
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
    props.onSelectionChange(
      [...data.selectedItems].map((id) => props.items[Number(id)])
    );
  };

  return (
    <DataGrid
      className={classes.root}
      columns={columnsDefinitions}
      items={props.items}
      selectionMode="multiselect"
      subtleSelection
      onSelectionChange={onSelectionChange}
      sortable
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: { "aria-label": "Select all rows" },
          }}
        >
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<T>>
        {({ item, rowId }) => (
          <DataGridRow<T>
            key={rowId}
            selectionCell={{
              checkboxIndicator: { "aria-label": "Select row" },
            }}
          >
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
