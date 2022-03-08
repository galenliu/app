import Card from '@mui/material/Card';
import {CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import IconButton from "@mui/material/IconButton";
import useOnOffSwitch from "../../hooks/use-onOffSwitch";
import ThingIcons from "../../images/thing-icons/thingIcons";


export default function ThingCard(props) {

    const [on, setOn] = useOnOffSwitch(props.thing)

    useEffect(()=>{
        console.log("This is ThingCard")
    })

    return (
        <Card sx={{
            boxShadow: 3,
            display: 'flex',
            flexDirection: "column",
            margin: "10px 10px",
            justifyContent: "space-between",
            width: "120px",
            height: "120px",
            padding: "1ox"
        }}>
            <Box sx={{display: 'flex', flex: "70%", justifyContent: "space-around"}}>
                <Box sx={{display: "flex", flex: "70%", justifyContent: "center", alignItems: "center"}}>
                   <ThingIcons selected={props.thing.selectedCapability} sx={{fontSize:50,color: [on? "primary.on":"primary.off"]}}/>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    {props.thing.onProperty !== null && <IconButton onClick={() => (setOn())}>
                        <PowerSettingsNewIcon sx={{color: on? "green": "gray"}}/>
                    </IconButton>
                    }
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flex: "30%",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "start"
            }}>
                <Typography sx={{fontSize: 14, flex: "60%",}} color="text.main" gutterBottom>
                    {props.thing.title ? props.thing.title : "Null"}
                </Typography>
                <Typography sx={{fontSize: 10, flex: "40%", color: !props.state ? "red" : "blue"}}
                            color="text.secondary" gutterBottom>
                    {props.thing.state ? props.things.state : "Null"}
                </Typography>
            </Box>

        </Card>
    )

}