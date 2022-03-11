import {Button} from "@mui/material";
import OnOffProperty from "../property/OnOffProperty";
import List from "@mui/material/List";
import {useEffect, useState} from "react";
import useLight from "../../hooks/use-light";
import ColorProperty from "../property/ColorProperty";


export default function Light(props) {

    const {on, setOn,color,setColor} = useLight(props.thing)

    useEffect(() => {
        console.log("thing is light panel data:", props.thing)
        console.log("light hooks:", on, setOn)
    }, [])


    return (
        <List spacing={2} sx={{borderRadius: "3px"}}>
            {props.thing !== undefined && props.onProperty !== null &&
                <OnOffProperty thing={props.thing} value={on} setOn={setOn}/>}
            {props.thing !== undefined && props.color !== null &&
                <ColorProperty thing={props.thing} value={color} setColor={setColor}/>}
        </List>
    )

}