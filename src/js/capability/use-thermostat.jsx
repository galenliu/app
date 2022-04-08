import {useEffect, useState} from "react";
import React from "react";
import useBooleanProperty from "../property/use-boolean-property";
import useStringProperty from "../property/use-string-property";
import useIntegerProperty from "../property/use-integer-property";
import useOnOffSwitch from "./use-on-off-switch";
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import {gateway} from "../../main";
import useNumberProperty from "../property/use-number-property";
import useThing from "./use-thing";
import Thermostat from "../../schema-impl/capability/thermostat";
import useProperty from "../property/use-property";


export function useThermostat(description) {

    const {t} = useTranslation();
    const {thingModel, connected} = useThing(description)

    const [state, setState] = useState("")
    //description新建一个OnOffSwitch类
    const thing = new Thermostat(thingModel, description, null)


    const temperatureProperty = useProperty(thing, thing?.temperatureProperty)

    const heatingCoolingProperty = useProperty(thing, thing?.heatingCoolingProperty)
    const thermostatModeProperty = useProperty(thing, thing?.thermostatModeProperty)

    const heatingTargetTemperatureProperty = useProperty(thing, thing?.heatingTargetTemperatureProperty)
    const coolingTargetTemperatureProperty = useProperty(thing, thing?.coolingTargetTemperatureProperty)


    useEffect(() => {

    }, [])

    useEffect(() => {
        if (!connected) {
            setState(t(enTrans.Disconnected))
        } else {
            if (thermostatModeProperty.value === "cool") {
                setState(t(`正在调低至 ${coolingTargetTemperatureProperty.value}` + "℃"))

            } else if (thermostatModeProperty.value === "heat") {
                setState(t(`正在调高至 ${heatingTargetTemperatureProperty.value}` + "℃"))
            } else if (thermostatModeProperty.value === "off") {
                setState(t("off"))
            }else if(thermostatModeProperty.value === "auto"){
                setState(t(`温度保持在 ${coolingTargetTemperatureProperty.value}-${heatingTargetTemperatureProperty.value}` + "℃"))
            }else {
                setState(t(thermostatModeProperty.value))
            }
        }
    }, [thermostatModeProperty.value, thing.connected, heatingTargetTemperatureProperty.value, coolingTargetTemperatureProperty.value])

    return {
        thing: {connected: connected, title: thing.title, id: thing.id, state: state},
        temperatureProperty,
        thermostatModeProperty,
        heatingTargetTemperatureProperty,
        heatingCoolingProperty,
        coolingTargetTemperatureProperty,
    }
}