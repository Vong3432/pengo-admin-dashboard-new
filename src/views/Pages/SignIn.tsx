import React from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";
import useSWR from "swr";
import { axiosFetcher } from "utils/apiFetcher";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { login } from "utils/auth";
import { API_BASE_URL } from "consts/api";

type SignInFormType = {
  email: string;
  password: string;
  secret: string;
}

function SignIn() {
  const history = useHistory()
  const toast = useToast()
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const { data, error, } = useSWR('admin/settings', (url) => axiosFetcher.get(url))
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormType>({
    defaultValues: {
      email: "demoadmin@gmail.com",
      password: "demoadmin",
    }
  })

  if (data) {
    history.push('/admin/dashboard')
  }

  const onSubmit = async (data: SignInFormType) => {
    try {
      const response = await axiosFetcher.post(`${API_BASE_URL}auth/admin/login`, {
        ...data
      })
      const responseData = await response.data;

      login(responseData.data.token.token)
      history.push('/admin/dashboard')

    } catch (error) {
      console.log(error)
      toast({
        position: "bottom",
        status: "error",
        title: "Login failed",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex position="relative" mb="40px">
        <Flex
          h={{ sm: "initial", md: "75vh", lg: "85vh" }}
          w="100%"
          maxW="1044px"
          mx="auto"
          justifyContent="space-between"
          mb="30px"
          pt={{ sm: "100px", md: "0px" }}
        >
          <Flex
            alignItems="center"
            justifyContent="start"
            style={{ userSelect: "none" }}
            w={{ base: "100%", md: "50%", lg: "42%" }}
          >
            <Flex
              direction="column"
              w="100%"
              background="transparent"
              p="48px"
              mt={{ md: "150px", lg: "80px" }}
            >
              <Heading color={titleColor} fontSize="32px" mb="10px">
                Welcome Back
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColor}
                fontWeight="bold"
                fontSize="14px"
              >
                Enter your email, password and secret to sign in
              </Text>
              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Email
                </FormLabel>
                <Input
                  {...register("email", { required: "Email cannot be empty" })}
                  isInvalid={errors.email?.message !== undefined}
                  borderRadius="15px"
                  fontSize="sm"
                  type="text"
                  placeholder="Your email adress"
                  size="lg"
                  color={textColor}
                />
                {errors.email?.message && <Text fontSize="sm" color="red.300">{errors.email.message}</Text>}
                <FormLabel mt="24px" ms="4px" fontSize="sm" fontWeight="normal">
                  Password
                </FormLabel>
                <Input
                  {...register("password", { required: "Password cannot be empty" })}
                  borderRadius="15px"
                  fontSize="sm"
                  type="password"
                  placeholder="Your password"
                  size="lg"
                  color={textColor}
                />
                {errors.password?.message && <Text fontSize="sm" color="red.300">{errors.password.message}</Text>}
                <FormLabel ms="4px" mt="24px" fontSize="sm" fontWeight="normal">
                  Secret
                </FormLabel>
                <Input
                  {...register("secret", { required: "Secret cannot be empty" })}
                  borderRadius="15px"
                  fontSize="sm"
                  type="password"
                  placeholder="Enter secret"
                  size="lg"
                  color={textColor}
                />
                {errors.secret?.message && <Text fontSize="sm" color="red.300">{errors.secret.message}</Text>}
                {/* <FormControl display="flex" alignItems="center">
                <Switch id="remember-login" colorScheme="teal" me="10px" />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  ms="1"
                  fontWeight="normal"
                >
                  Remember me
                </FormLabel>
              </FormControl> */}
                <Button
                  mt="56px"
                  fontSize="10px"
                  type="submit"
                  bg="teal.300"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  _hover={{
                    bg: "teal.200",
                  }}
                  _active={{
                    bg: "teal.400",
                  }}
                >
                  SIGN IN
                </Button>
              </FormControl>
              {/* <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Don't have an account?
                <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                  Sign Up
                </Link>
              </Text>
            </Flex> */}
            </Flex>
          </Flex>
          <Box
            display={{ base: "none", md: "block" }}
            overflowX="hidden"
            h="100%"
            w="40vw"
            position="absolute"
            right="0px"
          >
            <Box
              bgImage={signInImage}
              w="100%"
              h="100%"
              bgSize="cover"
              bgPosition="50%"
              position="absolute"
              borderBottomLeftRadius="20px"
            ></Box>
          </Box>
        </Flex>
      </Flex>
    </form>
  );
}

export default SignIn;
