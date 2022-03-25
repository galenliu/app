export function escapeHtmlForIdClass(text) {
    if (typeof text !== 'string') {
        text = `${text}`;
    }

    text = text.replace(/[^_a-zA-Z0-9-]/g, '_');
    if (/^[0-9-]/.test(text)) {
        text = `_${text}`;
    }

    return text;
}

export function colorTemperatureToRGB(value) {
    /**
     * Algorithm found here:
     * http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
     */
    value /= 100;

    let r;
    if (value <= 66) {
        r = 255;
    } else {
        r = value - 60;
        r = 329.698727446 * r ** -0.1332047592;
        r = Math.max(r, 0);
        r = Math.min(r, 255);
    }

    let g;
    if (value <= 66) {
        g = value;
        g = 99.4708025861 * Math.log(g) - 161.1195681661;
    } else {
        g = value - 60;
        g = 288.1221695283 * g ** -0.0755148492;
    }

    g = Math.max(g, 0);
    g = Math.min(g, 255);

    let b;
    if (value >= 66) {
        b = 255;
    } else if (value <= 19) {
        b = 0;
    } else {
        b = value - 10;
        b = 138.5177312231 * Math.log(b) - 305.0447927307;
        b = Math.max(b, 0);
        b = Math.min(b, 255);
    }

    r = Math.round(r).toString(16);
    g = Math.round(g).toString(16);
    b = Math.round(b).toString(16);

    return `#${r}${g}${b}`;
}

export function selectFormHref(
    forms,
    operation,
    base
) {

    return [...forms].reverse().find((selectedForm) => {
        try {
            const {protocol} = new URL(selectedForm.href, base);

            return (
                (protocol === 'http:' || protocol === 'https:') &&
                (!selectedForm.op || selectedForm.op === operation || selectedForm.op.includes(operation))
            );
        } catch (error) {
            if (error instanceof TypeError) {
                // URL is relative and no base was given or not well formatted
                return (
                    !selectedForm.op || selectedForm.op === operation || selectedForm.op?.includes(operation)
                );
            }
            throw error;
        }
    })?.href;
}

export function adjustInputValue(value, schema) {
    if (typeof value !== 'number') {
        return value;
    }

    let multipleOf = schema.multipleOf;
    if (typeof multipleOf !== 'number' && schema.type === 'integer') {
        multipleOf = 1;
    }

    if (typeof multipleOf === 'number') {
        value = Math.round(value / multipleOf) * multipleOf;

        // Deal with floating point nonsense
        if (`${multipleOf}`.includes('.')) {
            const precision = `${multipleOf}`.split('.')[1].length
            value = Number(value.toFixed(precision))
        }
    }

    if (schema.hasOwnProperty('minimum')) {
        value = Math.max(value, schema.minimum);
    }

    if (schema.hasOwnProperty('maximum')) {
        value = Math.min(value, schema.maximum)
    }

    // If there is an enum, match the closest enum value
    if (schema.hasOwnProperty('enum')) {
        value = (schema.enum).sort((a, b) => Math.abs(a - value) - Math.abs(b - value))[0]
    }

    return value
}
