import { Button, Input, Box } from "@chakra-ui/react";
import { useState } from "react";

export const ImageInput = ({
  onFormChange,
}: {
  onFormChange: (imageToAdd: File) => void;
}) => {
  const [selectedPreview, setSelectedPreview] = useState<any>("");
  return (
    <Box
      h={{ xl: "2xs", md: "3xs", sm: "5xs" }}
      w={{ xl: "2xs", md: "3xs", sm: "5xs" }}
    >
      <Button bgRepeat={"no-repeat"} zIndex={1} w="fit-content" h="fit-content">
        <Input
          bgImage={selectedPreview}
          h={{ xl: "2xs", md: "3xs", sm: "20" }}
          onChange={(item) => {
            onFormChange(item.target.files![0]);
            setSelectedPreview(URL.createObjectURL(item.target.files![0]));
          }}
          bgSize={"cover"}
          type="file"
          bgColor={"white"}
          textColor={"white"}
          placeholder="Hello"
        />
      </Button>
    </Box>
  );
};
