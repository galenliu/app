import StringLabelDetail from './string-label';


class AlarmDetail extends StringLabelDetail {
    constructor(thing, name, property) {
        super(thing, name, !!property.readOnly, property.title || fluent.getMessage('alarm'));
        this.readOnly = !!property.readOnly;
        this.id = name
    }
}

export default AlarmDetail;
