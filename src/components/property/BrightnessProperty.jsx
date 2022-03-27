import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {ListItem, Slider, Stack, SvgIcon} from "@mui/material";
import {useEffect, useState} from "react";
import useDebouncy from "use-debouncy/lib/effect";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function BrightnessProperty({property}) {

    const detail = property.property.detail
    const {t} = useTranslation()
    const [value, setValue] = useState(property.value)

    useEffect(() => {
        property.setValue(value)
    }, [value])

    return (
        <Card sx={{
            boxShadow: 3,
            borderRadius: 3,
        }}>
            <Stack sx={{flexDirection: "column", width: "100%", m: "10px"}}>
                <Stack sx={{flexDirection: "column", width: "20%"}}>
                    <Typography variant="subtitle2">
                        {t(property.property.detail.label)}
                    </Typography>

                </Stack>
                <Stack direction={"row"}>
                    <Typography variant="h6" sx={{width: "20%", mb: 1}}>
                        {property.value}%
                    </Typography>
                    <Slider
                        sx={{ml: 1, width: "80%", mr: 1}}
                        aria-label="Default"
                        step={detail.step}
                        value={value}
                        min={detail.min}
                        max={detail.max}
                        valueLabelDisplay="auto"
                        onChange={(event, newValue) => {
                            setValue(newValue)
                        }}
                    />
                </Stack>

            </Stack>

        </Card>
    );
};

