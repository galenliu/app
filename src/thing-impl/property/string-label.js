/**
 * StringLabelDetail
 *
 * A bubble showing some basic string information with no input.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


export default class StringLabelDetail {
  constructor(thing, name, readOnly, label) {
    this.thing = thing;
    this.name = name;
    this.readOnly = readOnly;
    this.label = label;

  }

  attach() {
    this.labelElement = this.thing.element.querySelector(`#${this.id}`);
  }

  view() {
  }

  update(value) {



  }
}
