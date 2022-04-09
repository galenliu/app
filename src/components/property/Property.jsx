import {PropertyType} from "../../js/constants";
import BrightnessProperty from "./BrightnessProperty";
import React from "react";


export default function Property(property) {
    switch (property["@type"]) {
        case PropertyType.AlarmProperty:
        case PropertyType.BarometricPressureProperty:
        case PropertyType.BooleanProperty:
        case PropertyType.BrightnessProperty:
            return <BrightnessProperty property={property}/>
        case PropertyType.ColorModeProperty:
        case PropertyType.ColorProperty:
        case PropertyType.ColorTemperatureProperty:
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
        case PropertyType.LockedProperty:
        case PropertyType.MotionProperty:
        case PropertyType.OnOffProperty:
        case PropertyType.OpenProperty:
        case PropertyType.PushedProperty:
        case PropertyType.SmokeProperty:
        case PropertyType.TargetTemperatureProperty:
        case PropertyType.TemperatureProperty:
        case PropertyType.ThermostatModeProperty:
        case PropertyType.VideoProperty:
        case PropertyType.VoltageProperty:
        default:
            return null
    }
}