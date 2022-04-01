import * as React from 'react';
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import OnOffProperty from "src/components/property/OnOffProperty";
import useOnOffSwitch from "src/js/capability/use-on-off-switch";
import ThingCard from "src/views/Things/ThingCard";
import OnOffSwitchIcon from "src/static/images/thing-icons/on_off_switch";
import {AppContext} from "../../App";
import {ThingDialog} from "src/views/Dialog/ThingDialog";


export default function OnOffSwitch({description}) {
    const {t} = useTranslation();
    const {showThingId, showThing} = useContext(AppContext)

    const {
        thing, state, onProperty,
    } = useOnOffSwitch(description)

    return (
        <>
            {description.id === showThingId &&
                <ThingDialog thing={thing} open={description.id === showThingId} onClose={() => showThing("")}>
                    {onProperty &&
                        <OnOffProperty property={onProperty}/>}
                </ThingDialog>}

            <ThingCard thing={thing}
                       onProperty={onProperty}
                       icon={<OnOffSwitchIcon
                           sx={{color: onProperty.value ? "warning.main" : "grey.500", fontSize: 45}}/>} state={state}/>
        </>
    );
}


