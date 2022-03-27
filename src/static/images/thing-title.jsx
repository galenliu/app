import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {Stack, SvgIcon} from "@mui/material";
import Typography from "@mui/material/Typography";

export function ThingTitleIcon(props) {
    const {t} = useTranslation();
    return (
        <SvgIcon {...props}>
            <svg t="1648409447487" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="10216">
                <path
                    d="M880.825 987.182c0.621 2.073 0.898 4.192 0.944 6.333h-53.706l-316.385-314.843-316.385 314.843h-53.728c0.047-2.371 0.323-4.721 1.082-6.977-6.54-7.968-10.639-18.009-10.639-29.11v-667.867c0-25.449 20.611-46.060 46.060-46.060h667.867c25.449 0 46.060 20.611 46.060 46.060v667.867c0 11.399-4.307 21.694-11.169 29.754zM845.934 312.59c0-12.713-10.318-23.029-23.029-23.029h-621.807c-12.713 0-23.029 10.318-23.029 23.029v635.095l317.791-316.246c8.726-8.683 22.891-8.683 31.644 0l318.434 316.891v-635.74zM845.934 197.441h-667.867c-25.449 0-46.060-20.611-46.060-46.060v-69.089c0-25.449 20.611-46.060 46.060-46.060h667.867c25.449 0 46.060 20.611 46.060 46.060v69.089c0 25.449-20.611 46.060-46.060 46.060zM845.934 105.321c0-12.713-10.318-23.029-23.029-23.029h-621.807c-12.713 0-23.029 10.318-23.029 23.029v23.029c0 12.713 10.318 23.029 23.029 23.029h621.807c12.713 0 23.029-10.318 23.029-23.029v-23.029z"
                    p-id="10217"></path>
            </svg>
        </SvgIcon>
    );
};


export default function ThingTitle(props) {
    return (
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <ThingTitleIcon {...props}/>
            <Typography variant={"inherit"}>
                {props.title}
            </Typography>
        </Stack>)
}