import * as React from 'react';
import DomainIcon from "@mui/icons-material/Domain";
import ExtensionIcon from "@mui/icons-material/Extension";
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import enTrans from "../i18n/en-us.json"

export const SettingsList = {
    Domain: {
        ListItemIcon: <DomainIcon/>,
        Title: enTrans.Domain,
        Path: "/domain"
    },
    Addons: {
        ListItemIcon: <ExtensionIcon/>,
        Title: enTrans.Addons,
        Path: "/addons"
    },
    Users: {
        ListItemIcon: <PersonIcon/>,
        Title: enTrans.Users,
        Path: "/users"
    },
    Time: {
        ListItemIcon: <AccessTimeIcon/>,
        Title: enTrans.Time,
        Path: "/time"
    }
}