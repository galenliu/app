import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "../../i18n/en-us.json"
import Box from "@mui/material/Box";
import {useEffect} from "react";
import List from "@mui/material/List";
import OnOffProperty from "../property/OnOffProperty";
import LevelProperty from "../property/LevelProperty";
import useOnOffSwitch from "../../hooks/use-onOffSwitch";
import useProperty from "../../hooks/useProperty";

export default function OnOffSwitch(props) {
    const {t} = useTranslation();

    useEffect(() => {
        console.log("MultiLevelSwitch data:", props.thing)
    })
    const {
        onProperty,
    } = useOnOffSwitch(props.thing)

    return (
        <List spacing={2} sx={{borderRadius: "3px"}}>
            {onProperty.property &&
                <OnOffProperty property={onProperty}/>}
        </List>
    );
}


