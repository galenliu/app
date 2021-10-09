import {useTranslation} from "react-i18next";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import StoreIcon from "@mui/icons-material/Store";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import React from "react";
import {useStyles} from "./InstalledAddonsDialog";
import NewAddon from "../../components/NewAddon";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FetchAddonsDialog(props) {

    const classes = useStyles();
    const {t} = useTranslation();

    const availableAddons = props.availableAddons

    function renderAvailableAddons() {
        if (!availableAddons) {
            return
        }
        const list = []
        for (const [id, addon] of availableAddons) {
            if (availableAddons.has(id)) {
                const a = <NewAddon key={addon.id}  {...addon}

                />
                list.push(a)
            }

        }
        return list
    }


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
            <Grid className={classes.content} container justify="flex-start" alignItems="center" direction="column">
                {renderAvailableAddons()}
            </Grid>
        </Dialog>
    )

}
