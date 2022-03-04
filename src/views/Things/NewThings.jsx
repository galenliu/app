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
    const [newThings,addThing,startPairing,cancelPairing] = UsePairing()
    const [things,setThings]=useState([])

    useEffect(() => {
      startPairing().then(() =>{}).catch((e) =>{console.log(e)})
        return()=>{
          cancelPairing()
        }
    })

    useEffect(()=>{

    },[newThings])

    return (
        <Box sx={{height: "100%", backgroundColor: "primary.background"}}>
            <IconButton sx={{position: "fixed", left: 6, top: 6, backgroundColor: "primary.light"}}
                        onClick={() => {
                            navigate(Path.Home)
                        }}>
                <ArrowBackIosIcon/>
            </IconButton>
            <Grid sx={{height: "100%"}}/>
            {
                things.map((thing,index) =>{
                    return <NewThingCard thing={thing}/>
                })
            }
        </Box>

    )
}