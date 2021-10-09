import React from "react";
import Slide from "@mui/material/Slide";
import {useStyles} from "../views/dialog/InstalledAddonsDialog";
import {useTranslation} from "react-i18next";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import StoreIcon from "@mui/icons-material/Store";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Dialog(props) {

    const classes = useStyles();
    const {t} = useTranslation();

    return (
        <Dialog fullScreen className={classes.root} open={props.open} onClose={() => {
            props.show(false);
            props.reload()
        }}
                TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <StoreIcon/>
                    <Typography variant="h6" className={classes.title}>
                        {t("AddonsMarket")}
                    </Typography>
                    <IconButton autoFocus color="inherit" onClick={() => {
                        props.show(false);
                        props.reload()
                    }} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.drawerHeader}/>

        </Dialog>
    )
}
