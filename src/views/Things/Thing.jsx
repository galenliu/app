import {useParams} from "react-router-dom";
import {AppContext, gateway} from "../../App"
import {Button, Stack} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {Capability} from "../../js/constant";
import Light from "../../components/capability/Light";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import useThing from "../../hooks/use-thing";


export default function Thing() {
    const params = useParams()
    const {getThing} = useContext(AppContext)
    const [thing] = useThing()

    useEffect(() => {
        setThing(getThing(params.thingId))
    })

    useEffect(() => {
        if(!thing){
            return
        }
        console.log("this is thing panel data:", thing)
        console.log("this is thing property:", thing.model.properties)
    }, [thing])

    return (
        <Stack sx={{width: "60%",backgroundColor:"primary.background"}} spacing={1}>
            {thing !== undefined && thing.selectedCapability === Capability.Light && <Light thing={thing}/>}
        </Stack>
    )

}