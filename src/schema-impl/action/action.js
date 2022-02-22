/**
 * ActionDetail
 *
 * A bubble showing a button for an action.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

import API from '../../js/api';


export default class ActionDetail {
    constructor(thing, name, action, href) {
        this.thing = thing;
        this.name = name;
        this.label = action.title || action.label || name;
        this.input = action.input;
        this.href = href;
        this.id = `action-button-${Utils.escapeHtmlForIdClass(this.name)}`;
    }

    attach() {
        this.button = this.thing.element.querySelector(`#${this.id}`);
        this.button.addEventListener('click', this.handleClick.bind(this));
    }


}

