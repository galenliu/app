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
                <Stack sx={{flexDirection: "row", alignItems:"center"}}>
                    <Typography variant="h5">
                        {property.value}℃
                    </Typography>
                    <Slider
                        sx={{mx: 5, width: "80%", mr: 4}}
                        defaultValue={100}
                        value={value}
                        aria-label="Default"
                        step={detail?.step}
                        min={detail?.min}
                        max={detail?.max}
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