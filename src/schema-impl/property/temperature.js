
import NumericLabelDetail from './numeric-label';


export default class TemperatureDetail extends NumericLabelDetail {
  constructor(thing, name, property) {
    super(
      thing,
      name,
      !!property.readOnly,
      property.title,
      property.unit || 'degree celsius',
      0
    );
    // this.id = `temperature-${Utils.escapeHtmlForIdClass(this.name)}`;

    if (property.hasOwnProperty('multipleOf') && `${property.multipleOf}`.includes('.')) {
      this.precision = `${property.multipleOf}`.split('.')[1].length;
    } else {
      this.precision = 0;
    }
  }

}


