import numeral from 'numeral'

export const decimal = value => typeof value !== 'undefined' ? numeral(value).format('0.00') : ''
export const currency = value => typeof value !== 'undefined' ? numeral(value).format('0,0') : ''
export const dollar = value => typeof value !== 'undefined' ? '$' + numeral(value).format('0,0.00') : ''
export const percent = value => typeof value !== 'undefined' ? numeral(value).format('0%') : ''
