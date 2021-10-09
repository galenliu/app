import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import API from "../../js/api";
import ErrorIcon from "@mui/icons-material/Error";
import Card from "@mui/material/Card";
import Form from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ExtensionIcon from "@mui/icons-material/Extension";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import {useStyles} from "./InstalledAddonsDialog";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddonConfigDialog(props) {

    const classes = useStyles();
    const {t} = useTranslation();
    const [config, setConfig] = useState({})

    function fetchAddonConfig() {
        try {
            API.getAddonConfig(props.id).then((conf) => {
                setConfig(conf)
                console.log("config------", conf)
            })
        } catch (e) {
            console.log(e)
        }
    }

    function handleUpdateConfig(data) {
        API.setAddonConfig(props.id, data.formData).then((config) => {
            console.log("saved config:", config)
        }).catch((e) => {
            console.log(e)
        })
    }

    function renderConfigView() {
        if (config === null || props.schema === null) {
            return <ErrorIcon/>
        }

        return <Card elevation={20} className={classes.configCard}>
            <Form
                formData={config}
                onSubmit={handleUpdateConfig}
                className={classes.configForm}
                schema={props.schema}/></Card>


    }

    useEffect(() => {
        renderConfigView()
    }, [config])


    useEffect(() => {
        if (props.open) {
            fetchAddonConfig()
        }
    }, [props.open])

    return (
        <Dialog fullScreen className={classes.root} open={props.open} onClose={() => {
            props.show(false);
        }}
                TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <ExtensionIcon/>
                    <Typography variant="h5" className={classes.title}>{t("Add-on Configure")}
                    </Typography>
                    <IconButton autoFocus color="inherit" onClick={() => {
                        props.show(false);
                    }} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.drawerHeader}/>
            <Grid className={classes.content} container justify="flex-start" alignItems="center" direction="column">
                {renderConfigView()}
            </Grid>
        </Dialog>
    )
}
