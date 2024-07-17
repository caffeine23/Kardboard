import { useContext } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { CiViewBoard } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Links = ["Home"];

const NavLink = ({ children }) => (
  <Link
    to={"/"}
    className="px-2 py-1 rounded-md hover:bg-gray-200"
    style={{
      textDecoration: "none",
      backgroundColor: "gray.200", // Chakra UI color mode variant
    }}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoggedIn = !!user;

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Heading size="lg">ᴋᴀʀᴅʙᴏᴀʀᴅ</Heading>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button onClick={toggleColorMode} className="mr-6">
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Menu>
              {isLoggedIn ? (
                <>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={user.pfp} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </>
              ) : (
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Link to={"/login"}>LOGIN</Link>
                </MenuButton>
              )}
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
