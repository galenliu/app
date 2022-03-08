import * as React from 'react';
import {createSvgIcon} from '@mui/material/utils';
import {SvgIcon} from "@mui/material";

export default function MultiLevelSwitch(props) {
    return (
        <SvgIcon {...props}>
            <svg t="1646723702103" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="16819" >
                <path
                    d="M512 725.333333a42.666667 42.666667 0 0 1-42.666667-42.666666V42.666667a42.666667 42.666667 0 0 1 85.333334 0v640a42.666667 42.666667 0 0 1-42.666667 42.666666z"
                    p-id="16820"></path>
                <path
                    d="M554.666667 896h-85.333334a128 128 0 0 1 0-256h85.333334a128 128 0 0 1 0 256z m-85.333334-170.666667a42.666667 42.666667 0 0 0 0 85.333334h85.333334a42.666667 42.666667 0 0 0 0-85.333334z"
                    p-id="16821"></path>
                <path
                    d="M512 1024a42.666667 42.666667 0 0 1-42.666667-42.666667v-128a42.666667 42.666667 0 0 1 85.333334 0v128a42.666667 42.666667 0 0 1-42.666667 42.666667z"
                    p-id="16822"></path>
            </svg>
        </SvgIcon>
    );
}
