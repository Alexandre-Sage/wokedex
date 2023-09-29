import { Box, Textarea, Text, TextareaProps } from "@chakra-ui/react";

interface TextAreaInputProps extends TextareaProps {
  label?: string;
}

const TextAreaInput = ({ label, ...props }: TextAreaInputProps) => {
  return (
    <Box>
      {label && <Text>{label}</Text>}
      <Textarea {...props} />
    </Box>
  );
};

export { TextAreaInput, type TextAreaInputProps };
