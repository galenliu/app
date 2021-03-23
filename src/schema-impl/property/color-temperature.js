/**
 * ColorTemperatureDetail
 *
 * A bubble showing the color temperature of a thing
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';




export default class ColorTemperatureDetail {
  constructor(thing, name, property) {
    this.thing = thing;
    this.name = name;
    this.readOnly = !!property.readOnly;
    this.label = property.title  ;
    this.min = property.minimum;
    this.max = property.maximum;

    if (property.hasOwnProperty('multipleOf')) {
      this.step = property.multipleOf;
    } else if (property.type === 'number') {
      this.step = 'any';
    } else {
      this.step = 1;
    }


  }

  attach() {

  }

  view() {

  }

  update(temperature) {

  }

  set() {

  }
}

