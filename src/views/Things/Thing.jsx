import {useParams} from "react-router-dom";
import {Stack} from "@mui/material";
import {useEffect} from "react";
import {Capability} from "../../js/constant";
import Light from "../../components/capability/Light";
import MultiLevelSwitch from "../../components/capability/MultiLevelSwitch";
import OnOffSwitch from "../../components/capability/OnOffSwitch";
import useThing from "../../hooks/use-thing";


export default function Thing() {
    const params = useParams()
    const [thing] = useThing(params.thingId)

    useEffect(() => {
        console.log("Thing Panel params:", params)
        console.log("Thing Panel data:", thing)
    })

    useEffect(() => {

    }, [thing])

    return (
        <Stack sx={{width: "60%", backgroundColor: "primary.background"}} spacing={1}>
            {thing !== null && thing !== undefined && thing.selectedCapability === Capability.Light &&
                <Light thing={thing}/>}
            {thing !== null && thing !== undefined && thing.selectedCapability === Capability.MultiLevelSwitch &&
                <MultiLevelSwitch thing={thing}/>}
            {thing !== null && thing !== undefined && thing.selectedCapability === Capability.OnOffSwitch &&
                <OnOffSwitch thing={thing}/>}
        </Stack>
    )

}