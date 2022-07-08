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

converters.numTerbilang = (val) => {
	let abil = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"]
	if (val < 12) {
		return abil[val]
	} else if (val < 20) {
		return converters.numTerbilang(val - 10) + ' belas'
	} else if (val < 100) {
		return converters.numTerbilang(Math.floor(parseInt(val)/10)) + ' puluh ' + converters.numTerbilang(parseInt(val)%10)
	} else if (val < 200) {
		return 'seratus ' + converters.numTerbilang(parseInt(val)-100);
	} else if (val < 1000){
		return converters.numTerbilang(Math.floor(parseInt(val)/100)) + " ratus " + converters.numTerbilang(parseInt(val)%100);
	} else if (val < 2000){
		return "seribu " + converters.numTerbilang(parseInt(val)-1000);
	} else if (val < 1000000){
		return converters.numTerbilang(Math.floor(parseInt(val)/1000))+" ribu "+converters.numTerbilang(parseInt(val)%1000);
	} else if (val < 1000000000){
		return converters.numTerbilang(Math.floor(parseInt(val)/1000000))+" juta "+converters.numTerbilang(parseInt(val)%1000000);
	} else if (val < 1000000000000){
		return converters.numTerbilang(Math.floor(parseInt(val)/1000000000))+" milyar "+converters.numTerbilang(parseInt(val)%1000000000);
	} else if (val < 1000000000000000){
		return converters.numTerbilang(Math.floor(parseInt(val)/1000000000000))+" trilyun "+converters.numTerbilang(parseInt(val)%1000000000000);
	}
}

// PDF display
converters.sarkut = (data) => {
	let parsedData = {
		nama: '',
		flight: '',
		kapasitas: '',
		pilot: '',
		identitas: '',
		bendera: '',
		no_reg: ''
	}

	if (data != null) {
		let nama_sarkut = converters.string_format(converters.string(data.nama_sarkut), '{} ')
		let jenis_sarkut = converters.string_format(converters.string(data.jenis_sarkut), '({})')
		let nama = nama_sarkut + jenis_sarkut

		let flight = converters.string(data.no_flight_trayek)

		let jumlah_kapasitas = converters.string_format(converters.string(data.jumlah_kapasitas), '{} ')
		let satuan_kapasitas = converters.string(data.satuan_kapasitas)
		let kapasitas = jumlah_kapasitas + satuan_kapasitas

		let pilot = converters.string(data.pilot.nama)

		let jenis_identitas = converters.string_format(converters.string(data.pilot.jenis_identitas), '({}) ')
		let nomor_identitas = converters.string(data.pilot.nomor_identitas)
		let identitas = jenis_identitas + nomor_identitas
		
		let bendera = converters.string(data.bendera)

		let no_reg = converters.string(data.no_reg_polisi)

		parsedData = {
			nama: nama,
			flight: flight,
			kapasitas: kapasitas,
			pilot: pilot,
			identitas: identitas,
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
		pemilik: '',
		identitas: '',
	}

	if (data != null) {
		let jumlah_kemasan = converters.string_format(converters.string(data.jumlah_kemasan), '{} ')
		let satuan_kemasan = converters.string(data.kemasan.kode_kemasan)
		let kemasan = jumlah_kemasan + satuan_kemasan

		if (data.dokumen != null) {
			let jenis_dok = converters.string_format(converters.string(data.dokumen.jns_dok), '{} ')
			let nomor_dok = converters.string_format(converters.string(data.dokumen.no_dok), '{} ')
			let dt_dok = converters.date(data.dokumen.tgl_dok, 'DD-MM-YYYY')
			let full_date = (dt_dok != null) ? converters.fullDate(dt_dok) : ''
			let tgl_dok = full_date != '' ? converters.string_format(converters.string(full_date), 'tanggal {}') : ''
			var dokumen = jenis_dok + nomor_dok + tgl_dok	
		} else {
			var dokumen = '-'
		}

		let pemilik = converters.string(data.pemilik.nama)

		let jenis_identitas = converters.string_format(converters.string(data.pemilik.jenis_identitas), '({}) ')
		let nomor_identitas = converters.string(data.pemilik.nomor_identitas)
		let identitas = jenis_identitas + nomor_identitas

		parsedData = {
			kemasan: kemasan,
			dokumen: dokumen,
			pemilik: pemilik,
			identitas: identitas
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
		
		let nama_pemilik = converters.string_format(converters.string(data.pemilik.nama), '{} ')
		let jenis_identitas = converters.string(data.pemilik.jenis_identitas)
		let nomor_identitas = converters.string(data.pemilik.nomor_identitas)
		let pemilik = nama_pemilik + converters.string_format(jenis_identitas + ' ' + nomor_identitas, '({})')

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
		
		let tgl_lahir = converters.string(data.tanggal_lahir)
		
		let warga_negara = converters.string(data.warga_negara.nama_negara)
		
		let alamat = converters.string(data.alamat_identitas).replace('\n', ' ')

		let jns_identitas = converters.string_format(converters.string(data.jenis_identitas), '{} ')
		let no_identitas = converters.string(data.nomor_identitas)
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
			jumlah: data[index]['jumlah_barang'] + ' ' + data[index]['satuan']['kode_satuan']
		}

		preparedData.push(entry)
	}

	return preparedData
}

export default converters