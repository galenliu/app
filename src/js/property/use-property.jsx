import React, {useEffect, useState} from "react";
import Constants from "src/js/constants";
import useDebouncy from "use-debouncy/lib/effect";
import {gateway} from "../../main";


export default function useProperty(model, property, debounce) {


    //获取Property的Value，Value的存取位置： gateway.thingModel[:thingId].properties[name]
    const [debounceValue, setValue] = useState()
    const [value, update] = useState()

    if (!property || !model) {
        return null
    }

    const name = property.detail.name

    //去抖动
    useDebouncy(
        () => setProperty(debounceValue), // function debounce
        debounce ? debounce : 400, // number of milliseconds to delay
        [debounceValue], // array values that the debounce depends (like as useEffect)
    );

    useEffect(() => {
        if (gateway.properties.has(model.id)) {
            const props = gateway.properties.get(model.id)
            if (props) {
                const value = props[name]
                if (value !== undefined) {
                    update(value)
                }
            }
        }
    })

    function updateProperty(data) {
        if (name !== null && data !== {}) {
            for (let n in data) {
                if (n === name) {
                    update(data[n])
                }
            }
        }
    }

    useEffect(() => {
        if (model) {
            model?.subscribe(Constants.PROPERTY_STATUS, updateProperty)
        }
        return (() => {
            if (model) {
                model?.unsubscribe(Constants.PROPERTY_STATUS, updateProperty)
            }
        })
    }, [model])

    function setProperty(value) {
        model?.setProperty(name, value)
    }

    return {
        name: property.name,
        min: property.detail?.min || null,
        max: property.detail?.max || null,
        title: property.detail?.title || "",
        label: property.detail?.label || "",
        step: property.detail?.step || null,
        choices: property.detail?.choices || [],
        value: value,
        setValue: setValue
    }
}

