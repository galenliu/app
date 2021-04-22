import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import ThingIcons from "./icons";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    thingCard: {
        borderRadius: 12,
        display: 'flex',
        minWidth: 140,
        maxWidth: 140,
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

function useIconViewState(id) {
    const [state, setState] = useState()

    function Set() {

    }
}


export default function IconView({id, on, color, label, title, selectedCapability, handleOnOff}) {

    console.log("&&&&&&&&&&&&&&&&&on, color, label, title, selectedCapability:", on, color, label, title, selectedCapability)

    const {t} = useTranslation();
    const classes = useStyles()
    const [enable, setEnable] = useState(true)


    function handleClick(e) {
        e.stopPropagation()
        handleOnOff(id)
    }

    useEffect(() => {


    }, [])

    return (

        <Grid item className={classes.root}>
            <Card elevation={10} className={classes.thingCard} onClick={handleClick}>
                <div className={classes.cardTop}>
                    <ThingIcons type={selectedCapability}/>
                </div>
                <div className={classes.cardBot}>
                    <Typography variant={"body1"}>
                        {title}
                    </Typography>
                    <Typography t={2}>
                        {t(label)}
                    </Typography>
                </div>
            </Card>
        </Grid>
    )

}
