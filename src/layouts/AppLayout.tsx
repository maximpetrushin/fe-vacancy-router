import Header from "../components/Header.tsx";
import {Box} from "@mantine/core";
import {Outlet} from 'react-router';



function AppLayout() {
    return (
        <Box bg='background.0' mih='100vh'>
            <Header />
            <Outlet />
        </Box>
    )
}

export default AppLayout;