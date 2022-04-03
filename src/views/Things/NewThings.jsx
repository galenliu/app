import {Path} from "src/js/menuList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom"
import NewThingCard from "src/views/Things/NewThingCard";
import useAddThings from "src/js/use-add-thing";
import {CircularProgress, Fab, LinearProgress, Stack} from "@mui/material";
import Api from "src/js/api";
import LoadingButton from '@mui/lab/LoadingButton';
import {arrayIncludes} from "@mui/lab/internal/pickers/utils";
import {gateway} from "../../main";


export const Status = ["Paring", "Error", "Complete"]

export default function NewThings() {
    const navigate = useNavigate()
    const [thingMaps, state,addThing] = useAddThings(10000)



    return (
        <Box sx={{height: "100%"}}>
            <Fab
                color="primary"
                size='medium'
                onClick={() => {
                    navigate(Path.Home)
                }}
                sx={{
                    position: 'fixed',
                    top: (theme) => theme.spacing(1),
                    left: (theme) => theme.spacing(1),
                }}
            >
                <ArrowBackIosIcon/>
            </Fab>


            {state === Status[0] && <Fab
                size='medium'
                sx={{
                    position: 'fixed',
                    top: (theme) => theme.spacing(1),
                    right: (theme) => theme.spacing(1),
                }}>
                <CircularProgress/>
            </Fab>}


            <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                <LinearProgress variant="determinate" value={92}/>
                {
                    [...thingMaps.keys()].map(k => (
                        <NewThingCard thing={thingMaps.get(k)} save={addThing} key={k}/>
                    ))
                }
            </Stack>
        </Box>
    )
}