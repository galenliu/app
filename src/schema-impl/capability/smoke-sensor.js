import Thing from './thing';

export default class SmokeSensor extends Thing {
  /**
   * SmokeSensor Constructor (extends Thing).
   *
   * @param {Object} description Thing description object.
   * @param {Number} format See Constants.ThingFormat
   */
  constructor(model, description, format) {
    super(model, description, format, {
      baseIcon: '/images/thing-icons/smoke_sensor.svg',
    });
  }

  /**
   * Find any properties required for this view.
   */
  findProperties() {
    this.smokeProperty = null;

    // Look for properties by type first.
    for (const name in this.displayedProperties) {
      const type = this.displayedProperties[name].property['@type'];

      if (type === 'SmokeProperty') {
        this.smokeProperty = name;
        break;
      }
    }
  }

  get icon() {
    return this.element.querySelector('webthing-smoke-sensor-capability');
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

    if (name === this.smokeProperty) {
      this.icon.smoke = !!value;
    }
  }

}


