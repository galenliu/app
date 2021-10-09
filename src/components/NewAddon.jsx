import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import API from "../js/api";
import Card from "@mui/material/Card";
import {Button, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {useStyles} from "../views/dialog/InstalledAddonsDialog";
import Addon from "./Addon";


export default function NewAddon(props) {

    const classes = useStyles();
    const {t} = useTranslation();


    const states = {
        install: "install",
        installed: "installed",
        pending: "pending",
        failed: "failed",
    }
    const [state, setState] = useState()

    useEffect(() => {
        if (props.installed) {
            setState(states.installed)
        } else {
            setState(states.install)
        }
    }, [])


    const handleInstallAddon = () => {
        setState(states.pending)
        console.log("install args:", props.id, props.url, props.checksum)
        API.installAddon(props.id, props.url, props.checksum).then((req) => {
            console.log("install addon OK", req)
            setState(states.installed)
        }).catch((e) => {
            setState(states.failed)
            console.error(e)
        })
    }


    return (
        <>
            <Card className={classes.addonCard} elevation={10}>
                <Addon {...props} />
                <div className={classes.sideContent}>
                    {state === states.install && <Button
                        onClick={() => {
                            handleInstallAddon()
                        }}
                        variant="contained"
                        color="primary">
                        {t("install")}
                    </Button>
                    }
                    {state === states.installed && <Button
                        variant="contained"
                        disabled={true}
                        color="primary">
                        {t("installed")}
                    </Button>
                    }
                    {state === states.pending && <CircularProgress/>}
                    {
                        state === states.failed && <Button color="secondary" disabled={true} className={classes.button}>
                            <Typography gutterBottom color="secondary">
                                {t(states.failed)}
                            </Typography></Button>}
                </div>
            </Card>
            <Divider/>
        </>
    )

}

