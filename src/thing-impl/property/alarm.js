/**
 * AlarmDetail
 *
 * A bubble showing alarm state.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


import StringLabelDetail from './string-label';
import {debounce} from "../../utils"


export default class AlarmDetail extends StringLabelDetail {
    constructor(thing, name, property) {
        super(thing, name, !!property.readOnly,
            property.title);
        this.readOnly = !!property.readOnly;

        this.listViewData = {
            label: name,
            disabled: this.readOnly
        }

    }

    attach() {
        super.attach();

        if (!this.readOnly) {
            this.input = this.labelElement;
            const setChecked = debounce(500, this.set.bind(this));
            this.input.addEventListener('change', setChecked);
        }
    }

    view() {

    }

    update(value) {
        if (!this.labelElement) {
            return;
        }

        if (this.readOnly) {
            this.labelElement.value = value ? 'ALARM' : 'OK';
            this.labelElement.inverted = value;
        } else {
            if (value == this.input.checked) {
                return;
            }

            this.input.checked = value;
        }
    }

    set() {
        this.thing.setProperty(this.name, this.input.checked);
    }
}


