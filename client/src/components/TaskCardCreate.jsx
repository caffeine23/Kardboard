import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function TaskCardCreate({ createCard }) {
  return (
    <Button
      colorScheme="teal"
      size="md"
      variant="outline"
      leftIcon={<AddIcon />}
      onClick={createCard}
    >
      Create Card
    </Button>
  );
}
