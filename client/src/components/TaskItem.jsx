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
import { CheckIcon } from "@chakra-ui/icons";
import { TiDeleteOutline } from "react-icons/ti";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDrag } from "react-dnd";

export default function TaskItem({ task, updateTrigger, setUpdateTrigger }) {
  const [taskName, setTaskName] = useState(task.title);
  const [isEditingName, setIsEditingName] = useState(false);
  const [taskDesc, setTaskDesc] = useState(task.description);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  const nameInputRef = useRef(null);
  const descInputRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { taskId: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

  useEffect(() => {
    if (isEditingDesc && descInputRef.current) {
      descInputRef.current.focus();
    }
  }, [isEditingDesc]);

  function changeName() {
    const finalTaskName = taskName === "" ? "Untitled Task" : taskName;
    setIsEditingName(false);
    axios.patch(
      `/tasks/updateTask/${task._id}`,
      { title: finalTaskName },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  function changeDesc() {
    const finalTaskDesc =
      taskDesc === "" ? "No description provided." : taskDesc;
    setIsEditingDesc(false);
    axios.patch(
      `/tasks/updateTask/${task._id}`,
      { desc: finalTaskDesc },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  function deleteTask() {
    axios.delete(`/tasks/deleteTask/${task._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUpdateTrigger(!updateTrigger);
  }

  return (
    <>
      <AccordionItem ref={drag} opacity={isDragging ? 0.5 : 1}>
        {isEditingName ? (
          <InputGroup>
            <Input
              ref={nameInputRef}
              value={taskName}
              size="md"
              onChange={(evt) => {
                setTaskName(evt.target.value);
              }}
              onKeyDown={(evt) => {
                if (evt.key === "Enter") {
                  changeName();
                }
              }}
              onBlur={changeName}
            />
            <InputRightElement>
              <CheckIcon onClick={changeName} />
            </InputRightElement>
          </InputGroup>
        ) : (
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Text
                  className="break-all"
                  onClick={() => {
                    setIsEditingName(true);
                  }}
                >
                  {taskName === "" ? "Untitled Task" : taskName}
                </Text>
              </Box>
              <TiDeleteOutline onClick={deleteTask} />
              <AccordionIcon />
            </AccordionButton>
          </h2>
        )}
        {isEditingDesc ? (
          <InputGroup>
            <Input
              ref={descInputRef}
              value={taskDesc}
              size="md"
              onChange={(evt) => {
                setTaskDesc(evt.target.value);
              }}
              onKeyDown={(evt) => {
                if (evt.key === "Enter") {
                  changeDesc();
                }
              }}
              onBlur={changeDesc}
            />
            <InputRightElement>
              <CheckIcon onClick={changeDesc} />
            </InputRightElement>
          </InputGroup>
        ) : (
          <AccordionPanel pb={4}>
            <Text
              onClick={() => {
                setIsEditingDesc(true);
              }}
            >
              {taskDesc === "" ? "No description provided." : taskDesc}
            </Text>
          </AccordionPanel>
        )}
      </AccordionItem>
    </>
  );
}
