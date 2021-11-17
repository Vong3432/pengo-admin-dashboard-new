import {
    Flex,
    Text,
    Table,
    Thead,
    Tr,
    Th,
    useColorModeValue,
    Tbody,
    Skeleton,
    Td,
    Spacer,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    ModalHeader,
    ModalFooter,
    useToast,
    FormControl,
    Select
} from '@chakra-ui/react'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { API_BASE_URL } from 'consts/api';
import { axiosFetcher } from 'utils/apiFetcher';
import { useParams } from 'react-router-dom';
import TablesDetailRow from 'components/Priority/TablesDetailRow';
import { AddIcon } from '@chakra-ui/icons';

const fetcher = (url, id) => axiosFetcher.get(`${url}/${id}`).then(res => res.data['data'])

const DPOTableDetail = () => {
    const { id } = useParams()
    const toast = useToast();
    const toastId = "global-swr-err" // prevent duplication.
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    const textColor = useColorModeValue("gray.700", "white");
    const { data, error, mutate } = useSWR([`${API_BASE_URL}admin/dpo-tables`, id], fetcher)
    const [rows, setRows] = useState([])
    const [colsFromDB, setColsFromDB] = useState([])
    const [selectedCol, setSelectedCol] = useState([])

    useEffect(() => {
        if (data && data['dpo_cols']) {
            setRows(() => [...data['dpo_cols']])
        } else {
            setRows(() => [])
        }
    }, [data])

    useEffect(() => {
        if (isOpen === false) return;
        // fetch all cols
        fetchDBCols();
    }, [isOpen])

    const fetchDBCols = async () => {
        const response = await axiosFetcher.get(`${API_BASE_URL}admin/db/columns/${data['table_name']}`)
        const responseData = await response.data
        const toIterable = Object.keys(responseData['data']).map((key) => key);
        setColsFromDB([...toIterable])
    }

    const onColsChange = e => {
        setSelectedCol(e.target.value)
    }

    const addNewRow = async () => {
        // add the row
        const response = await axiosFetcher.post(`${API_BASE_URL}admin/dpo-cols`, {
            dpo_table_id: id,
            column: selectedCol
        })
        if (response.status === 200) {
            if (!toast.isActive(toastId)) {
                toast({
                    id: toastId,
                    title: "Add successfully",
                    description: response.msg,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            }
            setRows((prev) => [...prev, {
                column: selectedCol,
                related_table: '',
                is_active: true
            }])
        }
    }

    const onDelete = async (row) => {
        try {
            console.log("Row",row, id)
            await axiosFetcher.del(`${API_BASE_URL}admin/dpo-cols/${row.id}`)
            mutate([`${API_BASE_URL}admin/dpo-tables`, id])
        } catch (error) {
            console.log(error)
        }
    }


    if (error) return <div>Error</div>

    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <CardHeader p="6px 0px 22px 0px">
                    {!data?.['dpo_cols'] && !error ? (
                        <Skeleton minWidth="250px" height="20px" />
                    ) : (
                        <Flex w="100%">
                            <Text fontSize="xl" color={textColor} fontWeight="bold" casing="capitalize">
                                {data['table_name']}'s columns
                            </Text>
                            <Spacer />
                            <Button leftIcon={<AddIcon />}
                                _hover="teal.300"
                                color="white"
                                bg="teal.300"
                                variant="solid"
                                onClick={onOpen}>
                                New column
                            </Button>
                        </Flex>
                    )}
                </CardHeader>
                <CardBody>
                    <Table variant="simple" color={textColor}>
                        <Thead>
                            <Tr my=".8rem" pl="0px" color="gray.400">
                                <Th pl="0px" color="gray.400">
                                    Columns
                                </Th>
                                <Th color="gray.400">Related Table</Th>
                                <Th color="gray.400">Status</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                rows.length === 0 && !data && !error ? (
                                    <TBodySkeletonLoading />
                                ) :
                                    <DetailRows onDelete={(row) =>onDelete(row)} rows={rows} />
                            }
                        </Tbody>
                    </Table>
                </CardBody>
            </Card>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select columns</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            {/* <FormLabel>Columns</FormLabel> */}
                            <Select onChange={(e) => onColsChange(e)} placeholder="-- Select -- " size="md">
                                {colsFromDB.length > 0 && colsFromDB.map((item, index) => {
                                    return <option key={index} value={item}>{item}</option>
                                })}
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => addNewRow()}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default DPOTableDetail

const TBodySkeletonLoading = () => {
    return (
        <Tr>
            <Td minWidth={{ sm: "250px" }}>
                <Skeleton height="20px" />
                <Skeleton height="20px" mt={4} />
                <Skeleton height="20px" mt={4} />
            </Td>
            <Td>
                <Skeleton height="20px" />
                <Skeleton height="20px" mt={4} />
                <Skeleton height="20px" mt={4} />
            </Td>
            <Td>
                <Skeleton height="20px" />
                <Skeleton height="20px" mt={4} />
                <Skeleton height="20px" mt={4} />
            </Td>
        </Tr>
    )
}

const DetailRows = ({ rows, onDelete }) => {

    return (
        <>
            {rows.map((row) => {
                const { column, is_active: isActive, id, related_table: relatedTable } = row;
                return (
                    <TablesDetailRow
                        key={id}
                        id={id}
                        name={column}
                        relatedTable={relatedTable}
                        isActive={isActive}
                        onDelete={() => onDelete(row)}
                    />
                );
            })}
        </>
    )
}
