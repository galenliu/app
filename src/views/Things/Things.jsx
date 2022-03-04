import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";
import ThingCard from "./ThingCard";
import {AppContext} from "../../App";
import enTrans from "../../i18n/en-us.json"
import IconButton from "@mui/material/IconButton";
import {Path} from "../../js/menuList";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";


export default function Things(props) {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const {setTitle} = useContext(AppContext)
    const [Things, setThings] = useState([])

    useEffect(() => {
        setTitle(t(enTrans.Home))
        console.log("Home view things:", props.things)
        return () => {
            console.log("Exits Home view")
        }
    }, [])

    useEffect(() => {
        console.log("things useEffect:", props.things)
        setThings(props.things)
    }, [props.things])


    return (
        <Box>
            <IconButton sx={{position: "fixed", right: 6, top: 6, backgroundColor: "primary.light"}}
                        onClick={() => {
                            navigate(Path.NewThings)
                        }}>
                <AddIcon/>
            </IconButton>
            <Grid sx={{mt: 8, ml: 2}} container direction="row">
                {
                    Things.map((thing, i) => {
                        return (
                            <ThingCard key={i} thing={thing}/>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}


