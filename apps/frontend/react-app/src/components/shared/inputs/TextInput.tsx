import { InputProps, Input, Text, Box } from "@chakra-ui/react";

interface TextInputProps extends InputProps {
  label?: string;
}

const TextInput = ({ label, ...props }: TextInputProps) => {
  return (
    <Box>
      {label && <Text color={"white"}>{label}</Text>}
      <Input h={"8"} {...props} />
    </Box>
  );
};

export { type TextInputProps, TextInput };
