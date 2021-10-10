let converters = {}

converters.date = (val, format) => {
	let date
	let FORMAT_DMY = /(\d{2})-(\d{2})-(\d{4})/
	let FORMAT_HM = /(\d{2}):(\d{2})/

	if (val != null) {
		switch (format) {
			case 'DD-MM-YYYY':
				date = new Date(val.replace( FORMAT_DMY, "$2/$1/$3" ))
				break;
	
			case 'DD-MM-YYYY HH:mm':
				let FORMAT_DMYHM = new RegExp(FORMAT_DMY.source + ' ' + FORMAT_HM.source)
				date = new Date(val.replace( FORMAT_DMYHM, "$2/$1/$3 $4:$5" ))
				break;
		
			default:
				date = null
				break;
		}
	} else {
		date = null
	}

	return date
}

export default converters