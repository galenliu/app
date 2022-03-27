import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import OnOffProperty from "../property/OnOffProperty";
import List from "@mui/material/List";
import LevelProperty from "../property/LevelProperty";
import {useContext, useEffect} from "react";
import {useMultiLevelSwitch} from "../../js/capability/use-multi-level-switch";
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
import {BootstrapDialog, BootstrapDialogTitle} from "../../views/Dialog/ThingDialog";



export default function MultiLevelSwitch({description}) {
    const {t} = useTranslation();
    const {showThingId, showThing} = useContext(AppContext)

    useEffect(() => {
        //console.log("MultiLevelSwitch data:",description)
    })
    const {
        onProperty,
        thing,
        state,
        levelProperty,
    } = useMultiLevelSwitch(description)


    return (
        <>
            {description.id === showThingId &&
                <BootstrapDialog
                    onClose={() => showThing("")}
                    aria-labelledby="customized-dialog-title"
                    open={description.id === showThingId}
                    sx={{}}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={() => showThing("")}>
                        {description.title}
                    </BootstrapDialogTitle>
                    <Stack spacing={1} sx={{borderRadius: "3px", width: 500, height: "auto"}}>
                        {onProperty &&
                            <OnOffProperty property={onProperty}/>}
                        {levelProperty &&
                            <LevelProperty property={levelProperty}/>}
                    </Stack>
                </BootstrapDialog>}
            <ThingCard thing={thing} onProperty={onProperty} icon={<MultiLevelSwitchIcon sx={{fontSize: 45}}/>}
                       state={state}/>
        </>
    );
}

