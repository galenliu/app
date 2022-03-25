import React, {useEffect, useState} from "react";
import Constants from "src/js/constants";


export default function useThings(gateway) {
    const [things, setThings] = useState([])

    const refreshThings = async (thingDescriptions, ground) => {
        try {
            let list = []
            if (things.size !== 0) {
                for (let [thingId, description] of thingDescriptions) {
                    if (description) {
                        list.push(description)
                    }
                }
            }
            setThings(list)
        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {

    }, [things])

    useEffect(() => {
        gateway.subscribe(Constants.REFRESH_THINGS, refreshThings, true)
        return () => {
            gateway.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }
    }, [])

    return [things]
}