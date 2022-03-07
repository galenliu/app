import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import {Path} from "../../js/menuList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom"
import NewThingCard from "./NewThingCard";
import UsePairing from "./add-thing";
import {Stack} from "@mui/material";
import enTrans from "../../i18n/en-us.json"

export default function NewThings(props) {
    let navigate = useNavigate()
    const [newThing] = UsePairing(10000)
    const [things, setThings] = useState([])


    useEffect(() => {
        console.log("newThing:", newThing)
        if (newThing === {} || newThing === undefined || newThing === null) {
            return
        }
        let news = things
        news.push(newThing)
        setThings([...news])
    }, [newThing])

    return (
        <Box sx={{height: "100%", backgroundColor: "pink"}}>
            <IconButton sx={{position: "fixed", left: 6, top: 6, backgroundColor: "primary.light"}}
                        onClick={() => {
                            navigate(Path.Home)
                        }}>
                <ArrowBackIosIcon/>
            </IconButton>
            <Stack container direction="column" spacing={1} justifyContent="center"  alignItems="center">
                {
                    things.map((thing, index) => {
                        if (JSON.stringify(thing) === "{}") {
                            return
                        }
                        console.log("index:", index, "thing:", thing)
                        return <NewThingCard thing={thing} key={index}/>
                    })
                }
            </Stack>
        </Box>

    )
}