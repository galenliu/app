import * as React from 'react';
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import OnOffProperty from "src/components/property/OnOffProperty";
import useOnOffSwitch from "src/js/capability/use-on-off-switch";
import ThingCard from "src/views/Things/ThingCard";
import OnOffSwitchIcon from "src/static/images/thing-icons/on_off_switch";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';;
import {styled} from '@mui/material/styles';
import {AppContext} from "../../App";
import {ThingDialog} from "src/views/Dialog/ThingDialog";

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

    const {
        thing, state, onProperty,
    } = useOnOffSwitch(description)

    return (
        <>
            {description.id === showThingId &&
                <ThingDialog thing={thing} open={description.id === showThingId} onClose={() => showThing("")}>
                    {onProperty &&
                        <OnOffProperty property={onProperty}/>}
                </ThingDialog>}

            <ThingCard thing={thing}
                       onProperty={onProperty}
                       icon={<OnOffSwitchIcon
                           sx={{color: onProperty.value ? "warning.main" : "grey.500", fontSize: 45}}/>} state={state}/>
        </>
    );
}


