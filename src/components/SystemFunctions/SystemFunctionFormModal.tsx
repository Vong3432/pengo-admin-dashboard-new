import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Text, ModalBody, ModalFooter, Button, ModalProps, FormControl, FormHelperText, FormLabel, Input, useColorModeValue, useToast, Switch, Textarea } from '@chakra-ui/react'
import { API_BASE_URL } from 'consts/api';
import { SystemFunction } from 'models/SystemFunction';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { axiosFetcher } from 'utils/apiFetcher';

type SystemFunctionFormProps = {
    isOpen: boolean;
    onClose: () => void;
    systemFunction: SystemFunction | null;
}

type SystemFunctionFormDataType = {
    name: string;
    description: string;
    price: number;
    isActive: boolean;
}

const SystemFunctionFormModal: React.FC<SystemFunctionFormProps> = (props) => {

    // props
    const { isOpen, onClose, systemFunction } = props;

    // hooks
    const toast = useToast()
    const { reset, register, handleSubmit, formState: { errors }, setValue, watch } = useForm<SystemFunctionFormDataType>({
        defaultValues: {
            name: "",
            description: "",
            isActive: true,
            price: 0,
        }
    })

    // variables
    const scrollBehavior: ModalProps["scrollBehavior"] = "inside"
    const isEditing = systemFunction !== null
    const textColor = useColorModeValue("gray.400", "white");
    const inputTextColor = useColorModeValue("gray.900", "white");
    const isPremium = (watch("price") !== null && watch("price") > 0) ? true : false

    // effects
    useEffect(() => {
        if (isEditing === true && systemFunction !== null) {
            // set default values into formState
            setValue("name", systemFunction.name)
            setValue("description", systemFunction.description)
            setValue("isActive", systemFunction.isActive)
            setValue("price", systemFunction.price)
        } else {
            reset()
        }
    }, [systemFunction])

    const onSubmit = async (data: SystemFunctionFormDataType) => {
        try {
            if (isEditing) {
                await axiosFetcher.put(`${API_BASE_URL}admin/system-functions/${systemFunction.id}`, {
                    ...data,
                    is_premium: isPremium ? 1 : 0,
                    is_active: data.isActive ? 1 : 0,
                })
            } else {
                await axiosFetcher.post(`${API_BASE_URL}admin/system-functions`, {
                    ...data,
                    is_premium: isPremium ? 1 : 0,
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

    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            scrollBehavior={scrollBehavior}
        >
            <ModalOverlay />
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalContent>
                    <ModalHeader>{isEditing ? `Edit ${systemFunction?.name}` : "Create new function"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mt="6" colorScheme="teal" id="name">
                            <FormLabel color={textColor}>Name</FormLabel>
                            <Input color={inputTextColor} type="name" {...register("name", { required: "Name cannot be empty" })} />
                            {errors.name?.message && <Text fontSize="sm" color="red.300">{errors.name.message}</Text>}
                        </FormControl>
                        <FormControl mt="6" id="description">
                            <FormLabel color={textColor}>Description</FormLabel>
                            <Textarea color={inputTextColor} multiple {...register("description", { required: "Description cannot be empty" })} />
                            {errors.description?.message && <Text fontSize="sm" color="red.300">{errors.description.message}</Text>}
                        </FormControl>
                        <FormControl mt="6" id="price">
                            <FormLabel color={textColor}>Price</FormLabel>
                            <Input color={inputTextColor} type="number" {...register("price", { required: "Price cannot be empty" })} />
                            {errors.price?.message && <Text fontSize="sm" color="red.300">{errors.price.message}</Text>}
                        </FormControl>
                        <FormControl mt="6" id="is_premium">
                            <FormLabel color={textColor}>Is Premium</FormLabel>
                            <Switch isChecked={isPremium} />
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

export default SystemFunctionFormModal
