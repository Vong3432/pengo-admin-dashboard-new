import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";

function TablesDetailRow(props) {
  const { id, name, isActive, relatedTable, onDelete } = props;

  const history = useHistory()
  const textColor = useColorModeValue("gray.700", "white");
  const textGreyColor = useColorModeValue("gray.400", "gray.400");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const onEditClicked = () => {
    history.push(`/admin/dpo-tables/${id}`)
  }

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          {/* <Avatar src={logo} w="50px" borderRadius="12px" me="18px" /> */}
          <Flex direction="column">
            {name ? (
              <Text
                fontSize="md"
                color={textColor}
                fontWeight="bold"
                minWidth="100%"
              >
                {name}
              </Text>
            ) : <Input />}
            {/* <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {email}
            </Text> */}
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Text
          fontSize="md"
          color={relatedTable ? textColor : textGreyColor}
          fontWeight="bold"
          cursor="pointer"
        >
          {relatedTable ? relatedTable : '-'}
        </Text>
      </Td>
      <Td>
        <Badge
          bg={isActive ? "green.400" : bgStatus}
          color={isActive ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      </Td>
      <Td>
        <Button p="0px" bg="transparent" variant="no-hover" onClick={onEditClicked}>
          <Text
            fontSize="md"
            color="red.400"
            fontWeight="bold"
            cursor="pointer"
            onClick={onDelete}
          >
            Delete
          </Text>
        </Button>
      </Td>
    </Tr>
  );
}

export default TablesDetailRow;
