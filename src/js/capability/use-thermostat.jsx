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


export function useThermostat(description) {

    const {t} = useTranslation();
    const thing = useThing(description)
    const [state, setState] = useState("")

    const temperatureProperty = useNumberProperty(thing, thing?.temperatureProperty)

    const heatingCoolingProperty = useStringProperty(thing, thing?.heatingCoolingProperty)
    const thermostatModeProperty = useStringProperty(thing, thing?.thermostatModeProperty)

    const heatingTargetTemperatureProperty = useNumberProperty(thing, thing?.heatingTargetTemperatureProperty)
    const coolingTargetTemperatureProperty = useNumberProperty(thing, thing?.coolingTargetTemperatureProperty)


    useEffect(() => {

    }, [])

    useEffect(() => {
        if (!thing.connected) {
            setState(t(enTrans.Disconnected))
        } else {
            if (thermostatModeProperty.value === "cool") {
                setState(t(`正在调低至 ${coolingTargetTemperatureProperty.value}` + "℃"))

            } else if (thermostatModeProperty.value === "heat") {
                setState(t(`正在调高至 ${heatingTargetTemperatureProperty.value}` + "℃"))
            }else if (thermostatModeProperty.value === "off") {
                setState(t("off"))
            }
        }
    }, [thermostatModeProperty.value, thing.connected,heatingTargetTemperatureProperty.value,coolingTargetTemperatureProperty.value])

    return {
        thing,
        state,
        temperatureProperty,
        thermostatModeProperty,
        heatingTargetTemperatureProperty,
        heatingCoolingProperty,
        coolingTargetTemperatureProperty,
    }
}