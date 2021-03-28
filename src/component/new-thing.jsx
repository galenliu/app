import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import ThingIcons from "./icons";
import {Button, CircularProgress, MenuItem, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import FormHelperText from "@material-ui/core/FormHelperText"
import {useTranslation} from "react-i18next";
import Divider from "@material-ui/core/Divider";
import API from "../js/api";
import Typography from "@material-ui/core/Typography";


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
            console.log("add thing request:", data)
            if (data.id === thing.id) {
                setThing({...thing})
                setState(states.Saved)
            } else {
                setState(states.Fail)
                throw new Error("fail");
            }
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
            {thing.connected && <Button

                color="primary"
                disabled={true}
                className={classes.button} onClick={handleSave}
            >
                {t(states.Saved)}
            </Button>
            }
            {state === states.Fail && <Button
                color="secondary"
                disabled={true}
                className={classes.button} onClick={handleSave}
            >
                <Typography gutterBottom color="secondary">
                    {t(states.Fail)}
                </Typography>
            </Button>
            }
        </Card>
        <Divider/>

    </>
}
