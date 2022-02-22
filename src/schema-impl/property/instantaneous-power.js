
import NumericLabelDetail from './numeric-label';


export default class InstantaneousPowerDetail extends NumericLabelDetail {
  constructor(thing, name, property) {
    super(thing, name, !!property.readOnly, property.title || fluent.getMessage('power'), 'W', 0);
    this.id = `instantaneous-power-${Utils.escapeHtmlForIdClass(this.name)}`;

    if (property.hasOwnProperty('multipleOf') && `${property.multipleOf}`.includes('.')) {
      this.precision = `${property.multipleOf}`.split('.')[1].length;
    } else {
      this.precision = 0;
    }
  }


}

