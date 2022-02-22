
import Thing from './thing';

export default class BinarySensor extends Thing {
  /**
   * BinarySensor Constructor (extends Thing).
   *
   * @param {Object} description Thing description object.
   * @param {Number} format See Constants.ThingFormat
   */
  constructor(model, description, format) {
    super(model, description, format, {
      baseIcon: '/images/thing-icons/binary_sensor.svg',
    });
  }

  /**
   * Find any properties required for this view.
   */
  findProperties() {
    this.onProperty = null;

    // Look for properties by type first.
    for (const name in this.displayedProperties) {
      const type = this.displayedProperties[name].property['@type'];

      if (type === 'BooleanProperty') {
        this.onProperty = name;
        break;
      }
    }

    // If necessary, match on name.
    if (this.onProperty === null && this.displayedProperties.hasOwnProperty('on')) {
      this.onProperty = 'on';
    }
  }

  get icon() {
    return this.element.querySelector('webthing-binary-sensor-capability');
  }

  /**
   * Update the display for the provided property.
   * @param {string} name - name of the property
   * @param {*} value - value of the property
   */
  updateProperty(name, value) {
    value = super.updateProperty(name, value);

    if (!this.displayedProperties.hasOwnProperty(name)) {
      return;
    }

    if (name === this.onProperty) {
      this.icon.on = !!value;
    }
  }


}

