

import StringLabelDetail from './string-label';


export default class HeatingCoolingDetail extends StringLabelDetail {
  constructor(thing, name, property) {
    super(thing, name, !!property.readOnly, property.title );
    // this.id = `heating-cooling-${Utils.escapeHtmlForIdClass(this.name)}`;
  }




}

