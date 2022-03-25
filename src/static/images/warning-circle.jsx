import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {SvgIcon} from "@mui/material";

export default function WarningCircle(props) {
    const {t} = useTranslation();
    return (
        <SvgIcon {...props}>
            <svg t="1647279576023" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="15770">
                <path
                    d="M533.333333 85.333333c-247.426667 0-448 200.573333-448 448s200.573333 448 448 448 448-200.573333 448-448-200.573333-448-448-448z m0 853.333334c-223.86 0-405.333333-181.473333-405.333333-405.333334s181.473333-405.333333 405.333333-405.333333 405.333333 181.473333 405.333334 405.333333-181.473333 405.333333-405.333334 405.333334z m0-298.666667a21.333333 21.333333 0 0 1-21.333333-21.333333V320a21.333333 21.333333 0 0 1 42.666667 0v298.666667a21.333333 21.333333 0 0 1-21.333334 21.333333z m21.333334 106.666667a21.333333 21.333333 0 1 1-21.333334-21.333334 21.333333 21.333333 0 0 1 21.333334 21.333334z"
                    fill="#5C5C66" p-id="15771"></path>
            </svg>
        </SvgIcon>
    );
};