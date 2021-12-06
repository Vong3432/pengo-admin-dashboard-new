import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useHistory } from "react-router";
import { axiosFetcher } from "utils/apiFetcher";
import { API_BASE_URL } from "consts/api";
import { useToast } from "@chakra-ui/toast";
import React from "react";

function TablesTableRow(props) {
  const { id, name, isActive, onControlActivating } = props;

  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  const history = useHistory()
  const toast = useToast()
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const isDeactivating = isActive === 1

  const viewDetail = () => {
    history.push(`/admin/dpo-tables/${id}`)
  }

  const onConfirm = async () => {
    try {
      onClose()
      await axiosFetcher.put(`${API_BASE_URL}admin/dpo-tables/${id}`, {
        is_active: isActive ? 0 : 1, // opposite
      })
      toast({
        title: `${isDeactivating ? 'Deactivated' : 'Reactivated'} ${name} successfully`,
        isClosable: true,
        status: "success",
      })   
      onControlActivating()
    } catch (error) {
      toast({
        id: "global-swr-err",
        title: `Unable to ${isDeactivating ? 'deactivate' : 'activate'}`,
        description: `err ${error}`,
        status: "error",
        isClosable: true
      })
    }
  }

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          {/* <Avatar src={logo} w="50px" borderRadius="12px" me="18px" /> */}
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
            {/* <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {email}
            </Text> */}
          </Flex>
        </Flex>
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
        <Button colorScheme="" onClick={viewDetail}>
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
            View
          </Text>
        </Button>
        <Button ml="2" colorScheme="" bgColor="transparent" color={`${isActive ? "red.500" : "teal.500"}`} onClick={() => setIsOpen(true)}>
          <Text
            fontSize="md"
            fontWeight="bold"
            cursor="pointer"
          >
            { isActive ? 'Deactivate' : 'Activate'}
          </Text>
        </Button>
      </Td>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {isDeactivating ? 'Deactivate' : 'Reactivate' } { name } 
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme={isDeactivating ? 'red' : 'teal'} onClick={onConfirm} ml={3}>
              {isDeactivating ? 'Deactivate' : 'Reactivate' }
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Tr>
  );
}

export default TablesTableRow;
