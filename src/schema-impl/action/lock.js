

import ActionDetail from './action';


export default class LockActionDetail extends ActionDetail {
  constructor(thing, name, action, href) {
    super(thing, name, action, href);
    // this.id = `lock-action-button-${Utils.escapeHtmlForIdClass(this.name)}`;
  }


}


