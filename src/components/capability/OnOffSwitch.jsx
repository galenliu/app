import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {useEffect, useContext} from "react";
import List from "@mui/material/List";
import OnOffProperty from "../property/OnOffProperty";
import useOnOffSwitch from "../../js/capability/use-on-off-switch";
import {Stack} from "@mui/material";
import ThingCard from "../../views/Things/ThingCard";
import OnOffSwitchIcon from "../../static/images/thing-icons/on_off_switch";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {AppContext} from "../../App";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


export default function OnOffSwitch({description}) {
    const {t} = useTranslation();
    const {showThingId, showThing} = useContext(AppContext)
    useEffect(() => {
        // console.log("OnOffSwitch data:", description)
    })
    const {
        thing, state, onProperty,
    } = useOnOffSwitch(description)

    return (
        <>
            {description.id === showThingId &&
                <BootstrapDialog
                    onClose={()=>showThing("")}
                    aria-labelledby="customized-dialog-title"
                    open={description.id === showThingId}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={() => showThing("")}>
                        {description.title}
                    </BootstrapDialogTitle>

                    <Stack spacing={1} sx={{borderRadius: "3px",boxShadow: 3}}>

                        {/*{onProperty &&*/}
                        {/*    <OnOffProperty property={onProperty}/>}*/}
                        {/*{brightnessProperty &&*/}
                        {/*    <BrightnessProperty property={brightnessProperty}/>}*/}
                        {/*{colorProperty &&*/}
                        {/*    <ColorProperty property={colorProperty}/>}*/}
                    </Stack>
                </BootstrapDialog>}

            <ThingCard thing={thing} onProperty={onProperty}
                       icon={<OnOffSwitchIcon sx={{fontSize: 45}} state={state}/>}/>
        </>
    );
}


