import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";
import ThingCard from "./ThingCard";
import {AppContext} from "../../App";
import enTrans from "../../i18n/en-us.json"
import IconButton from "@mui/material/IconButton";
import {Path} from "../../js/menuList";
import AddIcon from "@mui/icons-material/Add";


export default function Things(props) {
    const {t} = useTranslation();
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
        <>
            <IconButton sx={{position: "fixed", mt: 1, mr: 1, right: 0, backgroundColor: "primary.light"}}
                        onClick={() => {
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
        </>
    )
}


