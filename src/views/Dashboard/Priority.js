import React from "react";
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
  Skeleton
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TablesTableRow from "components/Priority/TablesTableRow";
import useSWR from "swr";
import { API_BASE_URL } from "consts/api";
import { axiosFetcher } from "utils/apiFetcher";

const fetcher = url => axiosFetcher.get(url).then(res => {
  let promise = new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(res.data.data);
    }, 1000);
  });
  return promise;
})

function Priority() {
  const textColor = useColorModeValue("gray.700", "white");

  const { data, error } = useSWR(`${API_BASE_URL}admin/dpo-tables`, fetcher)

  if (error) return <div>Error</div>

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Priority Tables
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" color="gray.400">
                  Table Name
                </Th>
                <Th color="gray.400">Status</Th>
                <Th></Th>
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
                  data.map((row) => {
                    const { table_name: tableName, is_active: isActive, id } = row;
                    return (
                      <TablesTableRow
                        key={id}
                        id={id}
                        name={tableName}
                        isActive={isActive}
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
