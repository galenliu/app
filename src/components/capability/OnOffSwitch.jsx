import * as React from 'react';
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import OnOffProperty from "src/components/property/OnOffProperty";
import useOnOffSwitch from "src/js/capability/use-on-off-switch";
import ThingCard from "src/views/Things/ThingCard";
import OnOffSwitchIcon from "src/static/images/thing-icons/on_off_switch";
import Thing from "src/schema-impl/capability/on-off-switch";
import {AppContext} from "../../App";
import {ThingDialog} from "src/views/Dialog/ThingDialog";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


export default function OnOffSwitch({description}) {
    const {t} = useTranslation();
    const {showThingId, showThing} = useContext(AppContext)

    const {
        thingModel,
        connected
    } = useOnOffSwitch(description)

    const thing = new Thing(thingModel,description,null)

    return (
        <>
            {/*{description.id === showThingId &&*/}
            {/*    <ThingDialog thing={thing} open={description.id === showThingId} onClose={() => showThing("")}>*/}
            {/*        {onProperty &&*/}
            {/*            <OnOffProperty property={onProperty}/>}*/}
            {/*    </ThingDialog>}*/}

            {/*<ThingCard thing={thing}*/}
            {/*           onProperty={onProperty}*/}
            {/*           icon={<OnOffSwitchIcon*/}
            {/*               sx={{color: onProperty.value ? "warning.main" : "grey.500", fontSize: 45}}/>} state={state}/>*/}
            <Box>
                <Typography>{thingModel.id}</Typography>

                <Typography>{thing.onProperty}</Typography>
                <Typography>{connected.toString()}</Typography>
            </Box>
        </>
    );
}


