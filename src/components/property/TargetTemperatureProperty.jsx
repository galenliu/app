import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {ListItem, Slider, Stack, SvgIcon} from "@mui/material";
import {useEffect, useState} from "react";
import useDebouncy from "use-debouncy/lib/effect";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Circle} from "@uiw/react-color";
import PropertyCard from "./PropertyCard";
import CircularSlider from '@fseehawer/react-circular-slider';
import {PropertyCardState, PropertyCardTitle} from "../typography";

function valuetext(value) {
    return `${value}°C`;
}

export default function TargetTemperatureProperty({property}) {


    const {t} = useTranslation()
    const [value, setValue] = useState(property.value)
    const detail = property.detail


    useEffect(() => {
        property.setValue(value)
    }, [value])

    return (
        <PropertyCard>
            <Stack sx={{width: "100%", m: 1.5}}>
                <Stack sx={{flexDirection: "column"}}>
                    <PropertyCardTitle  >
                        {t(detail?.label)}
                    </PropertyCardTitle>
                </Stack>
                <Stack sx={{flexDirection: "row", alignItems: "center"}}>
                    <PropertyCardState>
                        {property.value}℃
                    </PropertyCardState>
                    <Slider
                        sx={{mx: 5, width: "80%", mr: 4}}
                        defaultValue={100}
                        value={value}
                        aria-label="Default"
                        step={detail.step || 0.5}
                        min={detail.min || 0}
                        max={detail.max || 38}
                        valueLabelDisplay="auto"
                        onChange={(event, newValue) => {
                            setValue(newValue)
                        }}
                    />
                </Stack>
            </Stack>

        </PropertyCard>
    );
};


export function TargetTemperatureAutoProperty({heating, cooling}) {

    const detail = cooling.detail
    const {t} = useTranslation()
    const [value, setValue] = useState([cooling.value, heating.value])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        console.log("heating:", heating)
    })


    return (
        <PropertyCard>
            <Stack sx={{width: "100%", m: 1.5}}>
                <Stack sx={{flexDirection: "column"}}>
                    <PropertyCardTitle>
                        {t("Temperature range")}
                    </PropertyCardTitle>
                </Stack>
                <Stack sx={{flexDirection: "row", alignItems: "center"}}>
                    <PropertyCardState sx={{width:0.30}}>
                        {value[0]}-{value[1]}℃
                    </PropertyCardState>
                    <Slider
                        sx={{mx: 5, width: 0.70, mr:4}}
                        value={value}
                        step={0.5}
                        min={detail?.min || 0}
                        max={detail?.max || 38}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        onChange={handleChange}
                    />
                </Stack>
            </Stack>

        </PropertyCard>
    );
};