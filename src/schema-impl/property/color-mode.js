/**
 * ColorModeDetail
 *
 * A bubble showing color mode.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

import EnumDetail from './enum'


export default class ColorModeDetail extends EnumDetail {
  constructor(thing, name, property) {
    super(thing, name, property);

  }

  attach() {
    if (this.readOnly) {
      this.labelElement = this.thing.element.querySelector(`#${this.id}`);
    } else {
      super.attach();
    }
  }

  view() {

  }

  update(value) {

  }
}

