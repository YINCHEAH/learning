import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'

import React from 'react'
import { Link } from 'react-router-dom'
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'


const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
        <Flex 
        h={16} 
        alignItems={"center"} 
        justifyContent={"space-between"} 
        flexDir={{base:"Column", sm:"row"}}
        >
            <Text 
            bgGradient='linear(to-l, #7928CA, #FF0080)' 
            bgClip='text' 
            fontSize='4xl' 
            fontWeight='extrabold'
            >
                <Link to={"/"}>Product Store</Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <PlusSquareIcon />
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <IoMoon /> : <LuSun /> }
                </Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default NavBar