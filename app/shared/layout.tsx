import { Navbar } from "./navbar";
import { Wrapper } from "./wrapper";

interface LayoutProps {
    children: React.ReactNode
}

const Layout:React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
        <Navbar />
        <Wrapper>
            {children}
        </Wrapper>
        </>
    )
}

export default Layout;