import {PropertyType} from "../../js/constants";
import BrightnessProperty from "./BrightnessProperty";
import React from "react";
import useProperty from "../../js/property/use-property";
import ColorProperty from "./ColorProperty";
import ColorModeProperty from "./ColorModeProperty";
import ColorTemperatureProperty from "./ColorTemperatureProperty";
import LevelProperty from "./LevelProperty";
import OnOffSwitch from "../capability/OnOffSwitch";
import OnOffProperty from "./OnOffProperty";
import TargetTemperatureProperty from "./TargetTemperatureProperty";
import TemperatureProperty from "./TemperatureProperty";


export default function Property({model, description}) {

    const property = useProperty(model, description)

    switch (property["@type"]) {
        case PropertyType.AlarmProperty:
        case PropertyType.BarometricPressureProperty:
        case PropertyType.BooleanProperty:
        case PropertyType.BrightnessProperty:
            return <BrightnessProperty property={property}/>
        case PropertyType.ColorModeProperty:
            return <ColorModeProperty property={property}/>
        case PropertyType.ColorProperty:
            return <ColorProperty property={property}/>
        case PropertyType.ColorTemperatureProperty:
            return <ColorTemperatureProperty property={property}/>
        case PropertyType.ConcentrationProperty:
        case PropertyType.CurrentProperty:
        case PropertyType.DensityProperty:
        case PropertyType.FrequencyProperty:
        case PropertyType.HeatingCoolingProperty:
        case PropertyType.HumidityProperty:
        case PropertyType.ImageProperty:
        case PropertyType.InstantaneousPowerFactorProperty:
        case PropertyType.InstantaneousPowerProperty:
        case PropertyType.LeakProperty:
        case PropertyType.LevelProperty:
            return <LevelProperty property={property}/>
        case PropertyType.LockedProperty:
        case PropertyType.MotionProperty:
        case PropertyType.OnOffProperty:
            return <OnOffProperty property={property}/>
        case PropertyType.OpenProperty:
        case PropertyType.PushedProperty:
        case PropertyType.SmokeProperty:
        case PropertyType.TargetTemperatureProperty:
            return <TargetTemperatureProperty property={property}/>
        case PropertyType.TemperatureProperty:
            return <TemperatureProperty property={property}/>
        case PropertyType.ThermostatModeProperty:
            return <TemperatureProperty property={property}/>
        case PropertyType.VideoProperty:
        case PropertyType.VoltageProperty:
        default:
            return null
    }
}