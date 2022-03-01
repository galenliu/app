import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";
import ThingCard from "./ThingCard";
import {AppContext} from "../../App";
import enTrans from "../../i18n/en-us.json"


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
        <Grid sx={{mt:8, ml: 2}} container direction="row">
            {
                Things.map((thing, i) => {
                    return (
                        <ThingCard key={i} thing={thing}/>
                    )
                })
            }
        </Grid>
    )
}


