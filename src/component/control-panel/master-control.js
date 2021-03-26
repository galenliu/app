import {Slider, withStyles} from "@material-ui/core";
import React from "react";

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


export function OnOffControl(props) {
    return
}


export function SliderControl(props) {

    return (
        <PrettoSlider  disabled={props.disabled} defaultValue={value}
                      valueLabelDisplay="auto"
                      step={1}
                      aria-labelledby="continuous-slider"/>
    )
}