import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  IconButton,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { useState, useRef, useEffect } from "react";
import TaskItem from "./TaskItem";
import axios from "axios";
import { useDrop } from "react-dnd";

export default function TaskCard({ card, updateTrigger, setUpdateTrigger }) {
  const [cardTitle, setCardTitle] = useState(card.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const titleInputRef = useRef(null);

  const [tasks, setTasks] = useState([]);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => moveTask(item.taskId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get(`/tasks/getTasks/${card._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const storedTasks = resp.data || [];
      setTasks(storedTasks);
    }
    fetchData();
  }, [updateTrigger]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  async function createTask() {
    await axios.post(
      "/tasks/createTask",
      {
        cardId: card._id,
        title: "New Task",
        desc: "No description provided.",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setUpdateTrigger(!updateTrigger);
  }

  function changeTitle() {
    const finalCardTitle = cardTitle === "" ? "Untitled Card" : cardTitle;
    setIsEditingTitle(false);
    axios.patch(
      `/cards/updateCard/${card._id}`,
      {
        title: finalCardTitle,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  function deleteCard() {
    axios.delete(`/cards/deleteCard/${card._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUpdateTrigger(!updateTrigger);
  }

  function moveTask(taskId) {
    axios
      .patch(
        `/tasks/moveTask/${taskId}`,
        { cardId: card._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setUpdateTrigger((prevState) => !prevState);
      });
  }

  return (
    <>
      <Card className="mb-6 mx-4 w-80" ref={drop}>
        <CardHeader>
          <Flex justify="space-between" align="center">
            <Flex flex="1" justify="center">
              {isEditingTitle ? (
                <InputGroup>
                  <Input
                    ref={titleInputRef}
                    value={cardTitle}
                    size="md"
                    onChange={(evt) => {
                      setCardTitle(evt.target.value);
                    }}
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter") {
                        changeTitle();
                      }
                    }}
                    onBlur={changeTitle}
                  />
                  <InputRightElement>
                    <CheckIcon onClick={changeTitle} />
                  </InputRightElement>
                </InputGroup>
              ) : (
                <Text
                  className="break-all"
                  size="md"
                  onClick={() => {
                    setIsEditingTitle(true);
                  }}
                  textAlign="center"
                >
                  {cardTitle === "" ? "Untitled Card" : cardTitle}
                </Text>
              )}
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="Delete"
              icon={<MdDeleteForever />}
              onClick={deleteCard}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Accordion allowToggle>
            {tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                updateTrigger={updateTrigger}
                setUpdateTrigger={setUpdateTrigger}
              />
            ))}
          </Accordion>
        </CardBody>
        <CardFooter>
          <Flex justifyContent="center" w="100%">
            <Button
              colorScheme="gray"
              size="sm"
              variant="ghost"
              leftIcon={<AddIcon />}
              onClick={createTask}
            >
              Add Task
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
}
