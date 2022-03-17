import {Fab, Stack} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import {Path} from "../../js/menuList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";


export default function ThingPanelLayout(props) {
    const navigator = useNavigate()
    return (
        <Stack sx={{height: "100%", width: "100%", alignItems: "center"}}>
            <Fab
                color="secondary"
                size='medium'
                onClick={() => {
                    navigator(Path.Home)
                }}
                sx={{
                    position: 'fixed',
                    top: (theme) => theme.spacing(1),
                    left: (theme) => theme.spacing(1),
                }}
            >
                <ArrowBackIosIcon/>
            </Fab>
            <Outlet/>
        </Stack>
    )
}