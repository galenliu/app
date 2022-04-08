import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import OnOffProperty from "../property/OnOffProperty";
import LevelProperty from "../property/LevelProperty";
import {useContext, useEffect} from "react";
import {useMultiLevelSwitch} from "src/js/capability/use-multi-level-switch";
import {Stack} from "@mui/material";
import ThingCard from "src/views/Things/ThingCard";
import MultiLevelSwitchIcon from "src/static/images/thing-icons/multi_level_switch";
import {AppContext} from "../../App";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import {ThingDialog} from "src/views/Dialog/ThingDialog";


export default function MultiLevelSwitch({description}) {
    const {t} = useTranslation();
    const {showThingId, showThing} = useContext(AppContext)

    useEffect(() => {
        //console.log("MultiLevelSwitch data:",description)
    })
    const {
        onProperty,
        thing,
        levelProperty,
    } = useMultiLevelSwitch(description)


    return (
        <>
            {description.id === showThingId &&
                <ThingDialog thing={thing} open={description.id === showThingId} onClose={() => showThing("")}>
                    {onProperty &&
                        <OnOffProperty property={onProperty}/>}
                    {levelProperty &&
                        <LevelProperty property={levelProperty}/>}
                </ThingDialog>}
            <ThingCard thing={thing} onProperty={onProperty} icon={<MultiLevelSwitchIcon
                sx={{color: onProperty.value? "warning.main" : "grey.500", fontSize: 45}}/>}/>
        </>
    );
}

