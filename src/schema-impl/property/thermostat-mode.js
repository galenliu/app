/**
 * ThermostatModeDetail
 *
 * A property detail showing a thermostat mode selector.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

import EnumDetail from "./enum"


export default class ThermostatModeDetail extends EnumDetail {
    constructor(thing, name, property) {
        super(thing, name, property);

    }

    view() {
    }
}


