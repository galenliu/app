import Card from '@mui/material/Card';
import {CardMedia, createMuiTheme, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import IconButton from "@mui/material/IconButton";
import useOnOffSwitch from "../../hooks/use-onOffSwitch";
import ThingIcons from "../../images/thing-icons/thingIcons";
import {useNavigate} from "react-router-dom";
import useProperty from "../../hooks/useProperty";
import {makeStyles} from "@mui/styles";
import {useTranslation} from "react-i18next";
import enTrans from "../../i18n/en-us.json"
import useThings from "../../hooks/use-things";
import useThing from "../../hooks/use-thing";
import {spacing} from "@material-ui/system";
import * as theme from "@material-ui/system";

export default function ThingCard(props) {

    const {thing} = props
    const {t} = useTranslation();
    const navigate = useNavigate()
    // const [thing,setProperty] = useThing(props.thing.id)
    const {value: on, set: setOn} = useProperty(thing, thing.onProperty)
    const {value: level} = useProperty(thing, thing.brightnessProperty)
    const {value: color} = useProperty(thing, thing.colorProperty)
    const [state, setState] = useState()

    useEffect(() => {
        console.log("thing", thing)
        console.log("props", props)
        if (level !== undefined && on) {
            console.log("level", level)
            setState(level + "%")
            return
        }
        if (!on) {
            setState(t(enTrans.Off))
        } else {
            setState(t(enTrans.On))
        }
    }, [on, level])

    useEffect(() => {
        console.log("thing", thing)
        console.log("props", props)

    }, [])

    return (
        <Card onClick={() => {
            navigate(`/things/${props.thing.id}`)
        }}
              sx={{
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: "column",
                  margin: "10px 10px",
                  justifyContent: "space-between",
                  width: "120px",
                  height: "120px",
                  padding: "1ox",
                  backgroundColor: [on ? "rgba(255,255,255,1)" : "rgba(219,196,196,0.1)"],
              }}>
            <Box sx={{display: 'flex', flex: "70%", justifyContent: "space-around"}}>
                <Box sx={{display: "flex", flex: "70%", justifyContent: "center", alignItems: "center"}}>
                    {
                        color !== undefined && <ThingIcons selected={props.thing.selectedCapability}
                                                           sx={{fontSize: 50, color: [on ? color : "gray"]}}/>
                    }
                    {
                        color === undefined && <ThingIcons selected={props.thing.selectedCapability}
                                                           sx={{fontSize: 50, color: [on ? "#FF9502" : "#bfbfbf"]}}/>
                    }
                </Box>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    {props.thing.onProperty !== null && <IconButton onClick={(e) => {
                        e.stopPropagation();
                        setOn(!on)
                    }}>
                        <PowerSettingsNewIcon sx={{color: on ? "green" : "gray"}}/>
                    </IconButton>
                    }
                </Box>
            </Box>
            <Stack sx={{
                display: 'flex',
                ml: "2px",
                flex: "30%",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "start"
            }}>
                <Typography sx={{fontSize: 14, flex: "60%",}} color="text.main" gutterBottom>
                    {props.thing.title ? props.thing.title : "Null"}
                </Typography>
                <Typography sx={{fontSize: 10, flex: "40%"}}
                            color="text.secondary" gutterBottom>
                    {state}
                </Typography>
            </Stack>

        </Card>
    )

}