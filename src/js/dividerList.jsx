import * as React from 'react';
import HomeIcon from "@mui/icons-material/Home";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';


export const DividerList = {
    Things: {
        ListItemIcon: <HomeIcon/>,
        Path: "/things",
        Title: "Things"
    },
    Rules: {
        ListItemIcon: <AlarmOnIcon/>,
        Path: "/rules",
        Title: "Rules"
    },
    Settings: {
        ListItemIcon: <SettingsIcon/>,
        Path: "/settings",
        Title: "Settings"
    },
}

export const DividerBottomList = {
    Exit: {
        ListItemIcon: <ExitToAppIcon/>,
        Path: "/login",
        Title: "Exit"
    },
    Users: {
        ListItemIcon: <PersonIcon/>,
        Path: "/login",
        Title: "Users"
    }
}