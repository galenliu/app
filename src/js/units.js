

const Units = {
    /**
     * Try to get an abbreviation for the provided unit name.
     *
     * @param {string} unit - Unit to abbreviate
     * @returns {string} Abbreviated unit.
     */
    nameToAbbreviation: (unit) => {
        if (!unit) {
            return '';
        }

        switch (unit.toLowerCase()) {
            case 'volt':
            case 'volts':
                return 'volt';

            case 'hertz':
                return 'hertz';

            case 'amp':
            case 'amps':
            case 'ampere':
            case 'amperes':
                return amp;

            case 'watt':
            case 'watts':
                return watt;

            case 'kilowatt hour':
            case 'kilowatt-hour':
            case 'kilowatt hours':
            case 'kilowatt-hours':
                return 'kilowatt hour';

            case 'percent':
                return 'percent';

            case 'degree fahrenheit':
            case 'degrees fahrenheit':
            case 'fahrenheit':
                return fluent.getMessage('abbrev-fahrenheit');

            case 'degree celsius':
            case 'degrees celsius':
            case 'celsius':
                return fluent.getMessage('abbrev-celsius');

            case 'kelvin':
                return fluent.getMessage('abbrev-kelvin');

            case 'meter':
            case 'meters':
            case 'metre':
            case 'metres':
                return fluent.getMessage('abbrev-meter');

            case 'kilometer':
            case 'kilometers':
            case 'kilometre':
            case 'kilometres':
                return fluent.getMessage('abbrev-kilometer');

            case 'day':
            case 'days':
                return fluent.getMessage('abbrev-day');

            case 'hour':
            case 'hours':
                return fluent.getMessage('abbrev-hour');

            case 'minute':
            case 'minutes':
                return fluent.getMessage('abbrev-minute');

            case 'second':
            case 'seconds':
                return fluent.getMessage('abbrev-second');

            case 'millisecond':
            case 'milliseconds':
                return fluent.getMessage('abbrev-millisecond');

            case 'foot':
            case 'feet':
                return fluent.getMessage('abbrev-foot');

            case 'micrograms per cubic metre':
            case 'micrograms per cubic meter':
                return fluent.getMessage('abbrev-micrograms-per-cubic-meter');

            case 'hectopascal':
            case 'hectopascals':
                return fluent.getMessage('abbrev-hectopascal');

            default:
                return unit;
        }
    },

    /**
     * Convert a value according to user preferences.
     *
     * @param {*} value - Value to convert
     * @param {string} fromUnit - Unit to convert from
     * @param {string?} toUnit - Unit to convert to (if omitted, user preference
     *                           is used).
     * @returns {object} Object containing output value and unit.
     */
    convert: (value, fromUnit, toUnit) => {
        switch (fromUnit) {
            case 'degree celsius':
            case 'degrees celsius':
            case 'celsius':
                if (toUnit   === 'degree fahrenheit') {
                    value = value * 1.8 + 32;
                }
                break;
            case 'degree fahrenheit':
            case 'degrees fahrenheit':
            case 'fahrenheit':
                if (toUnit   === 'degree celsius') {
                    value = (value - 32) / 1.8;
                }
                break;
            default:
                break;
        }
        return {value, unit: toUnit || fromUnit};
    },
};

export default Units
