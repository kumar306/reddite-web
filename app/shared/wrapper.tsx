import { Box } from "@chakra-ui/react"

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper:React.FC<WrapperProps> = ({ children }) => {
    return (
        <Box mt={10} mx="auto" maxW="800px" w="100%" p={4} my={2}>
            {children}
        </Box>
    )
}