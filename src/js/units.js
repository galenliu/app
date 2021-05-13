/**
 * Unit utility functions.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */


import {App} from "../App"
import {useEffect, useRef} from "react";


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


      case 'hertz':


      case 'amp':
      case 'amps':
      case 'ampere':
      case 'amperes':


      case 'watt':
      case 'watts':


      case 'kilowatt hour':
      case 'kilowatt-hour':
      case 'kilowatt hours':
      case 'kilowatt-hours':


      case 'percent':


      case 'degree fahrenheit':
      case 'degrees fahrenheit':
      case 'fahrenheit':

      case 'degree celsius':
      case 'degrees celsius':
      case 'celsius':


      case 'kelvin':


      case 'meter':
      case 'meters':
      case 'metre':
      case 'metres':

      case 'kilometer':
      case 'kilometers':
      case 'kilometre':
      case 'kilometres':


      case 'day':
      case 'days':


      case 'hour':
      case 'hours':

      case 'minute':
      case 'minutes':


      case 'second':
      case 'seconds':

      case 'millisecond':
      case 'milliseconds':


      case 'foot':
      case 'feet':

      case 'micrograms per cubic metre':
      case 'micrograms per cubic meter':


      case 'hectopascal':
      case 'hectopascals':


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
        if ((toUnit || App.UNITS.temperature) === 'degree fahrenheit') {
          toUnit = App.UNITS.temperature;
          value = value * 1.8 + 32;
        }
        break;
      case 'degree fahrenheit':
      case 'degrees fahrenheit':
      case 'fahrenheit':
        if ((toUnit || App.UNITS.temperature) === 'degree celsius') {
          toUnit = App.UNITS.temperature;
          value = (value - 32) / 1.8;
        }
        break;
      default:
        break;
    }

    return {value, unit: toUnit || fromUnit};
  },
};


const useDebounce = (fn, ms = 30, deps = []) => {
  let timeout = useRef()
  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      fn()
    }, ms)
  }, deps)

  const cancel = () => {
    clearTimeout(timeout.current)
    timeout = null
  }

  return [cancel]
}


export default Units
