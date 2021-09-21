/**
 * EnumDetail
 *
 * A generic enum property detail.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


import Units from "../../js/units";


export default class EnumDetail {
  constructor(thing, name, property) {
    this.thing = thing;
    this.name = name;
    this.readOnly = !!property.readOnly;
    this.label = property.title || name;
    this.type = property.type;
    this.unit =
      property.unit ? Units.nameToAbbreviation(property.unit) : null;
    this.choices = property.enum;

  }

  attach() {

  }

  view() {
  }

  update(value) {
    if (!this.select) {
      return;
    }

    this.select.value = value;
  }

  set() {
    this.thing.setProperty(this.name, this.select.value);
  }
}

