import React, {useEffect, useState} from "react";
import {ListItem, ListItemIcon, ListItemText, Slider, withStyles} from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import {useDebounce} from 'use-debounce';
import {CirclePicker} from 'react-color';


export const useStyles = makeStyles((theme) => ({
    listItem: {
        width: " 100%",
    },
    colorButton: {
        borderRadius: 24,
        width: 48,
        height: 48,
    }
}));

const PrettoSlider = withStyles({
    root: {
        color: 'primary',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -2,
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
        height: 20,
        borderRadius: 4,
    },
    rail: {
        height: 20,
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
    const [value, setValue] = useState(props.value)
    const [v] = useDebounce(value, 1000);

    const style = {
        min: typeof props.detail.min === 'number' ? props.detail.min : 0,
        max: typeof props.detail.max === 'number' ? props.detail.max : 100,
        label: typeof props.detail.label === 'number' ? props.detail.label : "Property-default",
        step: typeof props.detail.step === 'number' ? props.detail.step : 1,
        disabled: typeof props.detail.readOnly === 'boolean' ? props.detail.readOnly : false,
    }

    useEffect(() => {
        if (props.doChange !== null && v !== undefined) {
            props.doChange({name: props.detail.name, value: v})
        }
    }, [v])

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    return (
        <ListItem className={classes.listItem}>
            <PrettoSlider  {...style}
                           valueLabelDisplay="auto"
                           value={value}
                           onChange={(e, value) => {
                               setValue(value)
                           }}
            />
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

export function ColorPropertyItem(props) {
    const classes = useStyles();
    const [color1, setColor1] = useState("#FF0000")
    const [color2, setColor2] = useState("#00FF00")
    const [color3, setColor3] = useState("#0000FF")
    const [color4, setColor4] = useState("#FF8247")
    const [color5, setColor5] = useState("#FFFF00")
    const [color6, setColor6] = useState("#32CD32")
    const [color7, setColor7] = useState("#9400D3")
    const [color8, setColor8] = useState("#AEEEEE")

    function handleChange(color) {
        props.doChange({name: props.detail.name, value: color.hex})
    }

    function onSwatchHover(color,event){
        console.log("color:",color,"event:",event)
    }

    return (
        <>
            <ListItem>
                <CirclePicker onChange={handleChange} style={{justify: "center", alignItems: "center"}} circleSize={48} onSwatchHover={onSwatchHover}
                              colors={[color1, color2, color3, color4, color5, color6, color7, color8]}/>
            </ListItem>
        </>
    )
}