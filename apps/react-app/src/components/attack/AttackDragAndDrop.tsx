import { Tag, Tooltip, Stack, Text } from "@chakra-ui/react";
import { useAttacks } from "../../api/attack.api";
import { DragAndDrop } from "../shared/draggable/DragAndDrop";
import { DraggableProps } from "../shared/draggable/Draggable";
import { indexBy, prop } from "ramda";
import { useTypes } from "../../api/type.api";

const AttackDragAndDrop = ({
  onChange,
}: {
  onChange: <T>(p: DraggableProps<T>["id"]) => void;
}) => {
  const { attacks } = useAttacks();
  const { types } = useTypes();
  const indexedAttacksById = indexBy(prop("id"), attacks);
  const indexedTypesById = indexBy(prop("id"), types);
  return (
    <DragAndDrop
      onChange={onChange}
      maxSelection={2}
      optionsList={attacks.map((item) => ({
        children: (
          <Tooltip
            label={
              <Stack>
                <Text>Power: {indexedAttacksById[item.id].strength}</Text>
                <Text>Desc: {indexedAttacksById[item.id].description}</Text>
                <Text>Type: {indexedTypesById[item.typeId].nameFr}</Text>
                {indexedAttacksById[item.id].specialEffect && (
                  <Text>Spec: {indexedAttacksById[item.id].specialEffect}</Text>
                )}
              </Stack>
            }
          >
            <Tag>{item.name}</Tag>
          </Tooltip>
        ),
        data: item,
        id: item.id,
      }))}
    />
  );
};

export { AttackDragAndDrop };
