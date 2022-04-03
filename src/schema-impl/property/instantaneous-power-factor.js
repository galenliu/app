
import NumericLabelDetail from './numeric-label';
import * as Utils from "../../js/util";


export default  class InstantaneousPowerFactorDetail extends NumericLabelDetail {
  constructor(thing, name, property) {
    super(thing, name, !!property.readOnly, property.title || fluent.getMessage('power'), '', 0);
    this.id = `instantaneous-power-factor-${Utils.escapeHtmlForIdClass(this.name)}`;
    if (property.hasOwnProperty('multipleOf') && `${property.multipleOf}`.includes('.')) {
      this.precision = `${property.multipleOf}`.split('.')[1].length;
    } else {
      this.precision = 0;
    }
  }
}

