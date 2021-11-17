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
  useDisclosure
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

const fetcher = (url: string) => axiosFetcher.get(url).then(r => r.data)

function Settings() {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [setting, setSetting] = useState<Setting | null>(null)
  const { data, error, mutate } = useSWR<any, any>(`${API_BASE_URL}admin/settings`, fetcher)

  const onModalClosed = () => {
    onClose();
    mutate();
  }

  const onCreateClicked = () => {
    setSetting(() => null)
    onOpen()
  }

  const onEditClicked = (setting: Setting) => {
    console.log(setting)
    setSetting(() => ({ ...setting }))
    onOpen();
  }

  if (error) return <div>Error</div>


  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <SettingFormModal onClose={onModalClosed} setting={setting} isOpen={isOpen} />
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Setting Tables
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
                <Th pl="0px" color="gray.400">
                  Key
                </Th>
                <Th pl="0px" color="gray.400">
                  Value
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
                    const setting = deserialize(toJson, Setting);
                    return (
                      <SettingTableRows
                        onEdit={() => onEditClicked(setting)}
                        key={setting.settingKey}
                        value={setting.value}
                        settingKey={setting.settingKey}
                        id={setting.id}
                        name={setting.name}
                        isActive={setting.isActive}
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

export default Settings;
