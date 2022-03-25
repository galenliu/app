

export  default class StringDetail {
  constructor(thing, name, property) {
    this.thing = thing;
    this.name = name;
    this.readOnly = !!property.readOnly;
    this.label = property.title || name;
    // this.id = `string-${Utils.escapeHtmlForIdClass(this.name)}`;
  }




}


