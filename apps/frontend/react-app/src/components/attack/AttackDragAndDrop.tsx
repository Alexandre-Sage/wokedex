import { Tag } from "@chakra-ui/react";
import { useAttacks } from "../../api/attack.api";
import { DragAndDrop } from "../shared/draggable/DragAndDrop";
import { DraggableProps } from "../shared/draggable/Draggable";

const AttackDragAndDrop = ({
  onChange,
}: {
  onChange: <T>(p: DraggableProps<T>["id"]) => void;
}) => {
  const { attacks } = useAttacks();
  return (
    <DragAndDrop
      onChange={onChange}
      maxSelection={2}
      optionsList={attacks.map((item) => ({
        children: <Tag>{item.name}</Tag>,
        data: item,
        id: item.id,
      }))}
    />
  );
};

export { AttackDragAndDrop };
