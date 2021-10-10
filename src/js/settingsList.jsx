import * as React from 'react';
import DomainIcon from "@mui/icons-material/Domain";
import ExtensionIcon from "@mui/icons-material/Extension";
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const SettingsList = {
    Domain: {
        ListItemIcon: <DomainIcon/>,
        Title: "Domain",
        Path: "/domain"
    },
    Addons: {
        ListItemIcon: <ExtensionIcon/>,
        Title: "Addons",
        Path: "/addons"
    },
    Users: {
        ListItemIcon: <PersonIcon/>,
        Title: "Users",
        Path: "/users"
    },
    Time: {
        ListItemIcon: <AccessTimeIcon/>,
        Title: "Time",
        Path: "/time"
    }
}