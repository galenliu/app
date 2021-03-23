import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import ThingIcons, {ActionsIcon} from "./icons";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    thingCard: {
        borderRadius: 12,
        display: 'flex',
        minWidth: 160,
        maxWidth: 160,
        justifyContent: "space-between",
        flexDirection: "column",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTop: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5,
        marginRight: 5,
        alignItems: "flex-start",
        justifyContent: 'space-between',
    },
    cardBot: {
        display: "flex",
        marginLeft: 4,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: 'space-between',
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}))

export default function IconView(props) {

    const {t} = useTranslation();

    const classes = useStyles()
    console.log("props.selectedCapability_____", props.selectedCapability)
    return (
        <Grid item className={classes.root}>
            <Card elevation={10} className={classes.thingCard} onClick={()=>props.click(props.id)}>
                <div className={classes.cardTop}>
                    <ThingIcons type={props.iconType}/>
                    <ActionsIcon type={props.selectedCapability}/>
                </div>
                <div className={classes.cardBot}>
                    <Typography variant={"body1"}>
                        {props.title}
                    </Typography>
                    <Typography t={2}>
                        {t(props.iconViewLabel)}
                    </Typography>
                </div>
            </Card>
        </Grid>
    )

}
