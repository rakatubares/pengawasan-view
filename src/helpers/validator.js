// https://stackoverflow.com/questions/43608457/#answer-63431421
let validators = {}

validators.required = (val) => {
	return val ? val.length >= 1 : false
}

validators.number = (val) => {
	return (!Number.isNaN(Number(val))) && (Number(val) > 0)
}

validators.integer = (val) => {
	return Number(val) === parseInt(val, 10)
}

validators.date = (val) => {
	return (val instanceof Date)
}

validators.dateSequence = (valInitial, valFinal) => {
	return valInitial <= valFinal
}

validators.array = (arr) => {
	let validations = []
	for (const key in arr) {
		const value = arr[key]['value']
		let validation = validators.required(value)
		validations.push(validation)
		let allValid = validations.every(Boolean)
		return allValid
	}
}

export default validators