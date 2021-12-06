import { ChangeEvent, useRef, useState } from "react";
// Chakra imports
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Select,
    Text,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { axiosFetcher } from "utils/apiFetcher";
import { User } from "models/User";
import UsersTable from "components/Users/UserTable";
import React from "react";
import { deserialize } from "ts-jackson";

function UsersPage() {
    const toast = useToast()
    const textColor = useColorModeValue("gray.700", "white");

    const [data, setData] = useState<User[]>([])
    const [userType, setUserType] = useState<string | undefined>()
    const [loading, setLoading] = useState<boolean>(false)
    const [pageCount, setPageCount] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(0)
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef(null)
    const [currentUserRowIdx, setCurrentUserRowIdx] = useState<number | null>(null)
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    const fetchData = React.useCallback(async (pageIndex, pageSize, opt?: { type: string; }) => {
        // This will get called when the table needs new data
        // You could fetch your data from literally anywhere,
        // even a server. But for this example, we'll just fake it.

        // Set the loading state
        setLoading(true)
        setUserType(opt?.type)

        await axiosFetcher.get(`admin/users?is_banned=${opt?.type}&page=${pageIndex + 1}`)
            .then(res => res.data)
            .then(returnedData => {
                const serializeUsers: User[] = returnedData.data.data.length === 0 ? [] : returnedData.data.data.map((json: any) => deserialize(json, User))
                setData((prev) => serializeUsers)
                setPageCount(Math.ceil(returnedData.data.meta.last_page))
                setPageSize(prev => returnedData.data.meta.total)

                setLoading(false)
            })
    }, [])

    const updateData = (rowIndex: number, value: User) => {
        setData(old =>
            old.filter((row, index) => {
                return index !== rowIndex
            })
        )

        fetchData(0, 0, { type: userType ?? "" })
    }

    const onTerminateTap = (rowIndex: number, user: User) => {
        setCurrentUser(prev => user);
        setCurrentUserRowIdx(prev => rowIndex);
        setIsOpen(prev => true)
    }

    const onTerminateConfirmed = async (rowIndex: number | null, user: User | null) => {
        if (rowIndex === null || user === null) return;

        try {
            const response = await axiosFetcher.put(`admin/users/${user.id}`, {
                terminate: !user.isBanned
            })
            const data = await response.data['data']
            const serializedUser = deserialize(JSON.stringify(data), User)

            updateData(rowIndex, serializedUser)

            onClose()
        } catch (error) {
            toast({
                title: "Unable to perform this action",
                description: `err ${error}`,
                isClosable: true,
                status: "error",
            })
        }
    }

    const onUserTypeChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        fetchData(0, 0, { type: e.target.value });
    }


    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "scroll" }}>
                <CardHeader p="6px 0px 22px 0px">
                    <Text fontSize="xl" color={textColor} fontWeight="bold">
                        Users Tables
                    </Text>
                    <FormControl maxW="fit-content" ml="auto">
                        <FormLabel>
                            User type
                        </FormLabel>
                        <Select onChange={e => onUserTypeChanged(e)}>
                            <option value="0">Active</option>
                            <option value="1">Banned</option>
                            <option value="">All</option>
                        </Select>
                    </FormControl>
                </CardHeader>
                <CardBody>
                    <UsersTable
                        onTerminateTap={onTerminateTap}
                        updateData={updateData}
                        pageSize={pageSize}
                        data={data}
                        fetchData={fetchData}
                        loading={loading}
                        pageCount={pageCount}
                    />
                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Update status?
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Are you sure?
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={() => cancelRef} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='red' onClick={() => onTerminateConfirmed(currentUserRowIdx, currentUser)} ml={3}>
                                        Update
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </CardBody>
            </Card>
        </Flex>
    );
}

export default UsersPage;




