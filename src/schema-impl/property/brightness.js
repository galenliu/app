
class BrightnessDetail {
  constructor(thing, name, property) {
    this.thing = thing;
    this.name = name;
    this.readOnly = !!property.readOnly;
    this.label = property.title || 'brightness';

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

    if (property.hasOwnProperty('multipleOf')) {
      this.step = property.multipleOf;
    } else if (property.type === 'number') {
      this.step = 'any';
    } else {
      this.step = 1;
    }

    // this.id = `brightness-${Utils.escapeHtmlForIdClass(this.name)}`;
  }




  update(brightness) {
    if (!this.brightness) {
      return;
    }

    this.brightness.value = brightness;
  }

  set() {
    this.thing.setProperty(this.name, this.brightness.value);
  }
}

export default BrightnessDetail;
