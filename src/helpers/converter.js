let converters = {}

converters.string = (val, def='') => {
	return (val != null) ? val : def
}

converters.string_format = (str, format) => {
	return (str != '') ? format.replace('{}', str) : ''
}

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

converters.weekDay = (val) => {
	let month = val.toLocaleString('id-id', { weekday: "long" });
	return month
}

converters.monthName = (val) => {
	let month = val.toLocaleString('id-id', { month: "long" });
	return month
}

converters.fullDate = (val) => {
	let date = val.toLocaleString('id-ID', {'day': '2-digit', 'month': 'long', 'year': 'numeric',})
	return date
}

converters.array_text = (txt, max_length) => {
	let result

	if (txt != null) {
		result = []
		const words = txt.split(" ")
		let str = ''

		for (const key in words) {
			let str1 = (str == '') ? words[key] : str + ' ' + words[key]
			
			if (str1.length <= max_length) {
				str = str1
			} else {
				result.push(str)
				str = words[key]
			}
	
			if (key == words.length - 1) {
				result.push(str)
			}
		}	
	} else {
		result = ''
	}

	return result
}

// PDF display
converters.sarkut = (data) => {
	let parsedData = {
		nama: '',
		flight: '',
		kapasitas: '',
		pilot: '',
		bendera: '',
		no_reg: ''
	}

	if (data != null) {
		let nama_sarkut = converters.string_format(converters.string(data.nama_sarkut), '{} ')
		let jenis_sarkut = converters.string_format(converters.string(data.jenis_sarkut), '({})')
		let nama = nama_sarkut + jenis_sarkut

		let flight = converters.string(data.no_flight_trayek)

		let jml_kapasitas = converters.string_format(converters.string(data.kapasitas), '{} ')
		let satuan_kapasitas = converters.string(data.satuan_kapasitas)
		let kapasitas = jml_kapasitas + satuan_kapasitas

		let pilot = converters.string(data.nama_pilot_pengemudi)
		
		let bendera = converters.string(data.bendera)

		let no_reg = converters.string(data.no_reg_polisi)

		parsedData = {
			nama: nama,
			flight: flight,
			kapasitas: kapasitas,
			pilot: pilot,
			bendera: bendera,
			no_reg: no_reg
		}
	}

	return parsedData
}

converters.barang = (data) => {
	let parsedData = {
		kemasan: '',
		dokumen: '',
		pemilik: ''
	}

	if (data != null) {
		let jumlah_kemasan = converters.string_format(converters.string(data.jumlah_kemasan), '{} ')
		let satuan_kemasan = converters.string(data.satuan_kemasan)
		let kemasan = jumlah_kemasan + satuan_kemasan

		let jenis_dok = converters.string_format(converters.string(data.jenis_dok), '{} ')
		let no_dok = converters.string_format(converters.string(data.no_dok), '{} ')
		let dt_dok = converters.date(data.tgl_dok, 'DD-MM-YYYY')
		let full_date = (dt_dok != null) ? converters.fullDate(dt_dok) : ''
		let tgl_dok = full_date != '' ? converters.string_format(converters.string(full_date), 'tanggal {}') : ''
		let dokumen = jenis_dok + no_dok + tgl_dok

		let pemilik = converters.string(data.pemilik)

		parsedData = {
			kemasan: kemasan,
			dokumen: dokumen,
			pemilik: pemilik
		}
	}

	return parsedData
}

converters.bangunan = (data) => {
	let parsedData = {
		alamat: '',
		no_reg: '',
		pemilik: ''
	}

	if (data != null) {
		let alamat = converters.string(data.alamat).replace('\n', ' ')
		
		let no_reg = converters.string(data.no_reg)
		
		let nama_pemilik = converters.string_format(converters.string(data.pemilik), '{} ')
		let jns_identitas = converters.string(data.jns_identitas)
		let no_identitas = converters.string(data.no_identitas)
		let pemilik = nama_pemilik + converters.string_format(jns_identitas + ' ' + no_identitas, '({})')

		parsedData = {
			alamat: alamat,
			no_reg: no_reg,
			pemilik: pemilik
		}
	}

	return parsedData
}

converters.badan = (data) => {
	let parsedData = {
		nama: '',
		tgl_lahir: '',
		warga_negara: '',
		alamat: '',
		identitas: ''
	}

	if (data != null) {
		let nama = converters.string(data.nama)
		
		let tgl_lahir = converters.string(data.tgl_lahir)
		
		let warga_negara = converters.string(data.warga_negara)
		
		let alamat = converters.string(data.alamat).replace('\n', ' ')

		let jns_identitas = converters.string_format(converters.string(data.jns_identitas), '{} ')
		let no_identitas = converters.string(data.no_identitas)
		let identitas = jns_identitas + no_identitas

		parsedData = {
			nama: nama,
			tgl_lahir: tgl_lahir,
			warga_negara: warga_negara,
			alamat: alamat,
			identitas: identitas
		}
	}

	return parsedData
}

converters.item_barang = (data) => {
	let preparedData = []
	for (let index = 0; index < data.length; index++) {
		let entry = {
			no: (index+1).toString(),
			uraian: data[index]['uraian_barang'],
			jumlah: data[index]['jumlah_barang'] + ' ' + data[index]['satuan_barang']
		}

		preparedData.push(entry)
	}

	return preparedData
}

export default converters