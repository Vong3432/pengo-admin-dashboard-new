import {
    Avatar,
    Badge,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import { SystemFunction } from "models/SystemFunction";

function SystemFunctionRows(props: SystemFunction & { onEdit: () => void, onDel: () => void }) {
    const { id, name, isActive, isPremium, price, description, onEdit, onDel } = props;

    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");

    const onEditClicked = () => {
        onEdit();
    }

    const onDelClicked = () => {
        onDel();
    }

    return (
        <Tr>
            <Td minWidth={{ sm: "150px" }} pl="0px">
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    {/* <Avatar src={logo} w="50px" borderRadius="12px" me="18px" /> */}
                    <Flex direction="column">
                        <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                            minWidth="100%"
                        >
                            {name} <br />
                        </Text>
                    </Flex>
                </Flex>
            </Td>
            <Td p="0">
                <Flex maxW="300px" flexWrap="wrap">
                    <Text fontSize="sm">{description}</Text>
                </Flex>
            </Td>
            <Td p="0">
                <Text>{isPremium ? 'yes' : 'no'}</Text>
            </Td>
            <Td p="0">
                <Text>{price}</Text>
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
                        color="gray.400"
                        fontWeight="bold"
                        cursor="pointer"
                    >
                        Edit
                    </Text>
                </Button>
                <br />
                <Button p="0px" bg="transparent" variant="no-hover" onClick={onDelClicked}>
                    <Text
                        fontSize="md"
                        color="red.400"
                        fontWeight="bold"
                        cursor="pointer"
                    >
                        Delete
                    </Text>
                </Button>
            </Td>
        </Tr>
    );
}

export default SystemFunctionRows;
