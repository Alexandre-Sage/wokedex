import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";

import { Draggable, DraggableProps } from "./Draggable";
import { DropZone } from "./Droppable";
import { VStack } from "@chakra-ui/react";

export function DragAndDrop<T>({
  optionsList,
  onChange,
  maxSelection,
}: {
  optionsList: DraggableProps<T>[];
  maxSelection?: number;
  onChange: <T>(p: DraggableProps<T>["id"]) => void;
}) {
  const [options, setOptions] = useState<typeof optionsList>([]);
  const [selected, setSelected] = useState<typeof optionsList>([]);
  useEffect(() => {
    setOptions(
      optionsList.filter(({ id }) =>
        !selected.find((selected) => selected.id === id)
      )
    );
  }, [optionsList, selected]);
  return (
    <VStack>
      <DndContext
        onDragEnd={(param) => {
          console.log(param.over);
          if (param.over?.id === "selected") {
            onChange(param.active.id as string);
            setSelected((selected) => [
              ...selected,
              ...options.filter((opt) => opt.id === param.active.id),
            ]);
            setOptions(options.filter((opt) => opt.id !== param.active.id));
          } else if (param.over?.id === "options") {
            setOptions((opt) => [
              ...opt,
              ...selected.filter((opt) => opt.id === param.active.id),
            ]);
            setSelected(selected.filter((opt) => opt.id !== param.active.id));
          }
        }}
      >
        <DropZone
          id="selected"
          w={"md"}
          h={"100"}
          border={"1px"}
          borderColor={"white"}
          borderRadius={5}
          paddingLeft={2}
        >
          {selected.map((select) => (
            <Draggable id={select.id} data={select.data}>
              {select.children}
            </Draggable>
          ))}
        </DropZone>
        <DropZone
          wrap={"wrap"}
          w={"md"}
          h={"auto"}
          border={"1px"}
          borderColor={"white"}
          borderRadius={5}
          id="options"
          padding={2}
          alignItems={"center"}
        >
          {options.map((opt) => (
            <Draggable id={opt.id} data={opt.data}>
              {opt.children}
            </Draggable>
          ))}
        </DropZone>
      </DndContext>
    </VStack>
  );
}
