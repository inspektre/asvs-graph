import {
    Container,
    Stack,
    Flex,
    Heading,
    Text,
    Button,
    useColorMode,
  } from '@chakra-ui/react'
  import { IoArrowBackOutline } from 'react-icons/io5'
  import { AiFillHome } from 'react-icons/ai'
  import NextImage from 'next/image'
  import { useRouter } from 'next/router'
  
  const Page500 = () => {
    const { colorMode } = useColorMode()
    const router = useRouter()
    return (
      <Flex align={'center'} justify={'center'} h={'100vh'} w={'full'}>
        <Stack
          as={Container}
          rounded={'xl'}
          p={8}
          spacing={6}
          maxW={'lg'}
          align={'center'}
          textAlign={'center'}
        >
          {/* To-DO: Add a logo here */}
          <Stack spacing={2}>
            <Heading>An Error occured</Heading>
            <Text>
              An error occured on our end :/
            </Text>
          </Stack>
          <Flex direction="row">
            <Button
              variant="ghost"
              m={2}
              leftIcon={<IoArrowBackOutline />}
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Button
              variant="ghost"
              m={2}
              leftIcon={<AiFillHome />}
              onClick={() => router.push('/')}
            >
              Home
            </Button>
          </Flex>
        </Stack>
      </Flex>
    )
  }
  
  export default Page500