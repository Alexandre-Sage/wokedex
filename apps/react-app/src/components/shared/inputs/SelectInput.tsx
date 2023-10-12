import { Box, Select, SelectProps, Text } from "@chakra-ui/react";
import { map } from "ramda";

interface SelectInputProps extends SelectProps {
  options: { value: string | number; placeHolder: string }[];
  label: string;
}

const SelectInput = ({ options, label, ...props }: SelectInputProps) => {
  const optionsTsx = map(
    ({ placeHolder, value }) => <option value={value}>{placeHolder}</option>,
    options
  );
  return (
    <Box>
      <Text>{label}</Text>
      <Select {...props}>{optionsTsx}</Select>
    </Box>
  );
};

export { SelectInput, type SelectInputProps };
