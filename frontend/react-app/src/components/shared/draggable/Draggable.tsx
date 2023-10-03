import { Box } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";

export interface DraggableProps<T> {
  id: string;
  data: T;
  children: ReactNode;
}

const Draggable = <T,>({ data, id, children }: DraggableProps<T>) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    attributes: {},
    data: {
      id,
      ...data,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Box ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </Box>
  );
};

export { Draggable };
