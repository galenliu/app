
export default class LevelDetail {
  constructor(thing, name, property) {
    this.thing = thing;
    this.name = name;
    this.readOnly = !!property.readOnly;
    this.label = property.title || fluent.getMessage('level');
    this.unit = property.unit ? Units.nameToAbbreviation(property.unit) : null;

    if (property.hasOwnProperty('minimum')) {
      this.min = property.minimum;
    } else {
      this.min = 0;
    }

    if (property.hasOwnProperty('maximum')) {
      this.max = property.maximum;
    } else {
      this.max = 100;
    }

    this.precision = 0;
    if (property.hasOwnProperty('multipleOf')) {
      this.step = property.multipleOf;

      if (`${property.multipleOf}`.includes('.')) {
        this.precision = `${property.multipleOf}`.split('.')[1].length;
      }
    } else if (property.type === 'number') {
      this.step = 'any';
    } else {
      this.step = 1;
    }

    this.id = `level-${Utils.escapeHtmlForIdClass(this.name)}`;
  }




  update(level) {
    if (!this.level) {
      return;
    }

    this.level.value = level;
  }

  set() {
    this.thing.setProperty(this.name, this.level.value);
  }
}


