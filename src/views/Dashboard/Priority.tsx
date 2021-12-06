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
  useToast,
  useDisclosure,
  Button
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TablesTableRow from "components/Priority/TablesTableRow";
import useSWR from "swr";
import { API_BASE_URL } from "consts/api";
import { axiosFetcher } from "utils/apiFetcher";
import { deserialize } from "ts-jackson";
import { Priority as PriorityModel } from 'models/Priority'
import PriorityFormModal from "components/Priority/PriorityFormModal";

const fetcher = (url: string) => axiosFetcher.get(url).then(res => {
  return res.data['data']
})

function Priority() {

  const [priority, setPriority] = useState<PriorityModel | null>(null)

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const textColor = useColorModeValue("gray.700", "white");

  const { data, error, mutate } = useSWR(`${API_BASE_URL}admin/dpo-tables`, fetcher)

  const onModalClosed = () => {
    onClose();
    mutate();
  }

  const onCreateClicked = () => {
    setPriority(() => null)
    onOpen()
  }

  const onControlActivating = () => {
    mutate()
  }

  if (error) return <div>Error</div>

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <PriorityFormModal onClose={onModalClosed} priority={priority} isOpen={isOpen} />
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Priority Tables
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
                  Table Name
                </Th>
                <Th color="gray.400">Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                !data && !error ? (
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
                ) :
                  data.map((row: any) => {
                    const toJson = JSON.stringify(row)
                    const currentPriority = deserialize(toJson, PriorityModel);
                    return (
                      <TablesTableRow
                        key={currentPriority.id}
                        id={currentPriority.id}
                        name={currentPriority.tableName}
                        isActive={currentPriority.isActive}
                        onControlActivating={onControlActivating}
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

export default Priority;
