import {
  HStack,
  StyleProps,
  VStack,
  ContainerProps,
  ComponentWithAs,
  StackProps,
} from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export interface DropZoneProps extends StackProps {
  id: string;
  children: ReactNode;
}

export const DropZone = ({ id, children, ...props }: DropZoneProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      accepts: ["type1"],
    },
  });

  return <HStack wrap={"wrap"} ref={setNodeRef} {...props}>{children}</HStack>;
};
