import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Text, ModalBody, ModalFooter, Button, ModalProps, FormControl, FormHelperText, FormLabel, Input, useColorModeValue, useToast, Switch } from '@chakra-ui/react'
import { API_BASE_URL } from 'consts/api';
import { Setting } from 'models/Setting';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { axiosFetcher } from 'utils/apiFetcher';

type SettingFormProps = {
    isOpen: boolean;
    onClose: () => void;
    setting: Setting | null;
}

type SettingFormDataType = {
    name: string;
    value: string;
    isActive: boolean;
}

const SettingFormModal: React.FC<SettingFormProps> = (props) => {

    // props
    const { isOpen, onClose, setting } = props;

    // hooks
    const toast = useToast()
    const { reset, register, handleSubmit, formState: { errors }, setValue, watch } = useForm<SettingFormDataType>({
        defaultValues: {
            name: "",
            value: "",
            isActive: true,
        }
    })

    // variables
    const scrollBehavior: ModalProps["scrollBehavior"] = "inside"
    const isEditing = setting !== null
    const textColor = useColorModeValue("gray.400", "white");
    const inputTextColor = useColorModeValue("gray.900", "white");
    const keyValue = watch("name").toLowerCase().split(" ").join("_")

    // effects
    useEffect(() => {
        if (isEditing === true && setting !== null) {
            // set default values into formState
            setValue("name", setting.name)
            setValue("value", setting.value)
            setValue("isActive", setting.isActive)
        } else {
            reset()
        }
    }, [setting])

    const onSubmit = async (data: SettingFormDataType) => {
        try {
            if (isEditing) {
                await axiosFetcher.put(`${API_BASE_URL}admin/settings/${setting.id}`, {
                    ...data,
                    key: keyValue,
                    is_active: data.isActive ? 1 : 0,
                })
            } else {
                await axiosFetcher.post(`${API_BASE_URL}admin/settings`, {
                    ...data,
                    key: keyValue,
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
                    <ModalHeader>{isEditing ? `Edit ${setting?.name}` : "Create new setting"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl colorScheme="teal" id="settingKey">
                            <FormLabel color={textColor}>Key</FormLabel>
                            <Input color={inputTextColor} type="name" value={keyValue} disabled />
                        </FormControl>
                        <FormControl mt="6" colorScheme="teal" id="name">
                            <FormLabel color={textColor}>Name</FormLabel>
                            <Input color={inputTextColor} type="name" {...register("name", { required: "Name cannot be empty" })} />
                            {errors.name?.message && <Text fontSize="sm" color="red.300">{errors.name.message}</Text>}
                        </FormControl>
                        <FormControl mt="6" id="value">
                            <FormLabel color={textColor}>Value</FormLabel>
                            <Input color={inputTextColor} type="name" {...register("value", { required: "Value cannot be empty" })} />
                            {errors.value?.message && <Text fontSize="sm" color="red.300">{errors.value.message}</Text>}
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

export default SettingFormModal
