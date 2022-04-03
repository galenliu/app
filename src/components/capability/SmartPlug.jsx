import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {useContext, useEffect} from "react";
import {AppContext} from "../../App";
import {useLight} from "../../js/capability/use-light";
import {ThingDialog} from "../../views/Dialog/ThingDialog";
import OnOffProperty from "../property/OnOffProperty";
import ThingCard from "../../views/Things/ThingCard";
import useOnOffSwitch from "../../js/capability/use-on-off-switch";
import SmartPlugIcon from "../../static/images/thing-icons/smart_plug";

export default function SmartPlug({description}) {

    const {showThingId, showThing} = useContext(AppContext)
    const {
        thing,
        state,
        onProperty,
    } = useOnOffSwitch(description)

    function reader() {

        return (
            <>
                {description.id === showThingId &&
                    <ThingDialog thing={thing} open={description.id === showThingId} onClose={() => showThing("")}>
                        {onProperty?.property &&
                            <OnOffProperty property={onProperty}/>}
                    </ThingDialog>}
                <ThingCard thing={thing} onProperty={onProperty} icon={<SmartPlugIcon
                    sx={{fontSize: 45, color: onProperty.value ? "warning.main" : "grey.500"}}/>} state={state}/>
            </>
        )
    }

    return (
        <>
            {reader()}
        </>
    )
}