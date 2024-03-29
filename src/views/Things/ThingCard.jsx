import Card from '@mui/material/Card';
import {CardMedia, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useContext, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import IconButton from "@mui/material/IconButton";
import DisconnectIcon from "src/static/images/disconnect";
import {AppContext} from "../../App";
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"


export default function ThingCard({thing, onProperty, icon}) {
    const {showThing} = useContext(AppContext)
    const {t} = useTranslation()
    useEffect(() => {

    }, [])

    return (
        <Card
            onClick={() => showThing(thing.id)}
            sx={{
                boxShadow: 3,
                display: 'flex',
                flexDirection: "column",
                margin: "10px 10px",
                justifyContent: "space-between",
                width: "120px",
                height: "120px",
                padding: "1ox",
                backgroundColor: [onProperty?.value ? "rgba(255,255,255,1)" : "rgba(219,196,196,0.1)"],
            }}>
            <Box sx={{display: 'flex', flex: "70%", justifyContent: "space-around"}}>
                <Box sx={{display: "flex", flex: "70%", justifyContent: "center", alignItems: "center"}}>
                    {icon}
                </Box>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    {onProperty !== null && <IconButton onClick={(e) => {
                        e.stopPropagation();
                        onProperty?.setValue(!onProperty.value)
                    }}>
                        {thing.connected && onProperty !== undefined &&
                            <PowerSettingsNewIcon sx={{color: onProperty?.value ? "green" : "gray"}}/>}
                        {!thing.connected && <DisconnectIcon/>}
                    </IconButton>
                    }
                </Box>
            </Box>
            <Stack sx={{
                display: 'flex',
                ml: "2px",
                flex: "30%",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "start"
            }}>
                <Typography sx={{fontSize: 14, flex: "60%",}} color="text.main" gutterBottom>
                    {thing?.title ? thing.title : "Null"}
                </Typography>
                <Typography sx={{fontSize: 10, flex: "40%"}}
                            color="text.secondary" gutterBottom>
                    {thing?.group_id}
                </Typography>
                <Typography sx={{fontSize: 10, flex: "40%"}}
                            color="text.secondary" gutterBottom>
                    {thing.state}
                </Typography>
            </Stack>
        </Card>
    )
}

// export default function ThingCard(props) {
//
//     const [thing] = useThing(props.description)
//     const {t} = useTranslation();
//     const navigate = useNavigate()
//     // const [thing,setProperty] = useThing(props.thing.id)
//     const onProperty = useProperty(thing, thing?.onProperty)
//     const brightnessProperty = useProperty(thing, thing?.brightnessProperty)
//     const colorProperty = useProperty(thing, thing?.colorProperty)
//     const [state, setState] = useState()
//
//     useEffect(() => {
//
//         if (brightnessProperty?.property !== undefined && onProperty.value) {
//             setState(brightnessProperty.value + "%")
//             return
//         }
//         if (!onProperty?.value) {
//             setState(t(enTrans.Off))
//         } else {
//             setState(t(enTrans.On))
//         }
//     }, [onProperty, brightnessProperty])
//
//     useEffect(() => {
//         console.log("thing card data:", thing)
//     }, [thing])
//
//     return (
//         <Card
//             onClick={() => {navigate(`/things/${thing.id}`)}}
//               sx={{
//                   boxShadow: 3,
//                   display: 'flex',
//                   flexDirection: "column",
//                   margin: "10px 10px",
//                   justifyContent: "space-between",
//                   width: "120px",
//                   height: "120px",
//                   padding: "1ox",
//                   backgroundColor: [onProperty?.value ? "rgba(255,255,255,1)" : "rgba(219,196,196,0.1)"],
//               }}>
//             <Box sx={{display: 'flex', flex: "70%", justifyContent: "space-around"}}>
//                 <Box sx={{display: "flex", flex: "70%", justifyContent: "center", alignItems: "center"}}>
//                     {
//                         colorProperty.property !== null && <ThingIcons selected={thing?.selectedCapability || null}
//                                                                        sx={{
//                                                                            fontSize: 50,
//                                                                            color: [onProperty.value ? colorProperty.value : "gray"]
//                                                                        }}/>
//                     }
//                     {
//                         colorProperty.property === null && <ThingIcons selected={thing?.selectedCapability}
//                                                                        sx={{
//                                                                            fontSize: 50,
//                                                                            color: [onProperty.value ? "#FF9502" : "#bfbfbf"]
//                                                                        }}/>
//                     }
//                 </Box>
//                 <Box sx={{display: "flex", flexDirection: "column"}}>
//                     {thing?.onProperty !== null && <IconButton onClick={(e) => {
//                         e.stopPropagation();
//                         onProperty.setValue(!onProperty.value)
//                     }}>
//                         <PowerSettingsNewIcon sx={{color: onProperty.value ? "green" : "gray"}}/>
//                     </IconButton>
//                     }
//                 </Box>
//             </Box>
//             <Stack sx={{
//                 display: 'flex',
//                 ml: "2px",
//                 flex: "30%",
//                 flexDirection: "column",
//                 justifyContent: "space-around",
//                 alignItems: "start"
//             }}>
//                 <Typography sx={{fontSize: 14, flex: "60%",}} color="text.main" gutterBottom>
//                     {thing?.title ? thing.title : "Null"}
//                 </Typography>
//                 <Typography sx={{fontSize: 10, flex: "40%"}}
//                             color="text.secondary" gutterBottom>
//                     {state}
//                 </Typography>
//                 <Typography sx={{fontSize: 10, flex: "40%"}}
//                             color="text.secondary" gutterBottom>
//                     {thing?.connected? "connected": "disconnected"}
//                 </Typography>
//             </Stack>
//
//         </Card>
//     )
//
// }