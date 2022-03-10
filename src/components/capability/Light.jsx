import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import OnOffProperty from "../property/OnOffProperty";
import List from "@mui/material/List";
import {useEffect} from "react";


export default function Light(props) {
    const {thing} = props

    useEffect(()=>{
        console.log("thing is light panel data:",thing)
    })

    return (
        <List>
            {
                // <OnOffProperty thing={thing}/>
            }
            <Button>
                This Light Panel
            </Button>
        </List>
    )

}