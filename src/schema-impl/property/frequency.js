import NumericLabelDetail from "./numeric-label";

export default class FrequencyDetail extends NumericLabelDetail {
  constructor(thing, name, property) {
    super(
      thing,
      name,
      !!property.readOnly,
      property.title ||  'frequency',
      'Hz',
      0
    );

    if (property.hasOwnProperty('multipleOf') && `${property.multipleOf}`.includes('.')) {
      this.precision = `${property.multipleOf}`.split('.')[1].length;
    } else {
      this.precision = 0;
    }
  }


}


