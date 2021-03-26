import React from "react";
import {OnOffControl, SliderControl} from "./master-control";
import ThingIcons from "../icons";
import {Card} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    listItem: {
        width: " 100%",
    }
}));


export function LightControlPanel(props) {
    const classes = useStyles();

    return (
        <Card>

            {props.brightnessProperty !== null && <SliderControl iconOn={<ThingIcons type="Light" state={"off"}/>}
                                                                 iconOff={<ThingIcons state="on"/>}/>}

            {props.brightnessProperty === null && <OnOffControl iconOn={<ThingIcons type="Light" state={"off"}/>}
                                                                iconOff={<ThingIcons state="on"/>}/>}

        </Card>

    )

}