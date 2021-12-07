// Chakra imports
import {
  Box,
  Flex,
  Grid,
  Icon,
  Progress,
  SimpleGrid,
  Skeleton,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// assets
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
// Custom icons
import {
  CartIcon,
  CreditIcon,
  DocumentIcon,
  GlobeIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import DashboardTableRow from "components/Priority/DashboardTableRow";
import { API_BASE_URL } from "consts/api";
import { useRef, useState } from "react";
// react icons
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import useSWR from "swr";
import { axiosFetcher } from "utils/apiFetcher";
import { dashboardTableData } from "variables/general";

const fetcher = (url: string) => axiosFetcher.get(url).then(r => {
  return r.data.data
})

export default function Dashboard() {

  // Chakra Color Mode
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");

  const { data: bookingGraphData, error: bookingGraphError } = useSWR<any, any>(`${API_BASE_URL}admin/dashboard/booking-data`, fetcher)
  const { data: userStatData, error: userStatError } = useSWR<any, any>(`${API_BASE_URL}admin/dashboard/stats`, fetcher)
  const { data: commissionAndItemData, error: commissionAndItemError } = useSWR<any, any>(`${API_BASE_URL}admin/dashboard/commission-items-data`, fetcher)

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        {/* <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Today's transactions
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor}>
                    $53,000
                  </StatNumber>
                  <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    color="green.400"
                    fontWeight="bold"
                    ps="3px"
                    fontSize="md"
                  >
                    +55%
                  </StatHelpText>
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card> */}
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Total Users
                </StatLabel>
                <Flex>
                  {!userStatData && !userStatError
                    ? <Skeleton height="20px" />
                    : (
                      <StatNumber fontSize="lg" color={textColor}>{userStatData['user_stat']['total']['value']}</StatNumber>
                    )}
                  {!userStatData && !userStatError
                    ? <Skeleton height="20px" />
                    : (
                      <StatHelpText
                        alignSelf="flex-end"
                        justifySelf="flex-end"
                        m="0px"
                        color={`${userStatData['user_stat']['total']['rate'] >= 0 ? "green.400" : "red.400"}`}
                        fontWeight="bold"
                        ps="3px"
                        fontSize="md"
                      >
                        {userStatData['user_stat']['total']['rate'] >= 0 && "+"}{userStatData['user_stat']['total']['rate']}%
                      </StatHelpText>
                    )}
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                <GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat>
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  New Pengoo
                </StatLabel>
                <Flex>
                  {!userStatData && !userStatError
                    ? <Skeleton height="20px" />
                    : (
                      <StatNumber fontSize="lg" color={textColor}>{userStatData['user_stat']['new_pengoo']['value']}</StatNumber>
                    )}
                  {!userStatData && !userStatError
                    ? <Skeleton height="20px" />
                    : (
                      <StatHelpText
                        alignSelf="flex-end"
                        justifySelf="flex-end"
                        m="0px"
                        color={`${userStatData['user_stat']['new_pengoo']['rate'] >= 0 ? "green.400" : "red.400"}`}
                        fontWeight="bold"
                        ps="3px"
                        fontSize="md"
                      >
                        {userStatData['user_stat']['new_pengoo']['rate'] >= 0 && "+"}{userStatData['user_stat']['new_pengoo']['rate']}%
                      </StatHelpText>
                    )}
                </Flex>
              </Stat>
              <Spacer />
              <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                <DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat>
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  New Penger
                </StatLabel>
                <Flex>
                  {!userStatData && !userStatError
                    ? <Skeleton height="20px" />
                    : (
                      <StatNumber fontSize="lg" color={textColor}>{userStatData['user_stat']['new_penger']['value']}</StatNumber>
                    )}
                  {!userStatData && !userStatError
                    ? <Skeleton height="20px" />
                    : (
                      <StatHelpText
                        alignSelf="flex-end"
                        justifySelf="flex-end"
                        m="0px"
                        color={`${userStatData['user_stat']['new_penger']['rate'] >= 0 ? "green.400" : "red.400"}`}
                        fontWeight="bold"
                        ps="3px"
                        fontSize="md"
                      >
                        {userStatData['user_stat']['new_penger']['rate'] >= 0 && "+"}{userStatData['user_stat']['new_penger']['rate']}%
                      </StatHelpText>
                    )}
                </Flex>
              </Stat>
              <Spacer />
              <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                <DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>

      </SimpleGrid>
      {/* <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my="26px"
        gap="24px"
      >
        <Card minHeight="290.5px" p="1.2rem">
          <CardBody w="100%">
            <Flex flexDirection={{ sm: "column", lg: "row" }} w="100%">
              <Flex
                flexDirection="column"
                h="100%"
                lineHeight="1.6"
                width={{ lg: "45%" }}
              >
                <Text fontSize="sm" color="gray.400" fontWeight="bold">
                  Built by developers
                </Text>
                <Text
                  fontSize="lg"
                  color={textColor}
                  fontWeight="bold"
                  pb=".5rem"
                >
                  Purity UI Dashboard
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  From colors, cards, typography to complex elements, you will
                  find the full documentation.
                </Text>
                <Spacer />
                <Flex align="center">
                  <Button
                    p="0px"
                    variant="no-hover"
                    bg="transparent"
                    my={{ sm: "1.5rem", lg: "0px" }}
                  >
                    <Text
                      fontSize="sm"
                      color={textColor}
                      fontWeight="bold"
                      cursor="pointer"
                      transition="all .5s ease"
                      my={{ sm: "1.5rem", lg: "0px" }}
                      _hover={{ me: "4px" }}
                    >
                      Read more
                    </Text>
                    <Icon
                      as={BsArrowRight}
                      w="20px"
                      h="20px"
                      fontSize="2xl"
                      transition="all .5s ease"
                      mx=".3rem"
                      cursor="pointer"
                      pt="4px"
                      _hover={{ transform: "translateX(20%)" }}
                    />
                  </Button>
                </Flex>
              </Flex>
              <Spacer />
              <Flex
                bg="teal.300"
                align="center"
                justify="center"
                borderRadius="15px"
                width={{ lg: "40%" }}
                minHeight={{ sm: "250px" }}
              >
                <Image
                  src={logoChakra}
                  alt="chakra image"
                  minWidth={{ md: "300px", lg: "auto" }}
                />
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card maxHeight="290.5px" p="1rem">
          <CardBody
            p="0px"
            backgroundImage={peopleImage}
            bgPosition="center"
            bgRepeat="no-repeat"
            w="100%"
            h={{ sm: "200px", lg: "100%" }}
            bgSize="cover"
            position="relative"
            borderRadius="15px"
          >
            <Box
              bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
              w="100%"
              position="absolute"
              h="inherit"
              borderRadius="inherit"
              ref={() => overlayRef}
            ></Box>
            <Portal containerRef={overlayRef}>
              <Flex
                flexDirection="column"
                color="white"
                p="1.5rem 1.2rem 0.3rem 1.2rem"
                lineHeight="1.6"
              >
                <Text fontSize="xl" fontWeight="bold" pb=".3rem">
                  Work with the rockets
                </Text>
                <Text fontSize="sm" fontWeight="normal" w={{ lg: "92%" }}>
                  Wealth creation is a revolutionary recent positive-sum game.
                  It is all about who takes the opportunity first.
                </Text>
                <Spacer />
                <Flex
                  align="center"
                  mt={{ sm: "20px", lg: "40px", xl: "90px" }}
                >
                  <Button p="0px" variant="no-hover" bg="transparent" mt="12px">
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      _hover={{ me: "4px" }}
                      transition="all .5s ease"
                    >
                      Read more
                    </Text>
                    <Icon
                      as={BsArrowRight}
                      w="20px"
                      h="20px"
                      fontSize="xl"
                      transition="all .5s ease"
                      mx=".3rem"
                      cursor="pointer"
                      _hover={{ transform: "translateX(20%)" }}
                      pt="4px"
                    />
                  </Button>
                </Flex>
              </Flex>
            </Portal>
          </CardBody>
        </Card>
      </Grid> */}
      <Grid
        mt={26}
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap="24px"
        mb={{ lg: "26px" }}
      >
        <Card p="16px">
          <CardBody>
            <Flex direction="column" w="100%">
              <Card
                py="1rem"
                height={{ sm: "300px" }}
                width="100%"
                bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                position="relative"
              >
                {!commissionAndItemData && !commissionAndItemError
                  ? <Skeleton height="300px" />
                  : <BarChart data={commissionAndItemData['commission_data']} />
                }
              </Card>
              {/* <Flex
                direction="column"
                mt="24px"
                mb="36px"
                alignSelf="flex-start"
              >
                <Text
                  fontSize="lg"
                  color={textColor}
                  fontWeight="bold"
                  mb="6px"
                >
                  Active Users
                </Text>
                <Text fontSize="md" fontWeight="medium" color="gray.400">
                  <Text as="span" color="green.400" fontWeight="bold">
                    (+23%)
                  </Text>{" "}
                  than last week
                </Text>
              </Flex> */}
              <SimpleGrid my="26px" gap={{ sm: "12px" }} columns={2}>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <IconBox
                      as="box"
                      h={"30px"}
                      w={"30px"}
                      bg={iconTeal}
                      me="6px"
                    >
                      <CreditIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                    </IconBox>
                    <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                      Total Commission
                    </Text>
                  </Flex>
                  <Text
                    fontSize="lg"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                    my="6px"
                  >
                    {!commissionAndItemData && !commissionAndItemError
                      ? <Skeleton height="26px" />
                      : `${commissionAndItemData['commission_stat']['currency']} ${commissionAndItemData['commission_stat']['value']} `}
                  </Text>
                  {/* <Progress
                    colorScheme="teal"
                    borderRadius="12px"
                    h="5px"
                    value={30}
                  /> */}
                </Flex>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <IconBox
                      as="box"
                      h={"30px"}
                      w={"30px"}
                      bg={iconTeal}
                      me="6px"
                    >
                      <StatsIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                    </IconBox>
                    <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                      Total Items
                    </Text>
                  </Flex>
                  <Text
                    fontSize="lg"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                    my="6px"
                  >
                    {!commissionAndItemData && !commissionAndItemError
                      ? <Skeleton height="26px" />
                      : `${commissionAndItemData['item_stat']['value']}`}
                  </Text>
                  {/* <Progress
                    colorScheme="teal"
                    borderRadius="12px"
                    h="5px"
                    value={50}
                  /> */}
                </Flex>
              </SimpleGrid>
            </Flex>
          </CardBody>
        </Card>
        <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
          <CardHeader mb="20px" pl="22px">
            <Flex direction="column" alignSelf="flex-start">
              <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                Booking Overview
              </Text>
              {!bookingGraphData && !bookingGraphError ?
                <Skeleton height="10px" />
                : <Text fontSize="md" fontWeight="medium" color="gray.400">
                  <Text as="span" color="green.400" fontWeight="bold">
                    ({bookingGraphData['rate'] >= 0 && "+"}{bookingGraphData['rate']}%)
                  </Text>{" "}
                  in 2021
                </Text>
              }
            </Flex>
          </CardHeader>
          <Box w="100%" h={{ sm: "300px" }} ps="8px">
            {!bookingGraphData && !bookingGraphError ?
              <Skeleton height="10px" />
              : <LineChart data={bookingGraphData['booking_data']} />
            }
          </Box>
        </Card>
      </Grid>
      {/* <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap="24px"
      >
        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                pb=".5rem"
              >
                New Penger Partner
              </Text>
              <Flex align="center">
                <Icon
                  as={IoCheckmarkDoneCircleSharp}
                  color="teal.300"
                  w={4}
                  h={4}
                  pe="3px"
                />
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  <Text fontWeight="bold" as="span">
                    30 done
                  </Text>{" "}
                  this month.
                </Text>
              </Flex>
            </Flex>
          </CardHeader>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" ps="0px">
                <Th ps="0px" color="gray.400">
                  Companies
                </Th>
                <Th color="gray.400">Members</Th>
                <Th color="gray.400">Budget</Th>
                <Th color="gray.400">Completion</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dashboardTableData.map((row) => {
                return (
                  <DashboardTableRow
                    name={row.name}
                    logo={row.logo}
                    members={row.members}
                    budget={row.budget}
                    progression={row.progression}
                  />
                );
              })}
            </Tbody>
          </Table>
        </Card>
        <Card maxH="100%">
          <CardHeader p="22px 0px 35px 14px">
            <Flex direction="column">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                pb=".5rem"
              >
                Orders overview
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                <Text fontWeight="bold" as="span" color="teal.300">
                  +30%
                </Text>{" "}
                this month.
              </Text>
            </Flex>
          </CardHeader>
          <CardBody ps="20px" pe="0px" mb="31px" position="relative">
            <Flex direction="column">
              {timelineData.map((row, index, arr) => {
                return (
                  <TimelineRow
                    logo={row.logo}
                    title={row.title}
                    date={row.date}
                    color={row.color}
                    index={index}
                    arrLength={arr.length}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid> */}
    </Flex>
  );
}
