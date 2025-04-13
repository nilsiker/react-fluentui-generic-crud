import {
  Avatar,
  Input,
  Label,
  Tag,
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerProps,
} from "@fluentui/react-components";
import { Entity } from "../models/Entity";
import { CrudService } from "../services/CrudService";
import React from "react";

interface ICrudFormFieldProps<T> {
  label: string;
  entity?: new () => T;
  inputType:
    | "number"
    | "search"
    | "time"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "date"
    | "password"
    | "datetime-local"
    | "month"
    | "week"
    | undefined;
}

const options = [
  "John Doe",
  "Jane Doe",
  "Max Mustermann",
  "Erika Mustermann",
  "Pierre Dupont",
  "Amelie Dupont",
  "Mario Rossi",
  "Maria Rossi",
];

export const CrudFormField = <T extends Entity>(
  props: ICrudFormFieldProps<T>
) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps["onOptionSelect"] = (_, data) => {
    if (data.value === "no-options") {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };

  const tagPickerOptions = options.filter(
    (option) => !selectedOptions.includes(option)
  );

  if (props.entity) {
    const service = new CrudService(props.entity);
    const items = service.list();
    console.log(items);
  } else {
    console.log("Not an entity");
  }

  return (
    <div>
      <Label>{props.label}</Label>
      {props.entity ? (
        <TagPicker
          onOptionSelect={onOptionSelect}
          selectedOptions={selectedOptions}
        >
          <TagPickerControl>
            <TagPickerGroup aria-label="Selected Employees">
              {selectedOptions.map((option) => (
                <Tag
                  key={option}
                  shape="rounded"
                  media={<Avatar aria-hidden name={option} color="colorful" />}
                  value={option}
                >
                  {option}
                </Tag>
              ))}
            </TagPickerGroup>
            <TagPickerInput aria-label="Select Employees" />
          </TagPickerControl>
          <TagPickerList>
            {tagPickerOptions.length > 0 ? (
              tagPickerOptions.map((option: string) => (
                <TagPickerOption
                  media={
                    <Avatar
                      shape="square"
                      aria-hidden
                      name={option}
                      color="colorful"
                    />
                  }
                  value={option}
                  key={option}
                >
                  {option}
                </TagPickerOption>
              ))
            ) : (
              <TagPickerOption value="no-options">
                No options available
              </TagPickerOption>
            )}
          </TagPickerList>
        </TagPicker>
      ) : (
        <Input type={props.inputType} />
      )}
    </div>
  );
};
