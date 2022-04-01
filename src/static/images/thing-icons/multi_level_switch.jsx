import * as React from 'react';
import {createSvgIcon} from '@mui/material/utils';
import {SvgIcon} from "@mui/material";

export default function MultiLevelSwitchIcon(props) {
    return (
        <SvgIcon {...props}>
            <svg t="1648845814619" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="87508"  >
                <path
                    d="M896 437.888a48 48 0 0 1 6.528 95.552L896 533.888H128a48 48 0 0 1-6.528-95.552L128 437.888h768z"
                     p-id="87509"></path>
                <path
                    d="M417.92 437.888a48 48 0 0 1 6.528 95.552l-6.528 0.448H128a48 48 0 0 1-6.528-95.552L128 437.888h289.92z"
                     p-id="87510"></path>
                <path
                    d="M511.36 357.312a128 128 0 1 1 0 256 128 128 0 0 1 0-256z m0 96a32 32 0 1 0 0 64 32 32 0 0 0 0-64z"
                    fill="#555555" p-id="87511"></path>
            </svg>
        </SvgIcon>
    );
}
