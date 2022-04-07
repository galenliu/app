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
import {PropertyCardState, PropertyCardTitle} from "../typography";

export default function HeatingCoolingProperty({property}) {

    const {t} = useTranslation()
    const [value,setValue]=useState(property.value)

    const detail = property.detail || {}

    useEffect(()=>{
        setValue(value)
    },[property])


    return (
        <PropertyCard>
            <Stack sx={{width: "100%", m: 2}}>
                <Stack sx={{flexDirection: "column"}}>
                    <PropertyCardTitle>
                        {t(detail?.label)}
                    </PropertyCardTitle>
                </Stack>
                <Stack sx={{flexDirection: "row", alignItems:"center"}}>
                    <PropertyCardState>
                        {t(value)}
                    </PropertyCardState>
                </Stack>
            </Stack>

        </PropertyCard>
    );
};