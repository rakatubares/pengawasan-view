import MyPdf from "../MyPdf";

class PdfPenindakan extends MyPdf {
	convertSarkut(data) 
	{
		let txt = {}

		let nama = data ? data.nama_sarkut || '' : ''
		let jenis = data 
			? data.jenis_sarkut
				? `(${data.jenis_sarkut})` 
				: '' 
			: ''
		txt.nama_sarkut = nama + ' ' + jenis

		txt.nomor_sarkut = data ? data.nomor_sarkut || '' : ''

		let jumlah_kapasitas = data ? data.jumlah_kapasitas || '' : ''
		let satuan_kapasitas = data ? data.satuan_kapasitas || '' : ''
		txt.kapasitas = jumlah_kapasitas + ' ' + satuan_kapasitas

		txt.pengemudi = data
			? data.pengemudi
				? data.pengemudi.nama
				: ''
			: ''

		txt.bendera = data
			? data.bendera
				? data.bendera.nama_negara
				: ''
			: ''

		txt.registrasi_sarkut = data ? data.registrasi_sarkut || '' : ''

		return txt
	}

	convertBarang(data) 
	{
		let txt = {}
		
		let jumlah_kemasan = data ? data.jumlah_kemasan || '' : ''
		let jenis_kemasan = data
			? data.kemasan
				? data.kemasan.kemasan
				: ''
			: ''
		let nomor_kemasan = data
			? data.nomor_kemasan
				? `(No: ${data.nomor_kemasan})`
				: ''
			: ''
		txt.kemasan = `${jumlah_kemasan} ${jenis_kemasan} ${nomor_kemasan}`

		txt.barang = data
			? data.item
				? data.item.length > 0
					? data.item.length == 1
						? `${data.item[0]['jumlah_barang']} ${data.item[0]['satuan']['satuan']} ${data.item[0]['uraian_barang']}`
						: `${data.item.length} ITEM, LIHAT LAMPIRAN`
					: ''
				: ''
			: ''

		let jenis_dokumen = data ? data.jenis_dokumen || '' : ''
		let nomor_dokumen = data ? data.nomor_dokumen || '' : ''
		let tanggal_dokumen = data 
			? data.tanggal_dokumen 
				? ` tanggal ${data.tanggal_dokumen}`
				: ''
			: ''
		txt.dokumen = `${jenis_dokumen} ${nomor_dokumen} ${tanggal_dokumen}`

		txt.pemilik = data
			? data.pemilik
				? data.pemilik.nama
				: ''
			: ''

		return txt
	}

	convertBangunan(data) 
	{
		let txt = {}

		txt.alamat = data 
			? data.alamat 
				? this.converters.string(data.alamat)
				: ''
			: ''
		txt.no_reg = data ? data.no_reg || '' : ''
		txt.pemilik = data
			? data.pemilik
				? data.pemilik.nama
				: ''
			: ''

		return txt
	}

	convertBadan(data)
	{
		let txt = {}

		txt.nama = data
			? data.entitas
				? data.entitas.nama
				: ''
			: ''
		txt.tanggal_lahir = data
			? data.entitas
				? data.entitas.tanggal_lahir
				: ''
			: ''
		txt.warga_negara = data
			? data.entitas
				? data.entitas.warga_negara
					? data.entitas.warga_negara.nama_negara
					: ''
				: ''
			: ''
		txt.alamat = data
			? data.entitas
				? data.entitas.alamat_identitas
					? this.converters.string(data.entitas.alamat_identitas)
					: data.entitas.alamat_tinggal
						? this.converters.string(data.entitas.alamat_tinggal)
						: ''
				: ''
			: ''

		txt.identitas = ''
		if (data) {
			if (data.entitas) {
				if (data.entitas.identitas.length > 0) {
					let identitas = data.entitas.identitas.filter(function (id) {
						if (id['jenis'] == 'NPWP') {
							return id
						}
					})
	
					if (identitas.length > 0) {
						txt.identitas = `${identitas[0]['jenis']} ${identitas[0]['nomor']}`
					} else {
						txt.identitas = `${data.entitas.identitas[0].jenis} ${data.entitas.identitas[0].nomor}`
					}
				}	
			}
		}

		return txt
	}

	writeSarkut(data) 
	{
		let data_sarkut = this.convertSarkut(data)

		this.pdf.setFont('Helvetica', 'bold')
		this.write('a.', this.inds.alp)
		this.write('Sarana Pengangkut* :', this.inds.dtl)
		this.pdf.setFont('Helvetica', 'normal')
		this.break()

		this.write('Nama dan Jenis Sarkut', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_sarkut.nama_sarkut, this.inds.txt)
		this.break()

		this.write('No. Voy / Penerbangan / Trayek*', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_sarkut.nomor_sarkut, this.inds.txt)
		this.break()

		this.write('Ukuran / Kapasitas Muatan', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_sarkut.kapasitas, this.inds.txt)
		this.break()

		this.write('Nahkoda / Pilot / Pengemudi*', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_sarkut.pengemudi, this.inds.txt)
		this.break()

		this.write('Bendera', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_sarkut.bendera, this.inds.txt)
		this.break()

		this.write('Nomor Register / Polisi*', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_sarkut.registrasi_sarkut, this.inds.txt)
		this.break()
	}

	writeBarang(data) 
	{
		let data_barang = this.convertBarang(data)

		this.pdf.setFont('Helvetica', 'bold')
		this.write('b.', this.inds.alp)
		this.write('Barang* :', this.inds.dtl)
		this.pdf.setFont('Helvetica', 'normal')
		this.break()

		this.write('Jumlah / Jenis / Ukuran Nomor', this.inds.dtl)
		this.break()
		this.write('Peti Kemas / Kemasan', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_barang.kemasan, this.inds.txt)
		this.break()

		this.write('Jumlah / Jenis Barang', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_barang.barang, this.inds.txt)
		this.break()

		this.write('Jenis / Nomor dan Tgl Dokumen', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_barang.dokumen, this.inds.txt)
		this.break()

		this.write('Pemilik / Importir / Eksportir / Kuasa*', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_barang.pemilik, this.inds.txt)
		this.break()
	}

	writeBangunan(data) 
	{
		let data_bangunan = this.convertBangunan(data)

		this.pdf.setFont('Helvetica', 'bold')
		this.write('c.', this.inds.alp)
		this.write('Bangunan* :', this.inds.dtl)
		this.pdf.setFont('Helvetica', 'normal')
		this.break()

		this.write('Alamat', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_bangunan.alamat, this.inds.txt)
		this.break()

		this.write('No Reg Bangunan / NPPBKC / dll.', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_bangunan.no_reg, this.inds.txt)
		this.break()

		this.write('Nama Pemilik / Yang Menguasai*', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_bangunan.pemilik, this.inds.txt)
		this.break()
	}

	writeBadan(data)
	{
		let data_badan = this.convertBadan(data)

		this.pdf.setFont('Helvetica', 'bold')
		this.write('d.', this.inds.alp)
		this.write('Badan* :', this.inds.dtl)
		this.pdf.setFont('Helvetica', 'normal')
		this.break()

		this.write('Nama', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_badan.nama, this.inds.txt)
		this.break()

		this.write('Tanggal Lahir', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_badan.tanggal_lahir, this.inds.txt)
		this.break()

		this.write('Kewarganegaraan', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_badan.warga_negara, this.inds.txt)
		this.break()

		this.write('Alamat', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_badan.alamat, this.inds.txt)
		this.break()

		this.write('Nomor Identitas', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_badan.identitas, this.inds.txt)
		this.break()
	}
}

export default PdfPenindakan