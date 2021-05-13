/**
 * CurrentDetail
 *
 * A bubble showing current.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


import NumericLabelDetail from './numeric-label'


export default class CurrentDetail extends NumericLabelDetail {
  constructor(thing, name, property) {
    super(thing,
      name,
      !!property.readOnly,
      property.title,
      'A',
      1);


    if (property.hasOwnProperty('multipleOf') &&
      `${property.multipleOf}`.includes('.')) {
      this.precision = `${property.multipleOf}`.split('.')[1].length;
    } else {
      this.precision = 1;
    }
  }

  view() {
  }
}

