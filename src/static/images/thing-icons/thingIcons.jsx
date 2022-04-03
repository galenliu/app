import Light from "./light";
import {Capability} from "src/js/constants";
import OnOffSwitch from "./on_off_switch";
import BinarySensor from "./binary_sensor";
import Box from "@mui/material/Box";
import * as React from 'react';
import MultiLevelSwitch from "./multi_level_switch";
import ColorControlIcon from "./color_control";
import HumiditySensorIcon from "./humidity_sensor";
import SmokeSensorIcon from "./smoke_sensor";
import AlarmIcon from "./alarm_sensor";
import AirQualitySensorIcon from "./air_quality_sensor";
import LockIcon from "./lock";
import PushButtonIcon from "./push_button";
import MotionSensor from "./motion_sensor";
import TemperatureSensorIcon from "./temperature_sensor";
import SmartPlugIcon from "./smart_plug";
import CameraIcon from "./camera";
import DoorSensorIcon from "./door_sensor";
import ThermostatIcon from "./thermostat";
import EnergyMonitorIcon from "./energy_monitor";
import MultiLevelSensorIcon from "./multi_level_sensor";
import LeakSensorIcon from "./leak_sensor";
import VideoCameraIcon from "./video_camera";
import BarometricPressureSensorIcon from "./barometric_pressure_sensor";

export default function ThingIcons(props) {
    const {selected, ...other} = props;
    return (
        <Box>
            {selected === Capability.Light && <Light {...other}/>}
            {selected === Capability.OnOffSwitch && <OnOffSwitch {...other}/>}
            {selected === Capability.BinarySensor && <BinarySensor {...other}/>}
            {selected === Capability.MultiLevelSwitch && <MultiLevelSwitch {...other}/>}
            {selected === Capability.ColorControl && <ColorControlIcon {...other}/>}
            {selected === Capability.HumiditySensor && <HumiditySensorIcon {...other}/>}
            {selected === Capability.SmokeSensor && <SmokeSensorIcon {...other}/>}
            {selected === Capability.Alarm && <AlarmIcon {...other}/>}
            {selected === Capability.AirQualitySensor && <AirQualitySensorIcon {...other}/>}
            {selected === Capability.Lock && <LockIcon {...other}/>}
            {selected === Capability.PushButton && <PushButtonIcon {...other}/>}
            {selected === Capability.MotionSensor && <MotionSensor {...other}/>}
            {selected === Capability.TemperatureSensor && <TemperatureSensorIcon {...other}/>}
            {selected === Capability.SmartPlug && <SmartPlugIcon {...other}/>}
            {selected === Capability.Camera && <CameraIcon {...other}/>}
            {selected === Capability.DoorSensor && <DoorSensorIcon {...other}/>}
            {selected === Capability.Thermostat && <ThermostatIcon {...other}/>}
            {selected === Capability.EnergyMonitor && <EnergyMonitorIcon {...other}/>}
            {selected === Capability.MultiLevelSensor && <MultiLevelSensorIcon {...other}/>}
            {selected === Capability.LeakSensor && <LeakSensorIcon {...other}/>}
            {selected === Capability.VideoCamera && <VideoCameraIcon {...other}/>}
            {selected === Capability.BarometricPressureSensor && <BarometricPressureSensorIcon {...other}/>}
        </Box>
    )
}



