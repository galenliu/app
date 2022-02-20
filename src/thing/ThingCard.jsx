import Card from '@mui/material/Card';
import { CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useState} from 'react';
import Box from "@mui/material/Box";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import IconButton from "@mui/material/IconButton";

export default function ThingCard(props) {

    const [power,setPower] = useState()

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: "column",
            margin: "0px 10px",
            justifyContent: "space-between",
            width: "120px",
            height: "120px"
        }}>
            <Box sx={{display: 'flex', flex: "70%", justifyContent: "space-around"}}>
                <CardMedia sx={{display: "flex", flex: "70%", justifyContent: "center", alignItems: "center"}}>
                    <LightbulbIcon sx={{}}/>
                </CardMedia>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <IconButton>
                        <PowerSettingsNewIcon sx={{color: "green"}}/>
                    </IconButton>
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
                    {props.title ? props.title : "Null"}
                </Typography>
                <Typography sx={{fontSize: 10, flex: "40%", color: !props.state ? "red" : "blue"}}
                            color="text.secondary" gutterBottom>
                    {props.state}
                </Typography>
            </Box>

        </Card>
    )

}