import {useParams} from "react-router-dom";
import {AppContext, gateway} from "../../App"
import {Button} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {Capability} from "../../js/constant";
import Light from "../../components/capability/Light";
import Box from "@mui/material/Box";


export default function Thing() {
    const params = useParams()
    const {getThing} = useContext(AppContext)
    const [thing, setThing] = useState(undefined)

    useEffect(() => {
        setThing(getThing(params.thingId))
    })

    useEffect(() => {
        console.log("params.thingId:", params.thingId)
        console.log("this is thing panel data:", thing)
    })

    return (
        <>
            {thing !== undefined &&  thing.selectedCapability === Capability.Light && <Light thing={thing}/>}
        </>
    )

}