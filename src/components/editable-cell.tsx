import { InputNumber } from "antd";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { isPositiveValue } from "../utils";
import { setFactValue } from "../features/usersExp/model";
import { Point } from "./types";

interface EditableCellProps {
  value: Point;
  setEditIndex: (i: number | null) => void;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  setEditIndex,
}) => {
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [editedValue, setEditedValue] = useState<number>(value.fact);

  const save = (event: any) => {
    if (isPositiveValue(editedValue)) {
      setFactValue({ name: value.name, newValue: editedValue });
      setEditIndex(null);
    } else event.preventDefault();
  };

  useEffect(() => {
    if (inputRef) inputRef.current!.focus();
  }, []);

  return (
    <InputNumber
      ref={inputRef}
      value={editedValue}
      onBlur={save}
      step={0.1}
      onPressEnter={save}
      onChange={setEditedValue}
    />
  );
};
