import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "../../i18n/en-us.json"
import useOnOffSwitch from "../../hooks/use-onOffSwitch";
import useProperty from "../../hooks/useProperty";
import OnOffProperty from "../property/OnOffProperty";
import List from "@mui/material/List";
import LevelProperty from "../property/LevelProperty";
import {useEffect} from "react";

export default function MultiLevelSwitch({description}) {
    const {t} = useTranslation();

    useEffect(()=>{
        console.log("MultiLevelSwitch data:",description)
    })
    const {
        onProperty,
        levelProperty,
    } = useMultiLevelSwitch(description={description})

    return (
        <List spacing={2} sx={{borderRadius: "3px"}}>
            {onProperty.property &&
                <OnOffProperty property={onProperty}/>}
            {levelProperty?.property &&
                <LevelProperty property={levelProperty}/>}
        </List>
    );
}


export function useMultiLevelSwitch({description}) {

    const {thing,onProperty} = useOnOffSwitch(description={description})
    const levelProperty = useProperty(thing, thing?.levelProperty)

    useEffect(() => {
        console.log("useMultiLevelSwitch:", thing)
    }, [])
    return {onProperty, levelProperty}
}