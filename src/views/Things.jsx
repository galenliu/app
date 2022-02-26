import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@mui/styles";
import {gateway} from "../App";
import clsx from "clsx";
import NewThingsDialog from "./dialog/NewThingDialog";
import Constants from "../constants";
import useThings from "../hooks/use-things";
import ThingCard from "../thing/ThingCard";
// import NewThingsDialog from "./AddThing";


const useStyles = makeStyles((theme) => ({

    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

}))


export default function Things(props) {

    const classes = useStyles()
    const {t} = useTranslation();

    const [things] = useThings(gateway)



    useEffect(() => {
        renderThings()
        console.log("This is Things view things:", things)
        return () => {
            console.log("exits Things view")
        }
    }, [])


    function renderThings() {
        let list = []
        console.log("renderThings:", things)
        things.forEach((t, key, m) => {
            list.push(<ThingCard key={key} thing={t}/>)
        })
        return list
    }

    return (
        <>
            <Grid sx={{marginTop: "12px", marginLeft: "12px"}} container
                  direction="row" spacing={2}>
                {renderThings()}
            </Grid>
            {/*<NewThingsDialog open={newThingShow}/>*/}
        </>
    )
}


