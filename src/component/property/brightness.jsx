import React from "react";
import {Slider} from "@material-ui/core";

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

const BrightnessProperty = (props) => {

    const [state, setState] = React.useState(props.value)


    const handleChange = (event, newValue) => {
        if (state.value !== newValue) {
            setState({...state, value: newValue})
        }
    };

    return (
        <>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={props.value} />
            <div id={"property-item"} className={"property-brightness"}>
                {/*<Slider*/}
                {/*    value={state.value}*/}
                {/*    min={props.data.minimum}*/}
                {/*    step={1}*/}
                {/*    max={props.data.maximum}*/}
                {/*    onChange={handleChange}*/}
                {/*    valueLabelDisplay="auto"*/}
                {/*    aria-labelledby="non-linear-slider"*/}
                {/*/>*/}
            </div>
        </>
    )
}

export default BrightnessProperty
