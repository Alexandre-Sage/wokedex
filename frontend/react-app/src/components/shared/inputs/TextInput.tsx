import { InputProps, Input, Text, Box } from "@chakra-ui/react";

interface TextInputProps extends InputProps {
  label?: string;
}

const TextInput = ({ label, ...props }: TextInputProps) => {
  return (
    <Box>
      {label && <Text>{label}</Text>}
      <Input {...props} />
    </Box>
  );
};

export { type TextInputProps, TextInput };
