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
    const [thing] = useThing(params.thingId)

    useEffect(() => {
        console.log("Thing Panel params:",params)
        console.log("Thing Panel data:",thing)
    })

    useEffect(() => {

    }, [thing])

    return (
        <Stack sx={{width: "60%",backgroundColor:"primary.background"}} spacing={1}>
            {thing !== null && thing !== undefined && thing.selectedCapability === Capability.Light && <Light thing={thing}/>}
        </Stack>
    )

}