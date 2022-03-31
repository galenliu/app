import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";
import {AppContext} from "../../App";
import { gateway} from "../../main";
import enTrans from "src/js/i18n/en-us.json"
import {Path} from "../../js/menuList";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Button, Fab} from "@mui/material";
import useThings from "src/js/use-things";
import {Capability} from "src/js/constants";
import Light from "src/components/capability/Light";
import MultiLevelSwitch from "src/components/capability/MultiLevelSwitch";
import OnOffSwitch from "src/components/capability/OnOffSwitch";
import Alarm from "src/components/capability/Alarm";
import AirQualitySensor from "src/components/capability/AirQualitySensor";
import BarometricPressureSensor from "src/components/capability/BarometricPressureSensor";
import BinarySensor from "src/components/capability/BinarySensor";
import Camera from "src/components/capability/Camera";
import ColorControl from "src/components/capability/ColorControl";
import ColorSensor from "src/components/capability/ColorSensor";
import DoorSensor from "src/components/capability/DoorSensor";
import EnergyMonitor from "src/components/capability/EnergyMonitor";
import HumiditySensor from "src/components/capability/HumiditySensor";
import LeakSensor from "src/components/capability/LeakSensor";
import Lock from "src/components/capability/Lock";
import MotionSensor from "src/components/capability/MotionSensor";
import MultiLevelSensor from "src/components/capability/MultiLevelSensor";
import PushButton from "src/components/capability/PushButton";
import SmartPlug from "src/components/capability/SmartPlug";
import SmokeSensor from "src/components/capability/SmokeSensor";
import TemperatureSensor from "src/components/capability/TemperatureSensor";
import Thermostat from "src/components/capability/Thermostat";
import VideoCamera from "src/components/capability/VideoCamera";

export default function Things(props) {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const {setTitle} = useContext(AppContext)
    const [things] = useThings(gateway)
    const [showThingId, setShowThingId] = useState()


    useEffect(() => {
        setTitle(t(enTrans.Home))
        return () => {
        }
    }, [])

    useEffect(() => {
        console.log("Things View:",things)
        return () => {
        }
    }, [things])


    function readerThings() {
        const list = []
        if (things && things.length > 0) {
            for (const description of things) {
                if (description.id && description.title && description.selectedCapability) {
                    switch (description.selectedCapability) {
                        case Capability.Alarm:
                            list.push(<Alarm key={description.id} description={description} showThingId={showThingId}/>)
                            break
                        case Capability.AirQualitySensor:
                            list.push(<AirQualitySensor key={description.id} description={description}
                                                        showThingId={showThingId}/>)
                            break
                        case Capability.BarometricPressureSensor:
                            list.push(<BarometricPressureSensor key={description.id} description={description}
                                                                showThingId={showThingId}/>)
                            break
                        case Capability.BinarySensor:
                            list.push(<BinarySensor key={description.id} description={description}
                                                    showThingId={showThingId}/>)
                            break
                        case Capability.Camera:
                            list.push(<Camera key={description.id} description={description}
                                              showThingId={showThingId}/>)
                            break
                        case Capability.ColorControl:
                            list.push(<ColorControl key={description.id} description={description}
                                                    showThingId={showThingId}/>)
                            break
                        case Capability.ColorSensor:
                            list.push(<ColorSensor key={description.id} description={description}
                                                   showThingId={showThingId}/>)
                            break
                        case Capability.DoorSensor:
                            list.push(<DoorSensor key={description.id} description={description}
                                                  showThingId={showThingId}/>)
                            break
                        case Capability.EnergyMonitor:
                            list.push(<EnergyMonitor key={description.id} description={description}
                                                     showThingId={showThingId}/>)
                            break
                        case Capability.HumiditySensor:
                            list.push(<HumiditySensor key={description.id} description={description}
                                                      showThingId={showThingId}/>)
                            break
                        case Capability.LeakSensor:
                            list.push(<LeakSensor key={description.id} description={description}
                                                  showThingId={showThingId}/>)
                            break
                        case Capability.Light:
                            list.push(<Light key={description.id} description={description} showThingId={showThingId}/>)
                            break
                        case Capability.Lock:
                            list.push(<Lock key={description.id} description={description} showThingId={showThingId}/>)
                            break
                        case Capability.MotionSensor:
                            list.push(<MotionSensor key={description.id} description={description}
                                                    showThingId={showThingId}/>)
                            break
                        case Capability.MultiLevelSensor:
                            list.push(<MultiLevelSensor key={description.id} description={description}
                                                        showThingId={showThingId}/>)
                            break
                        case Capability.MultiLevelSwitch:
                            list.push(<MultiLevelSwitch key={description.id} description={description}
                                                        showThingId={showThingId}/>)
                            break
                        case Capability.OnOffSwitch:
                            list.push(<OnOffSwitch key={description.id} description={description}
                                                   showThingId={showThingId}/>)
                            break
                        case Capability.PushButton:
                            list.push(<PushButton key={description.id} description={description}
                                                  showThingId={showThingId}/>)
                            break
                        case Capability.SmartPlug:
                            list.push(<SmartPlug key={description.id} description={description}
                                                 showThingId={showThingId}/>)
                            break
                        case Capability.SmokeSensor:
                            list.push(<SmokeSensor key={description.id} description={description}
                                                   showThingId={showThingId}/>)
                            break
                        case Capability.TemperatureSensor:
                            list.push(<TemperatureSensor key={description.id} description={description}
                                                         showThingId={showThingId}/>)
                            break
                        case Capability.Thermostat:
                            list.push(<Thermostat key={description.id} description={description}
                                                  showThingId={showThingId}/>)
                            break
                        case Capability.VideoCamera:
                            list.push(<VideoCamera key={description.id} description={description}
                                                   showThingId={showThingId}/>)
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


