import React, {useState} from "react";
import {ListItem, ListItemIcon, ListItemText, Slider, withStyles} from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
    listItem: {
        width: " 100%",
    }
}));

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);


export function BooleanPropertyListItem(props) {

    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <ListItem className={classes.listItem}>
            <ListItemText primary={t(props.label)}/>
            <ListItemIcon edg="end">
                <Switch disabled={props.disabled} checked={props.state} onClick={props.action}/>
            </ListItemIcon>
        </ListItem>
    )
}


export function NumberPropertyListItem(props) {
    const classes = useStyles();
    const {t} = useTranslation();
    const [value, setValue] = useState(0)

    function handleChanged(event, newValue) {
        if (newValue === undefined && newValue === null) {
            console.log("value err:", newValue)
            return
        }
        if (props.doChange !== null) {
            props.doChange({name: props.property.name, value: newValue})
        }
    }

    return (
        <ListItem className={classes.listItem}>
            <PrettoSlider disabled={props.convertedProperty.readOnly} defaultValue={value}
                          valueLabelDisplay="auto"
                          onChange={handleChanged}
                          step={1}
                          aria-labelledby="continuous-slider"/>
        </ListItem>

    )
}

export function StringPropertyItem(props) {

    const {t} = useTranslation();

    return (
        <>
            <ListItem style={{width: "100%"}}>
                <ListItemText primary={t(props.label)}/>

                <ListItemIcon edg="end">

                    <ListItemText primary={t(props.state)}/>

                </ListItemIcon>
            </ListItem>
        </>
    )
}