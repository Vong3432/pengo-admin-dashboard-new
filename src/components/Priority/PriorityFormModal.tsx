import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Text, ModalBody, ModalFooter, Button, ModalProps, FormControl, FormHelperText, FormLabel, Input, useColorModeValue, useToast, Switch, Textarea, Select, Skeleton } from '@chakra-ui/react'
import { API_BASE_URL } from 'consts/api';
import { Priority } from 'models/Priority';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { serialize } from 'ts-jackson';
import { axiosFetcher } from 'utils/apiFetcher';

type PriorityFormProps = {
    isOpen: boolean;
    onClose: () => void;
    priority: Priority | null;
}

type PriorityFormDataType = {
    tableName: string;
    isActive: boolean;
}

const fetcher = (url: string) => axiosFetcher.get(url).then(res => {
    return res.data['data']
})

const PriorityFormModal: React.FC<PriorityFormProps> = (props) => {

    // props
    const { isOpen, onClose, priority } = props;

    // hooks
    const toast = useToast()
    const { reset, register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PriorityFormDataType>({
        defaultValues: {
            tableName: "",
            isActive: true,
        }
    })
    const { data, error, mutate } = useSWR(`${API_BASE_URL}admin/db/tables?show_duplicate=0`, fetcher)

    // variables
    const scrollBehavior: ModalProps["scrollBehavior"] = "inside"
    const isEditing = priority !== null
    const textColor = useColorModeValue("gray.400", "white");
    const inputTextColor = useColorModeValue("gray.900", "white");

    // effects
    useEffect(() => {
        if (isEditing === true && priority !== null) {
            // set default values into formState
            setValue("tableName", priority.tableName)
            setValue("isActive", priority.isActive)
        } else {
            reset()
        }
    }, [priority])

    const onSubmit = async (data: PriorityFormDataType) => {
        try {

            if (isEditing) {
                await axiosFetcher.put(`${API_BASE_URL}admin/dpo-tables/${priority.id}`, {
                    table_name: data.tableName,
                    is_active: data.isActive ? 1 : 0,
                })
            } else {
                await axiosFetcher.post(`${API_BASE_URL}admin/dpo-tables`, {
                    table_name: data.tableName,
                    is_active: data.isActive ? 1 : 0,
                })
            }

            onClose()
            toast({
                title: `${isEditing ? 'Update' : 'Create'} successfully`,
                isClosable: true,
                status: "success",
            })
        } catch (error) {
            toast({
                title: "Unable to perform this action",
                description: `err ${error}`,
                isClosable: true,
                status: "error",
            })
        }
    }

    if (error) return <div>Something went wrong</div>

    console.log("options", data)

    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            scrollBehavior={scrollBehavior}
        >
            <ModalOverlay />
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalContent>
                    <ModalHeader>{isEditing ? `Edit ${Priority?.name}` : "Create new function"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mt="6" colorScheme="teal" id="name">
                            <FormLabel color={textColor}>Table Name</FormLabel>
                            <Select placeholder="Select a table" color={inputTextColor} type="name" {...register("tableName", { required: "Name cannot be empty" })}>
                                {!data && !error ? (
                                    <>
                                        <Skeleton height="20px" />
                                    </>
                                ) : (
                                    <>
                                        {data.map((table: string) => <option key={table} value={table}>{table}</option>)}
                                    </>
                                )}
                            </Select>
                            {errors.tableName?.message && <Text fontSize="sm" color="red.300">{errors.tableName.message}</Text>}
                        </FormControl>
                        <FormControl mt="6" id="is_active">
                            <FormLabel color={textColor}>Is activated</FormLabel>
                            <Switch {...register("isActive")} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" color="white" type="submit" mr="4">Submit</Button>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default PriorityFormModal
