import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {useContext} from "react";
import {AppContext} from "../../App";
import useOnOffSwitch from "../../js/capability/use-on-off-switch";
import {ThingDialog} from "../../views/Dialog/ThingDialog";
import OnOffProperty from "../property/OnOffProperty";
import ThingCard from "../../views/Things/ThingCard";
import OnOffSwitchIcon from "../../static/images/thing-icons/on_off_switch";
import useThing from "../../js/capability/use-thing";
import useStringProperty from "../../js/property/use-string-property";
import ThingIcons from "../../static/images/thing-icons/thingIcons";

export default function ColorControl({description}) {
    const {t} = useTranslation();
    const {showThingId, showThing} = useContext(AppContext)

    const {
        thing
    } = useThing(description)

    const colorProperty = useStringProperty(thing, thing?.colorProperty)

    return (
        <>
            {description.id === showThingId &&
                <ThingDialog thing={thing} open={description.id === showThingId} onClose={() => showThing("")}>
                    {colorProperty &&
                        <OnOffProperty property={colorProperty}/>}
                </ThingDialog>}

            <ThingCard thing={thing}
                       onProperty={colorProperty}
                       icon={<ThingIcons selected={thing.selectedCapability}
                           sx={{color: colorProperty.value ? colorProperty.value : "grey.500", fontSize: 45}}/>} state={state}/>
        </>
    );
}
