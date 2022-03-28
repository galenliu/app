import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {Stack, SvgIcon} from "@mui/material";
import Typography from "@mui/material/Typography";

export function ThingEditIcon(props) {
    const {t} = useTranslation();
    return (
        <SvgIcon {...props}>
            <svg t="1648479345511" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="11350" >
                <path
                    d="M402.24 753.12l417.984-417.952a35.552 35.552 0 0 0 0-50.304l-75.424-75.424a35.552 35.552 0 0 0-50.304 0L276.576 627.392l-8.992 134.72 134.688-8.992zM193.664 801.92l13.76-205.92L644.192 159.168a106.656 106.656 0 0 1 150.848 0l75.424 75.424a106.656 106.656 0 0 1 0 150.848L433.632 822.304l-205.92 13.728A32 32 0 0 1 193.6 801.92zM644.224 259.744l-50.272 50.24 125.696 125.76 50.272-50.304-125.696-125.696z"
                    fill="#636363" p-id="11351"></path>
            </svg>
        </SvgIcon>
    );
};


export default function ThingEdit(props) {
    return (
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <ThingEditIcon {...props}/>
            <Typography variant={"inherit"}>
                {props.title}
            </Typography>
        </Stack>)
}