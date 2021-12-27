import React, {useState} from "react";
import Card from "@mui/material/Card";
import {makeStyles} from "@mui/styles";
import ThingIcons from "./Icons";
import {Button, CircularProgress, MenuItem, Select} from "@mui/material";
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import FormHelperText from "@mui/material/FormHelperText"
import {useTranslation} from "react-i18next";
import Divider from "@mui/material/Divider"
import API from "../js/api";


const useStyles = makeStyles((theme) => ({
    newThingCard: {
        display: "flex",
        maxWidth: 360,
        minWidth: 360,
        margin: 10,
        alignItems: "center",
        justifyContent: "space-between",
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,

    },
    button: {
        margin: theme.spacing(1),
        minHigh: 50,
    },

    icon: {},
    content: {
        padding: 12,
        display: "flex",
        flexDirection: "column"
    }
}))

const states = {
    Save: "save",
    Processing: "processing",
    Saved: "saved",
    Fail: "fail",
}

export default function NewThing(props) {

    const {t} = useTranslation();

    const classes = useStyles();
    const [thing, setThing] = useState({...props.newThing, selectedCapability: props.newThing["@type"][0]})
    const [state, setState] = useState(states.Save)


    function capabilityItem() {
        let list = []
        for (const item of thing["@type"]) {
            list.push(<MenuItem value={item} key={item}>{t(item)}</MenuItem>)
        }
        return list
    }

    const handleChange = (event) => {
        let copy = thing
        copy.selectedCapability = event.target.value
        setThing({...copy});
    };

    const handleTitleChange = (event) => {
        let t = thing
        t.title = event.target.value
        console.log("event.target.value", event.target.value)
        setThing({...t});
    };

    const handleSave = () => {
        setState(states.Processing)
        API.addThing(thing).then((data) => {
            setState(states.Saved)
        }).catch((e) => {
            setState(states.Fail)
            console.error(e)
        })
    }

    return <>
        <Card className={classes.newThingCard} elevation={5}>
            <ThingIcons className={classes.icon} style={{fontSize: 60}}
                        type={thing.selectedCapability}/>
            <div className={classes.content}>
                <TextField disabled={state === states.Saved || state === states.Fail} id="standard-basic"
                           label={t("Title")} defaultValue={thing.title}
                           onChange={handleTitleChange}/>
                <FormControl className={classes.formControl}>
                    <FormHelperText>{t("SelectedCapability")}</FormHelperText>
                    <Select
                        disabled={state === states.Saved || state === states.Fail}
                        onChange={handleChange}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={thing.selectedCapability}
                    >
                        {capabilityItem()}
                    </Select>
                </FormControl>

            </div>
            {state === states.Save && <Button
                variant="contained"
                color="primary"
                className={classes.button} onClick={handleSave}
            >
                {t(state)}
            </Button>
            }
            {state === states.Processing && <CircularProgress/>

            }
            {state === states.Saved && <Button
                color="success"
                disabled={true}
                className={classes.button} onClick={handleSave}
            >
                {t(states.Saved)}
            </Button>
            }
            {state === states.Fail && <Button
                color="error"
                disabled={true}
                className={classes.button} onClick={handleSave}
            >
                {t(states.Fail)}
            </Button>
            }
        </Card>
        <Divider/>

    </>
}
