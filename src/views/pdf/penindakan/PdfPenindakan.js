import MyPdf from "../MyPdf";

class PdfPenindakan extends MyPdf {
	opening()
	{
		let tgl_penindakan = this.data.penindakan.tanggal_selesai_penindakan
			? this.prepareDate(this.data.penindakan.tanggal_selesai_penindakan)
			: ''

		let tgl_sprint = this.data.penindakan.sprint
			? this.data.penindakan.sprint.tanggal_sprint
				? this.prepareDate(this.data.penindakan.sprint.tanggal_sprint)
				: ''
			: ''

		let jabatan = this.data.penindakan.sprint
			? this.data.penindakan.sprint.pejabat.jabatan || ''
			: ''

		let txt = [
			`  Pada hari ini ${tgl_penindakan.hr} tanggal ${tgl_penindakan.tgl} bulan ${tgl_penindakan.bln} tahun ${tgl_penindakan.thn}.`,
			`Berdasarkan Surat Perintah : ${jabatan} Nomor ${this.data.penindakan.sprint.nomor_sprint} Tanggal ${tgl_sprint.short_tgl}.`
		]

		return txt
	}

	convertSarkut(data) 
	{
		let txt = {}

		txt.nama_sarkut = data ? data.nama_sarkut || '' : ''
		txt.jenis_sarkut = data 
			? data.jenis_sarkut
			: ''
		txt.nama_jenis_sarkut = txt.nama_sarkut != ''
			? txt.jenis_sarkut != ''
				? txt.nama_sarkut + ' / ' + txt.jenis_sarkut
				: txt.nama_sarkut
			: txt.jenis_sarkut != ''
				? txt.jenis_sarkut
				: ''

		txt.nomor_sarkut = data ? data.nomor_sarkut || '' : ''

		let jumlah_kapasitas = data ? data.jumlah_kapasitas || '' : ''
		let satuan_kapasitas = data ? data.satuan_kapasitas || '' : ''
		txt.kapasitas = jumlah_kapasitas + ' ' + satuan_kapasitas

		let pengemudi = data ? this.convertBadan({entitas: data.pengemudi}) : {nama: '', identitas: ''}
		txt.pengemudi = pengemudi.nama
		txt.identitas_pengemudi = pengemudi.identitas

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

		txt.komoditi = data
			? data.item
				? data.item.length > 0
					? data.item.length == 1
						? data.item[0]['uraian_barang']
						: `${data.item.length} ITEM, LIHAT LAMPIRAN`
					: ''
				: ''
			: ''

		txt.jumlah = data
			? data.item
				? data.item.length > 0
					? data.item.length == 1
						? `${data.item[0]['jumlah_barang']} ${data.item[0]['satuan']['satuan']}`
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

		let pemilik = data ? this.convertBadan({entitas: data.pemilik}) : {nama: '', identitas: ''}
		txt.pemilik = pemilik.nama
		txt.identitas_pemilik = pemilik.identitas

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

		let pemilik = data ? this.convertBadan({entitas: data.pemilik}) : {nama: '', identitas: ''}
		txt.pemilik = pemilik.nama
		txt.identitas_pemilik = pemilik.identitas

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
		txt.alias = data
			? data.entitas
				? data.entitas.alias
				: ''
			: ''
		txt.tempat_lahir = data
			? data.entitas
				? data.entitas.tempat_lahir
				: ''
			: ''	
		txt.tanggal_lahir = data
			? data.entitas
				? data.entitas.tanggal_lahir
				: ''
			: ''
		txt.ttl = txt.tempat_lahir != ''
			? txt.tanggal_lahir != ''
				? `${txt.tempat_lahir} / ${txt.tanggal_lahir}`
				: txt.tempat_lahir
			: txt.tanggal_lahir != ''
				? txt.tanggal_lahir
				: ''
		txt.jenis_kelamin = data
			? data.entitas
				? data.entitas.jenis_kelamin
					? data.entitas.jenis_kelamin.uraian
					: ''
				: ''
			: ''
		txt.agama = data
			? data.entitas
				? data.entitas.agama
				: ''
			: ''
		txt.warga_negara = data
			? data.entitas
				? data.entitas.warga_negara
					? data.entitas.warga_negara.nama_negara
					: ''
				: ''
			: ''
		txt.alamat_tinggal = data
			? data.entitas
				? this.converters.string(data.entitas.alamat_tinggal) || ''
				: ''
			: ''
		txt.alamat_identitas = data
			? data.entitas
				? this.converters.string(data.entitas.alamat_identitas) || ''
				: ''
			: ''
		txt.alamat = txt.alamat_tinggal != ''
			? txt.alamat_tinggal
			: txt.alamat_identitas != ''
				? txt.alamat_identitas
				: ''
		txt.pekerjaan = data
			? data.entitas
				? data.entitas.pekerjaan
				: ''
			: ''

		txt.identitas = ''
		txt.penerbit_identitas = ''
		if (data) {
			if (data.entitas) {
				if (data.entitas.identitas.length > 0) {
					let identitas = data.entitas.identitas.filter(function (id) {
						if (id['jenis'] == 'KTP') {
							return id
						} else if (id['jenis'] == 'PASPOR') {
							return id
						}
					})
	
					if (identitas.length > 0) {
						var selected_identitas = identitas[0]
					} else {
						var selected_identitas = data.entitas.identitas[0]
					}

					txt.identitas = `${selected_identitas['jenis']} ${selected_identitas['nomor']}`
					txt.penerbit_identitas = selected_identitas.tempat_penerbitan
						? selected_identitas.pejabat_penerbit
							? `${selected_identitas.tempat_penerbitan} / ${selected_identitas.pejabat_penerbit}`
							: selected_identitas.tempat_penerbitan
						: selected_identitas.pejabat_penerbit
							? selected_identitas.pejabat_penerbit
							: ''
				}	
			}
		}

		return txt
	}

	writeSarkut(data, sbp=false) 
	{
		let data_sarkut = this.convertSarkut(data)

		this.pdf.setFont('Helvetica', 'bold')
		this.write('a.', this.inds.alp)
		this.write('Sarana Pengangkut:', this.inds.dtl)	
		this.pdf.setFont('Helvetica', 'normal')
		this.break()

		this.write('Nama dan Jenis Sarkut', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_sarkut.nama_jenis_sarkut, this.inds.txt)
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

		if (!sbp) {
			this.write('Nomor Identitas', this.inds.dtl)
			this.write(':', this.inds.cln)
			this.write(data_sarkut.identitas_pengemudi, this.inds.txt)
			this.break()
		}

		this.write('Bendera', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_sarkut.bendera, this.inds.txt)
		this.break()

		this.write('Nomor Register / Polisi*', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_sarkut.registrasi_sarkut, this.inds.txt)
		this.break()
	}

	writeBarang(data, sbp=false) 
	{
		let data_barang = this.convertBarang(data)

		this.pdf.setFont('Helvetica', 'bold')
		this.write('b.', this.inds.alp)
		this.write('Barang:', this.inds.dtl)
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

		if (!sbp) {
			this.write('Nomor Identitas', this.inds.dtl)
			this.write(':', this.inds.cln)
			this.write(data_barang.identitas_pemilik, this.inds.txt)
			this.break()
		}
	}

	writeBangunan(data, sbp=false) 
	{
		let data_bangunan = this.convertBangunan(data)

		this.pdf.setFont('Helvetica', 'bold')
		this.write('c.', this.inds.alp)
		this.write('Bangunan:', this.inds.dtl)
		this.pdf.setFont('Helvetica', 'normal')
		this.break()

		this.write('Alamat Bangunan / Tempat', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_bangunan.alamat, this.inds.txt)
		this.break()

		this.write('No Reg Bangunan / NPPBKC / NPWP / dll.', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_bangunan.no_reg, this.inds.txt)
		this.break()

		this.write('Nama Pemilik / Yang Menguasai*', this.inds.dtl)
		this.write(':', this.inds.cln)
		this.write(data_bangunan.pemilik, this.inds.txt)
		this.break()

		if (!sbp) {
			this.write('Nomor Identitas', this.inds.dtl)
			this.write(':', this.inds.cln)
			this.write(data_bangunan.identitas_pemilik, this.inds.txt)
			this.break()
		}
	}

	writeBadan(data, sbp=false)
	{
		let data_badan = this.convertBadan(data)

		this.pdf.setFont('Helvetica', 'bold')
		this.write('d.', this.inds.alp)
		this.write('Badan:', this.inds.dtl)
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

	writeSaksi(data) 
	{
		let data_saksi = this.convertBadan({entitas: data})
		this.write('Pemeriksaan disaksikan oleh pengangkut/pemilik/importir/eksportir atau kuasanya/ketua lingkungan/dll*:')
		this.break()

		this.write('Nama')
		this.write(':', this.inds.cln_saksi)
		this.write(data_saksi.nama, this.inds.txt_saksi)
		this.break()

		this.write('Alamat')
		this.write(':', this.inds.cln_saksi)
		this.write(data_saksi.alamat, this.inds.txt_saksi)
		this.break()

		this.write('Pekerjaan')
		this.write(':', this.inds.cln_saksi)
		this.write(data_saksi.pekerjaan, this.inds.txt_saksi)
		this.break()

		this.write('Nomor Identitas')
		this.write(':', this.inds.cln_saksi)
		this.write(data_saksi.identitas, this.inds.txt_saksi)
		this.break(1)
	}
}

export default PdfPenindakan