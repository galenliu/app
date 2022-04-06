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

            <Stack sx={{width: "100%", m: 2}}>
                <Stack sx={{flexDirection: "column"}}>
                    <Typography variant="subtitle1">
                        {t(detail?.label)}
                    </Typography>
                </Stack>
                <Stack sx={{flexDirection: "row", alignItems: "center"}}>
                    <Typography variant="h5">
                        {property.value}℃
                    </Typography>
                    <Slider
                        sx={{mx: 5, width: "80%", mr: 4}}
                        defaultValue={100}
                        value={value}
                        aria-label="Default"
                        step={detail.step || 1}
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

            <Stack sx={{width: "100%", m: 2}}>
                <Stack sx={{flexDirection: "column"}}>
                    <Typography variant="subtitle1">
                        {t("Temperature range")}
                    </Typography>
                </Stack>
                <Stack sx={{flexDirection: "row", alignItems: "center"}}>
                    <Typography variant="h5">
                        {value[0]}-{value[1]}℃
                    </Typography>
                    <Slider
                        sx={{mx: 5, width: "80%", mr: 4}}
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        aria-label="Default"
                        // step={detail?.step}
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