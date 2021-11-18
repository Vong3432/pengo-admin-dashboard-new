import React, { useState } from "react";
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  useColorModeValue,
  Skeleton,
  Button,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import useSWR from "swr";
import { API_BASE_URL } from "consts/api";
import { axiosFetcher } from "utils/apiFetcher";
import SettingTableRows from "components/Settings/SettingTableRows";
import { Setting } from "models/Setting";
import { deserialize } from "ts-jackson";
import SettingFormModal from "components/Settings/SettingFormModal";
import { SystemFunction } from "models/SystemFunction";
import SystemFunctionRows from "components/SystemFunctions/SystemFunctionRows";
import SystemFunctionFormModal from "components/SystemFunctions/SystemFunctionFormModal";

const fetcher = (url: string) => axiosFetcher.get(url).then(r => r.data)

function SystemFunctions() {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sysFunction, setSysFunction] = useState<SystemFunction | null>(null)
  const toast = useToast()
  const { data, error, mutate } = useSWR<any, any>(`${API_BASE_URL}admin/system-functions`, fetcher)

  const onModalClosed = () => {
    onClose();
    mutate();
  }

  const onCreateClicked = () => {
    setSysFunction(() => null)
    onOpen()
  }

  const onEditClicked = (data: SystemFunction) => {
    setSysFunction(() => ({ ...data }))
    onOpen();
  }

  const onDelClicked = async (data: SystemFunction) => {

    // clear 
    if (sysFunction !== null)
      setSysFunction(() => null)

    try {
      toast({
        title: "Deleting",
        status: "info",
        isClosable: true,
      })
      await axiosFetcher.del(`${API_BASE_URL}admin/system-functions/${data.id}`)
      toast({
        title: "Deleted successfully",
        status: "success",
        isClosable: true,
      })
      mutate();
    } catch (error) {
      toast({
        id: "global-swr-err",
        title: "Unable to delete",
        description: `err ${error}`,
        status: "error",
        isClosable: true
      })
    }
  }

  if (error) return <div>Error</div>


  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <SystemFunctionFormModal onClose={onModalClosed} systemFunction={sysFunction} isOpen={isOpen} />
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            System Functions Tables
          </Text>
          <Button onClick={onCreateClicked} backgroundColor="teal.300" colorScheme="teal" color="white" size="lg" ml="auto">
            Create
          </Button>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" color="gray.400">
                  Name
                </Th>
                <Th maxWidth="50px" pl="0px" color="gray.400">
                  Description
                </Th>
                <Th pl="0px" color="gray.400">
                  Is Premium
                </Th>
                <Th pl="0px" color="gray.400">
                  Price
                </Th>
                <Th color="gray.400">Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                !data && !error ? (
                  <Tr>
                    <Td minWidth={{ sm: "150px" }}>
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
                    <Td>
                      <Skeleton height="20px" />
                      <Skeleton height="20px" mt={4} />
                      <Skeleton height="20px" mt={4} />
                    </Td>
                  </Tr>
                ) :
                  data['data'].map((json: any) => {
                    const toJson = JSON.stringify(json)
                    const currentFunction = deserialize(toJson, SystemFunction);
                    return (
                      <SystemFunctionRows
                        onDel={() => onDelClicked(currentFunction)}
                        onEdit={() => onEditClicked(currentFunction)}
                        key={currentFunction.id}
                        id={currentFunction.id}
                        name={currentFunction.name}
                        isActive={currentFunction.isActive}
                        description={currentFunction.description}
                        isPremium={currentFunction.isPremium}
                        price={currentFunction.price}
                      />
                    );
                  })
              }
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      {/* <Card
        my="22px"
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
              Projects Table
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px">
                <Th pl="0px" color="gray.400">
                  Companies
                </Th>
                <Th color="gray.400">Budget</Th>
                <Th color="gray.400">Status</Th>
                <Th color="gray.400">Completion</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tablesProjectData.map((row) => {
                return (
                  <TablesProjectRow
                    name={row.name}
                    logo={row.logo}
                    status={row.status}
                    budget={row.budget}
                    progression={row.progression}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card> */}
    </Flex>
  );
}

export default SystemFunctions;
