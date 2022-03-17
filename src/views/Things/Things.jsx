import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";
import ThingCard from "./ThingCard";
import {AppContext, gateway} from "../../App";
import enTrans from "../../i18n/en-us.json"
import IconButton from "@mui/material/IconButton";
import {Path} from "../../js/menuList";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Fab} from "@mui/material";
import useThings from "../../hooks/use-things";

export default function Things(props) {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const {setTitle} = useContext(AppContext)
    const [things] = useThings(gateway)

    useEffect(() => {
        setTitle(t(enTrans.Home))
        console.log("Home view things Data:", things)
        return () => {
            console.log("Exits Home view")
        }
    }, [])

    return (
        <Box>
            <Fab
                size="medium"
                color="primary"
                onClick={() => {
                    navigate(Path.NewThings)
                }}
                sx={{
                    position: 'fixed',
                    top: (theme) => theme.spacing(1),
                    right: (theme) => theme.spacing(1),
                }}
            >
                <AddIcon/>
            </Fab>


            <Grid sx={{mt: 8, ml: 2}} container direction="row">
                {
                    things.map((thing, i) => {
                        return (
                            <ThingCard key={i} thing={thing}/>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}


