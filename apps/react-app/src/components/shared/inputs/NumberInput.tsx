import {
  NumberInput as ChakraNumberInput,
  NumberInputProps as ChakraNumberInputProps,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Box,
} from "@chakra-ui/react";

interface NumberInputProps extends ChakraNumberInputProps {
  label: string;
}

export const NumberInput = ({ label, ...props }: NumberInputProps) => {
  return (
    <Box>
      <Text textColor={"white"}>{label}</Text>
      <ChakraNumberInput h="8" w={"20"} textColor={"white"} {...props}>
        <NumberInputField h="8" />
        <NumberInputStepper>
          <NumberIncrementStepper textColor={"white"} />
          <NumberDecrementStepper textColor={"white"} />
        </NumberInputStepper>
      </ChakraNumberInput>
    </Box>
  );
};
