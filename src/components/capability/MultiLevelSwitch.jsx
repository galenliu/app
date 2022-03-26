import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import OnOffProperty from "../property/OnOffProperty";
import List from "@mui/material/List";
import LevelProperty from "../property/LevelProperty";
import {useEffect} from "react";
import {useMultiLevelSwitch} from "../../js/capability/use-multi-level-switch";

export default function MultiLevelSwitch({description}) {
    const {t} = useTranslation();

    useEffect(()=>{
        console.log("MultiLevelSwitch data:",description)
    })
    const {
        onProperty,
        levelProperty,
    } = useMultiLevelSwitch(description)

    return (
        <List spacing={2} sx={{borderRadius: "3px"}}>
            {onProperty.property &&
                <OnOffProperty property={onProperty}/>}
            {levelProperty?.property &&
                <LevelProperty property={levelProperty}/>}
        </List>
    );
}

