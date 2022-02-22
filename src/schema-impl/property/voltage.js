import NumericLabelDetail from './numeric-label';


export default class VoltageDetail extends NumericLabelDetail {
    constructor(thing, name, property) {
        super(thing, name, !!property.readOnly, property.title || fluent.getMessage('voltage'), 'V', 0);
        this.id = `voltage-${Utils.escapeHtmlForIdClass(this.name)}`;

        if (property.hasOwnProperty('multipleOf') && `${property.multipleOf}`.includes('.')) {
            this.precision = `${property.multipleOf}`.split('.')[1].length;
        } else {
            this.precision = 0;
        }
    }
}


