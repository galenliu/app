/**
 * LevelDetail
 *
 * A bubble showing the level of a thing
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


import Units from "../../js/units";
import {escapeHtmlForIdClass} from "../../utils"


export default class LevelDetail {
    constructor(thing, name, property) {
        this.thing = thing;
        this.name = name;
        this.readOnly = !!property.readOnly;
        this.label = property.title;
        this.unit =
            property.unit ? Units.nameToAbbreviation(property.unit) : null;

        if (property.hasOwnProperty('minimum')) {
            this.min = property.minimum;
        } else {
            this.min = 0;
        }

        if (property.hasOwnProperty('maximum')) {
            this.max = property.maximum;
        } else {
            this.max = 100;
        }

        this.precision = 0;
        if (property.hasOwnProperty('multipleOf')) {
            this.step = property.multipleOf;

            if (`${property.multipleOf}`.includes('.')) {
                this.precision = `${property.multipleOf}`.split('.')[1].length;
            }
        } else if (property.type === 'number') {
            this.step = 'any';
        } else {
            this.step = 1;
        }

        this.id = `level-${escapeHtmlForIdClass(this.name)}`;
    }

    attach() {

    }

    view() {
    }

    update(level) {
    }

    set() {
        this.thing.setProperty(this.name, this.level.value);
    }
}


