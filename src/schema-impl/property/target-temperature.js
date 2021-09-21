/**
 * TargetTemperatureDetail
 *
 * A bubble showing target temperature.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


import NumberDetail from "./number"


export default class TargetTemperatureDetail extends NumberDetail {
  constructor(thing, name, property) {
    super(thing, name, property);

  }

  view() {
  }
}


