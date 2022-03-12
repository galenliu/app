import React, {useEffect, useState} from "react";
import Constants from "../constants";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";


export default function useThings(gateway) {
    const [things, setThings] = useState([])

    function getThing(thingId) {
        for (const thing of things) {
            if (thing.id === thingId) {
                return thing
            }
        }
    }

    const refreshThings = (ts, ground) => {

        // let thing;
        // while (typeof (thing = things.pop()) !== 'undefined') {
        //     thing.cleanup();
        // }

        try {
            let array = []
            if (ts.size !== 0) {
                ts.forEach((description, thingId) => {
                    gateway.getThingModel(thingId).then((thingModel) => {
                        array.push(createThingFromCapability(description.selectedCapability, thingModel, description))
                    });
                });
                setThings([...array])
            }

        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {
        console.log("things:", things)
    }, [things])

    useEffect(() => {
        gateway.subscribe(Constants.REFRESH_THINGS, refreshThings, true)
        return () => {
            gateway.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }
    }, [])

    return [things, getThing]
}