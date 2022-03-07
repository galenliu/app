import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import {Path} from "../../js/menuList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom"
import NewThingCard from "./NewThingCard";
import UsePairing from "./add-thing";


export default function NewThings(props) {
    let navigate = useNavigate()
    const [newThing] = UsePairing(10000)
    const [things, setThings] = useState([])


    useEffect(() => {
        let old = things
        // if (old.some((t) => {
        //     return t.id !== newThing.id
        // })) {
        //     return
        // }
        old.push(newThing)
        setThings([...old])
    }, [newThing])

    return (
        <Box sx={{height: "100%", backgroundColor: "pink"}}>
            <IconButton sx={{position: "fixed", left: 6, top: 6, backgroundColor: "primary.light"}}
                        onClick={() => {
                            navigate(Path.Home)
                        }}>
                <ArrowBackIosIcon/>
            </IconButton>
            <Grid sx={{mt: 8, ml: 2,height: "100%"}} container direction="row" >
            {
                things.map((thing, index) => {
                    console.log("index:", index, "thing:", thing)
                    return <NewThingCard thing={thing} key={index}/>
                })
            }
            </Grid>
        </Box>

    )
}