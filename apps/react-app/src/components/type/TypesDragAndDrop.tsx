import { Tag } from "@chakra-ui/react";
import { useTypes } from "../../api/type.api";
import { DragAndDrop } from "../shared/draggable/DragAndDrop";
import { DraggableProps } from "../shared/draggable/Draggable";

const TypeDragAndDrop = ({
  onChange,
}: {
  onChange: <T>(p: DraggableProps<T>["id"]) => void;
}) => {
  const { types } = useTypes();
  return (
    <DragAndDrop
      onChange={onChange}
      maxSelection={2}
      optionsList={types.map((item) => ({
        children: <Tag>{item.nameFr}</Tag>,
        data: item,
        id: item.id,
      }))}
    />
  );
};

export { TypeDragAndDrop };
