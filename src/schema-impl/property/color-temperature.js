
export default class ColorTemperatureDetail {
  constructor(thing, name, property) {
    this.thing = thing;
    this.name = name;
    this.readOnly = !!property.readOnly;
    this.label = property.title || 'color-temperature';
    this.min = property.minimum;
    this.max = property.maximum;

    if (property.hasOwnProperty('multipleOf')) {
      this.step = property.multipleOf;
    } else if (property.type === 'number') {
      this.step = 'any';
    } else {
      this.step = 1;
    }
  }

  attach() {
    this.temperature = this.thing.element.querySelector(`#${this.id}`);
    this.temperature.addEventListener('change', this.set.bind(this));
  }

 

  update(temperature) {
    if (!this.temperature) {
      return;
    }

    this.temperature.value = temperature;
  }

  set() {
    this.thing.setProperty(this.name, this.temperature.value);
  }
}


