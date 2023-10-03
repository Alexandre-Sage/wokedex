import { Box, Textarea, Text, TextareaProps } from "@chakra-ui/react";

interface TextAreaInputProps extends TextareaProps {
  label?: string;
}

const TextAreaInput = ({ label, ...props }: TextAreaInputProps) => {
  return (
    <Box>
      {label && <Text color={"white"}>{label}</Text>}
      <Textarea textColor={"white"} {...props} />
    </Box>
  );
};

export { TextAreaInput, type TextAreaInputProps };
