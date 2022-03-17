import {useParams} from "react-router-dom";
import useThing from "../../hooks/use-thing";
import {Stack} from "@mui/material";
import {useEffect} from "react";
import {Capability} from "../../js/constant";
import Light from "../../components/capability/Light";
import MultiLevelSwitch from "../../components/capability/MultiLevelSwitch";
import Alarm from "../../components/capability/Alarm";
import AirQualitySensor from "../../components/capability/AirQualitySensor";
import BarometricPressureSensor from "../../components/capability/BarometricPressureSensor";
import BinarySensor from "../../components/capability/BinarySensor";
import Camera from "../../components/capability/Camera";
import ColorControl from "../../components/capability/ColorControl";
import ColorSensor from "../../components/capability/ColorSensor";
import DoorSensor from "../../components/capability/DoorSensor";
import EnergyMonitor from "../../components/capability/EnergyMonitor";
import HumiditySensor from "../../components/capability/HumiditySensor";
import LeakSensor from "../../components/capability/LeakSensor";
import Lock from "../../components/capability/Lock";
import MotionSensor from "../../components/capability/MotionSensor";
import MultiLevelSensor from "../../components/capability/MultiLevelSensor";
import OnOffSwitch from "../../components/capability/OnOffSwitch";
import PushButton from "../../components/capability/PushButton";
import SmartPlug from "../../components/capability/SmartPlug";
import SmokeSensor from "../../components/capability/SmokeSensor";
import TemperatureSensor from "../../components/capability/TemperatureSensor";
import Thermostat from "../../components/capability/Thermostat";
import VideoCamera from "../../components/capability/VideoCamera";
import ThingIcons from "../../images/thing-icons/thingIcons";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";


export default function Thing() {
    const params = useParams()
    const [thing] = useThing(params.thingId)

    useEffect(() => {
        console.log("Thing Panel data:", thing)
    })

    useEffect(() => {

    }, [thing])

    return (
        <Stack mt={"6%"} container sx={{width: "90%", backgroundColor: "primary.background"}} spacing={1}>
            <Card my={"90px"} container sx={{borderRadius: "20px",backgroundColor: "#d4dee8"}}>
              <Stack flexDirection={"row"}>
                  <Stack width="20%" direction={"row"} sx={{ alignItems: "center",justifyContent:"center"}}>
                      {thing !== null && <ThingIcons sx={{fontSize: 40}} selected={thing.selectedCapability}/>}
                  </Stack>
                  <Stack sx={{width: "80%",alignItems:"start"}}>
                      <Typography variant={"subtitle1"}>
                          {thing?.title || ""}
                      </Typography>
                      <Typography>
                          {thing?.state}
                      </Typography>
                  </Stack>
              </Stack>
            </Card>
            {thing?.selectedCapability === Capability.Light && <Light thing={thing}/>}
            {thing?.selectedCapability === Capability.MultiLevelSwitch && <MultiLevelSwitch thing={thing}/>}
            {thing?.selectedCapability === Capability.OnOffSwitch && <OnOffSwitch thing={thing}/>}
            {thing?.selectedCapability === Capability.Alarm && <Alarm thing={thing}/>}
            {thing?.selectedCapability === Capability.AirQualitySensor && <AirQualitySensor thing={thing}/>}
            {thing?.selectedCapability === Capability.BarometricPressureSensor &&
                <BarometricPressureSensor thing={thing}/>}
            {thing?.selectedCapability === Capability.BinarySensor && <BinarySensor thing={thing}/>}
            {thing?.selectedCapability === Capability.Camera && <Camera thing={thing}/>}
            {thing?.selectedCapability === Capability.ColorControl && <ColorControl thing={thing}/>}
            {thing?.selectedCapability === Capability.ColorSensor && <ColorSensor thing={thing}/>}
            {thing?.selectedCapability === Capability.DoorSensor && <DoorSensor thing={thing}/>}
            {thing?.selectedCapability === Capability.EnergyMonitor && <EnergyMonitor thing={thing}/>}
            {thing?.selectedCapability === Capability.HumiditySensor && <HumiditySensor thing={thing}/>}
            {thing?.selectedCapability === Capability.LeakSensor && <LeakSensor thing={thing}/>}
            {thing?.selectedCapability === Capability.Lock && <Lock thing={thing}/>}
            {thing?.selectedCapability === Capability.MotionSensor && <MotionSensor thing={thing}/>}
            {thing?.selectedCapability === Capability.MultiLevelSensor && <MultiLevelSensor thing={thing}/>}
            {thing?.selectedCapability === Capability.PushButton && <PushButton thing={thing}/>}
            {thing?.selectedCapability === Capability.SmartPlug && <SmartPlug thing={thing}/>}
            {thing?.selectedCapability === Capability.SmokeSensor && <SmokeSensor thing={thing}/>}
            {thing?.selectedCapability === Capability.TemperatureSensor && <TemperatureSensor thing={thing}/>}
            {thing?.selectedCapability === Capability.Thermostat && <Thermostat thing={thing}/>}
            {thing?.selectedCapability === Capability.VideoCamera && <VideoCamera thing={thing}/>}
        </Stack>)

}