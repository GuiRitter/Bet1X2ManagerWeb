import Decimal from 'decimal.js';

export const decimal = value => {
	try {
		return Decimal(value);
	} catch {
		return Decimal("NaN");
	}
};