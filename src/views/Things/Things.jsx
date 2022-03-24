import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";
import {AppContext, gateway} from "../../App";
import enTrans from "../../i18n/en-us.json"
import {Path} from "../../js/menuList";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Fab} from "@mui/material";
import useThings from "../../hooks/use-things";
import {Capability} from "../../js/constant";
import Light from "../../components/capability/Light";
import MultiLevelSwitch from "../../components/capability/MultiLevelSwitch";
import OnOffSwitch from "../../components/capability/OnOffSwitch";
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
import PushButton from "../../components/capability/PushButton";
import SmartPlug from "../../components/capability/SmartPlug";
import SmokeSensor from "../../components/capability/SmokeSensor";
import TemperatureSensor from "../../components/capability/TemperatureSensor";
import Thermostat from "../../components/capability/Thermostat";
import VideoCamera from "../../components/capability/VideoCamera";

export default function Things(props) {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const {setTitle} = useContext(AppContext)
    const [things] = useThings(gateway)
    const [showThingId, setShowThingId] = useState()


    useEffect(() => {
        setTitle(t(enTrans.Home))
        console.log("Home view things Data:", things)
        return () => {
            console.log("Exits Home view")
        }
    }, [])

    function readerThings() {

        const list = []
      if(things && things.length > 0){
          for (const description of things) {
              console.log("id ,description111111",description)
              if (description) {
                  switch (description.selectedCapability) {
                      case Capability.Alarm:
                          list.push(<Alarm key={description.id} thing={description} showThingId={showThingId}/>)
                          break
                      case Capability.AirQualitySensor:
                          list.push(<AirQualitySensor key={description.id} thing={description} showThingId={showThingId}/>)
                          break
                      case Capability.BarometricPressureSensor:
                          list.push(<BarometricPressureSensor key={description.id} thing={description} showThingId={showThingId}/>)
                          break
                      case Capability.BinarySensor:
                          list.push(<BinarySensor key={description.id} thing={description} showThingId={showThingId}/>)
                          break
                      case Capability.Camera:
                          list.push(<Camera key={description.id} thing={description} showThingId={showThingId}/>)
                          break
                      case Capability.ColorControl:
                          list.push(<ColorControl key={description.id} thing={description} showThingId={showThingId}/>)
                          break
                      case Capability.ColorSensor:
                          list.push(<ColorSensor key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.DoorSensor:
                          list.push(<DoorSensor key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.EnergyMonitor:
                          list.push(<EnergyMonitor key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.HumiditySensor:
                          list.push(<HumiditySensor key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.LeakSensor:
                          list.push(<LeakSensor key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.Light:
                          list.push(<Light key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.Lock:
                          list.push(<Lock key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.MotionSensor:
                          list.push(<MotionSensor key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.MultiLevelSensor:
                          list.push(<MultiLevelSensor key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.MultiLevelSwitch:
                          list.push(<MultiLevelSwitch key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.OnOffSwitch:
                          list.push(<OnOffSwitch key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.PushButton:
                          list.push(<PushButton key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.SmartPlug:
                          list.push(<SmartPlug key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.SmokeSensor:
                          list.push(<SmokeSensor key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.TemperatureSensor:
                          list.push(<TemperatureSensor key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.Thermostat:
                          list.push(<Thermostat key={description.id} description={description} showThingId={showThingId}/>)
                          break
                      case Capability.VideoCamera:
                          list.push(<VideoCamera key={description.id} description={description} showThingId={showThingId}/>)
                          break
                  }
              }
          }
      }
        return list
    }

    return (
        <Box>
            <Fab
                size="medium"
                color="primary"
                onClick={() => {
                    navigate(Path.NewThings)
                }}
                sx={{
                    position: 'fixed',
                    top: (theme) => theme.spacing(1),
                    right: (theme) => theme.spacing(1),
                }}
            >
                <AddIcon/>
            </Fab>


            <Grid sx={{mt: 8}} container direction="row">
                {
                    readerThings()
                }
            </Grid>
        </Box>
    )
}


