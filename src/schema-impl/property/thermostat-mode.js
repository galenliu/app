import EnumDetail from './enum';


export default class ThermostatModeDetail extends EnumDetail {
    constructor(thing, name, property) {
        super(thing, name, property);
        this.id = `thermostat-mode-${Utils.escapeHtmlForIdClass(this.name)}`;
    }

}


