import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "../../i18n/en-us.json"
import Box from "@mui/material/Box";
import {ListItem, Slider, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import useDebouncy from "use-debouncy/lib/effect";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function LevelProperty(props) {

    const {t} = useTranslation()
    const [value, setValue] = useState("");
    const {property} = props

    useDebouncy(
        () => property.setValue(value),
        800, // number of milliseconds to delay
        [value], // array values that the debounce depends (like as useEffect)
    );

    useEffect(() => {
        console.log("LevelProperty:",property)
    }, [])

    return (
        <Card sx={{
            width: "100%",
            borderRadius: "20px",
            backgroundColor: [property.value ? "background.on" : "background.off"]
        }}>
            <Stack sx={{flexDirection: "row", width: "100%", m:"10px"}}>
                <Stack sx={{flexDirection: "column",width:"20%"}}>
                    <Typography variant="subtitle1">
                        {t(property.detail.label)}
                    </Typography>
                    <Typography variant="h5">
                        {property.value}%
                    </Typography>
                </Stack>

                <Slider
                    sx={{mx:"20px", width:"80%",mr:"3%"}}
                    defaultValue={70}
                    aria-label="Default"
                    step={property.detail.step}
                    min={property.detail.min}
                    max={property.detail.max}
                    valueLabelDisplay="auto"
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                />

            </Stack>

        </Card>
    );
};