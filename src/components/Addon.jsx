import {useTranslation} from "react-i18next";
import {AddonIcons} from "./Icons";
import {FormHelperText, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import {useStyles} from "../views/dialog/InstalledAddonsDialog";

export default function Addon(props) {
    const classes = useStyles();
    const {t} = useTranslation();
    return <>
        <AddonIcons style={{fontSize: 80}} color={"primary"} type={props.primary_type}/>
        <div className={classes.cardContent}>
            <FormHelperText>{t("name")}: </FormHelperText>
            <Typography variant="h5">
                {props.name}
            </Typography>
            <FormHelperText>{t("id")}: </FormHelperText>
            <Typography variant="subtitle1">
                {props.id}
            </Typography>
            <div style={{
                display: "flex",
                "flexDirection": "row",
                "justifyContent": "flex-start",
                "alignItems": "center"
            }}>
                <FormHelperText>{t("version")}: </FormHelperText>
                <Typography variant="body1">
                    {props.version}
                </Typography>
            </div>
            <div style={{
                display: "flex",
                "flexDirection": "row",
                "justifyContent": "flex-start",
                "alignItems": "center"
            }}>
                <FormHelperText>{t("author")}: </FormHelperText>

                <Link href={props.homepage_url}>
                    {props.author}
                </Link>
            </div>
            <div style={{display: "flex", "flexDirection": "row"}}>
                <Link href={props.license_url}>
                    {t("license")}
                </Link>
            </div>
        </div>
    </>
}

