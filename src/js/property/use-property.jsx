import React, {useEffect, useState} from "react";
import Constants from "src/js/constants";
import useDebouncy from "use-debouncy/lib/effect";
import {gateway} from "../../main";


export default function useProperty(thing, name, debounce) {


    //获取Property的Value，Value的存取位置： gateway.thingModel[:thingId].properties[name]
    //const property = thing.displayedProperties[name] || {}
    const [debounceValue, setValue] = useState()
    const [value, update] = useState()
    const property = thing?.displayedProperties[name] || {}

    useEffect(()=>{
        console.log("###thing",thing)
    })
    //去抖动
    useDebouncy(
        () => setProperty(debounceValue), // function debounce
        debounce ? debounce : 400, // number of milliseconds to delay
        [debounceValue], // array values that the debounce depends (like as useEffect)
    );

    useEffect(() => {
        if (gateway.properties.has(thing.id)) {
            const props = gateway.properties.get(thing.id)
            if (props) {
                const value = props[name]
                if (value !== undefined) {
                    update(value)
                }
            }
        }
    },)

    function handler(data) {
        if (name !== null && data !== {}) {
            for (let n in data) {
                if (n === name) {
                    update(data[n])
                }
            }
        }
    }

    useEffect(() => {

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

    return {
        property: {
            min: property.detail.min || null,
            max: property.detail.max || null,
            title: property.detail.label,
            label: property.detail.label,
            multipleOf: property.detail.step || null
        },
        value: value,
        setValue: setValue
    }
}

