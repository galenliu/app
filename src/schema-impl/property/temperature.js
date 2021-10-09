/**
 * TemperatureDetail
 *
 * A bubble showing temperature.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

import NumericLabelDetail from './numeric-label'


export default class TemperatureDetail extends NumericLabelDetail {
    constructor(thing, name, property) {
        super(thing,
            name,
            !!property.readOnly,
            property.title,
            property.unit || 'degree celsius',
            0);


        if (property.hasOwnProperty('multipleOf') &&
            `${property.multipleOf}`.includes('.')) {
            this.precision = `${property.multipleOf}`.split('.')[1].length;
        } else {
            this.precision = 0;
        }
    }

    view() {
    }
}

