import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {useEffect} from "react";
import List from "@mui/material/List";
import OnOffProperty from "../property/OnOffProperty";
import useOnOffSwitch from "../../js/capability/use-on-off-switch";

export default function OnOffSwitch({description}) {
    const {t} = useTranslation();

    useEffect(() => {
        console.log("MultiLevelSwitch data:", description)
    })
    const {
        thing, onProperty
    } = useOnOffSwitch(description)

    return (
        <List spacing={2} sx={{borderRadius: "3px"}}>
            {onProperty &&
                <OnOffProperty property={onProperty}/>}
        </List>
    );
}


