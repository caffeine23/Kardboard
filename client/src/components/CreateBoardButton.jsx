import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function CreateBoardButton({ onOpen }) {
  return (
    <Button
      colorScheme="teal"
      size="md"
      variant="outline"
      leftIcon={<AddIcon />}
      onClick={onOpen}
    >
      Create Board
    </Button>
  );
}
