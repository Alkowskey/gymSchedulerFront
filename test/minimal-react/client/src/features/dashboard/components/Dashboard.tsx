
import { useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

import Appbar from "./Appbar";


export function Dashboard() {
    const theme = useTheme();
    return (
            <Appbar theme={theme}>
                <Outlet />
            </Appbar>
    );
}
