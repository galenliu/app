import * as React from 'react';
import HomeIcon from "@mui/icons-material/Home";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import enTrans from "../i18n/en-us.json"
import {useTranslation} from "react-i18next";


export const Path = {
    Home: "/home",
    Rules: "/rules",
    Settings: "/settings",
    Login: "/login",
    Users: "/users",
    Register: "/register"
}

export const MenuList = {
    Home: {
        ListItemIcon: <HomeIcon/>,
        Path: Path.Home,
        Title: enTrans.Home
    },
    Rules: {
        ListItemIcon: <AlarmOnIcon/>,
        Path: Path.Rules,
        Title: enTrans.Rules
    },
    Settings: {
        ListItemIcon: <SettingsIcon/>,
        Path: Path.Settings,
        Title: enTrans.Settings
    },
}

export const DividerBottomList = {
    Exit: {
        ListItemIcon: <ExitToAppIcon/>,
        Path: Path.Login,
        Title: enTrans.Exit
    },
    Users: {
        ListItemIcon: <PersonIcon/>,
        Path: Path.Register,
        Title: enTrans.Users
    }
}