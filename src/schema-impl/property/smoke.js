/**
 * SmokeDetail
 *
 * A bubble showing smoke state.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

import StringLabelDetail from './string-label'


export default class SmokeDetail extends StringLabelDetail {
  constructor(thing, name, property) {
    super(thing, name, !!property.readOnly,
      property.title);

  }

  view() {
  }

  update(value) {
    if (!this.label) {
      return;
    }

    this.labelElement.value = value;
  }
}


