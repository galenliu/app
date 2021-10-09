import {useTranslation} from "react-i18next";
import Card from "@mui/material/Card";
import {Button} from "@mui/material";
import Divider from "@mui/material/Divider";
import React from "react";
import {useStyles} from "../views/dialog/InstalledAddonsDialog";
import Addon from "./Addon";


export default function InstalledAddon(props) {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <>
            <Card className={classes.addonCard} elevation={5}>
                <Addon {...props}/>
                <div className={classes.sideContent}>
                    {!props.enabled && <Button style={{margin: 3}}
                                               variant="contained"
                                               color="primary">
                        {t("enable")}
                    </Button>}

                    {props.enabled && <Button style={{margin: 3}}
                                              variant="contained"
                                              color="primary">
                        {t("disable")}
                    </Button>}

                    {props.isUpdate && <Button style={{margin: 3}}
                                               variant="contained"
                                               color="primary">
                        {t("update")}
                    </Button>}

                    <Button onClick={() => props.config(props)} style={{margin: 3}}
                            variant="contained"
                            color="primary">
                        {t("configure")}
                    </Button>
                </div>
            </Card>
            <Divider/>
        </>
    )

}
