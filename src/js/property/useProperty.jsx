import React, {useEffect, useState} from "react";
import Constants from "../../constants";
import useDebouncy from "use-debouncy/lib/effect";


export default function useProperty(thing, name) {
    if(!thing || !name){
        return null
    }
    //获取Property的Value，Value的存取位置： gateway.thingModel[:thingId].properties[name]
    console.log("1111111111111111",thing)
    const property = thing?.displayedProperties[name] || {}
    const [debounceValue, setValue] = useState()
    const [value, set] = useState(thing.model?.properties[name])



    //去抖动
    useDebouncy(
        () => setProperty(debounceValue), // function debounce
        400, // number of milliseconds to delay
        [debounceValue], // array values that the debounce depends (like as useEffect)
    );

    useEffect(() => {
        function handler(data) {
            if (Object.keys(data).length === 0) {
                return
            }
            for (let n in data) {
                if (n === name) {
                    set(data[n])
                }
            }
        }

        if (thing) {
            thing.model?.subscribe(Constants.PROPERTY_STATUS, handler)
        }

        return (() => {
            if (thing) {
                thing.model?.unsubscribe(Constants.PROPERTY_STATUS, handler)
            }
        })
    })

    function setProperty(value) {
        thing?.model?.setProperty(name, value)
    }

    return {...property, value: value, setValue: setValue}
}

