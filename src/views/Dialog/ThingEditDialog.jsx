import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import * as React from "react";
import ThingTitle from "../../static/images/thing-title";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import OnOffProperty from "../../components/property/OnOffProperty";
import BrightnessProperty from "../../components/property/BrightnessProperty";
import ColorProperty from "../../components/property/ColorProperty";
import ThingEdit from "../../static/images/thing-edit";


export const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const BootstrapDialogTitle = (props) => {
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


export const ThingEditDialog = (props) => {
    const {children, onClose, open, thing, ...other} = props;

    return (<BootstrapDialog
            onClose={() => close()}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={{}}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                <ThingEdit title={thing.title}/>
                <Typography variant="body2">
                    {thing.group_id}
                </Typography>
            </BootstrapDialogTitle>
            <Stack spacing={1} sx={{borderRadius: "3px", p: 1, width: 500}}>
                {children}
            </Stack>
        </BootstrapDialog>
    )
}
