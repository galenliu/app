import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "../../i18n/en-us.json"
import Box from "@mui/material/Box";
import {ListItem, Slider, Stack, SvgIcon} from "@mui/material";
import {useEffect, useState} from "react";
import useDebouncy from "use-debouncy/lib/effect";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function BrightnessProperty(props) {

    const {t} = useTranslation()
    const [value, setValue] = useState("");
    const {property} = props

    useDebouncy(
        () => property.setValue(value),
        800, // number of milliseconds to delay
        [value], // array values that the debounce depends (like as useEffect)
    );

    useEffect(() => {

    }, [])

    return (
        <Card sx={{
            width: "100%",
            borderRadius: 3,
        }}>
            <Stack sx={{flexDirection: "column", width: "100%", m: "10px"}}>
                <Stack sx={{flexDirection: "column", width: "20%"}}>
                    <Typography variant="subtitle2">
                        {t(property.detail.label)}
                    </Typography>

                </Stack>
                <Stack direction={"row"}>
                    <Typography variant="h6" sx={{ width: "20%",mb:1}} >
                        {property.value}%
                    </Typography>
                    <Slider
                        sx={{ml: 1, width: "80%", mr:1}}
                        defaultValue={property?.value}
                        aria-label="Default"
                        step={property.detail.step}
                        min={property.detail.min}
                        max={property.detail.max}

                        onChange={(event, newValue) => {
                            setValue(newValue)
                        }}
                    />
                </Stack>

            </Stack>

        </Card>
    );
};

export function BrightnessIcon(props) {
    return (
        <SvgIcon {...props}>
            <svg t="1647535407988" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="4483">
                <path
                    d="M512.1 801.5c-158.1 0-289.8-131.7-289.8-289.8S354 221.8 512.1 221.8s289.8 131.7 289.8 289.8-131.7 289.9-289.8 289.9z m0-52.7c131.7 0 237.1-105.4 237.1-237.1S643.9 274.5 512.1 274.5 275 379.9 275 511.7s105.4 237.1 237.1 237.1zM485.8 63.7h52.7v105.4h-52.7V63.7z m0 790.5h52.7v105.4h-52.7V854.2zM960 485.3V538H854.6v-52.7H960z m-790.4 0V538H64.2v-52.7h105.4z m642.9-310.9l36.9 36.9-73.8 73.8-36.9-36.9 73.8-73.8zM253.9 733l36.9 36.9-73.8 73.7-36.9-36.9 73.8-73.7z m595.5 79l-36.9 36.9-73.8-73.8 36.9-36.9 73.8 73.8zM290.8 253.4l-36.9 36.9-79-79 36.9-36.9 79 79z"
                    p-id="4484"></path>
            </svg>
        </SvgIcon>
    );
}