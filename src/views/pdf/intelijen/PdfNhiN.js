import Pdf from '../MyPdf'

const inds = {
	cln1: 30,
	val1: 35,
	lbl2: 125,
	cln2: 151,
	val2: 155,
	lbl3: 15,
	lbl4: 20,
	cln3: 110,
	val3: 115,
	indikasi: 25,
	ttd: 125,
	lamp: 150,
}

class PdfNhiN extends Pdf
{
	constructor(data, data_barang=null)
	{
		data.barang = data_barang
		super(data, 'NOTA HASIL INTELIJEN NPP')
	}

	generateText() 
	{
		this.prepareDocDate(this.data.tanggal_dokumen)
		this.txt = {}
		this.txt.tgl_lkain = this.converters.fullDate(this.data.tanggal_lkain)
		this.txt.nomor_lkain = this.data.nomor_lkain || ''
		this.txt.tujuan = `Yth. ${this.converters.string(this.data.tujuan)}`
		this.txt.tempat = this.converters.string(this.data.tempat_indikasi)
		let waktu = this.data.waktu_indikasi
			? this.data.zona_waktu
				? ` / ${this.data.waktu_indikasi} ${this.data.zona_waktu}`
				: ` / ${this.data.waktu_indikasi}`
			: ''
		let tanggal = this.data.tanggal_indikasi ? this.data.tanggal_indikasi : ''
		this.txt.waktu = `${tanggal}${waktu}`
		this.txt.kantor = this.converters.string(this.data.kantor.nama_kantor)

		///// Detail /////
		let detail_type = this.data.detail.type
		let detail_data = this.data.detail.data

		// Barang
		let txt_barang = '-'
		if (this.data.barang != null) {
			if (this.data.barang.length > 1) {
				txt_barang = 'LIHAT LAMPIRAN'
			} else if (this.data.barang.length == 1) {
				txt_barang = `${this.data.barang[0].jumlah_barang} `
					+ `${this.data.barang[0].satuan.satuan} `
					+ `${this.data.barang[0].uraian_barang}`
				txt_barang = this.converters.string(txt_barang)
			}	
		}

		// Exim
		this.txt.dok_exim = detail_type == 'nhin-exim'
			? detail_data.jenis_dok
				? detail_data.nomor_dok
					? detail_data.tanggal_dok
						? `${detail_data.jenis_dok} nomor ${detail_data.nomor_dok} tanggal ${detail_data.tanggal_dok}`
						: `${detail_data.jenis_dok} nomor ${detail_data.nomor_dok}`
					: detail_data.tanggal_dok 
						? `${detail_data.jenis_dok} tanggal ${detail_data.tanggal_dok}`
						: detail_data.jenis_dok
						: detail_data.nomor_dok
				? detail_data.tanggal_dok 
					? `${detail_data.nomor_dok} tanggal ${detail_data.tanggal_dok}`
					: detail_data.nomor_dok
				: ''
			: ''
		this.txt.sarkut_exim = detail_type == 'nhin-exim'
			? `${detail_data.nama_sarkut || '-'} Voy/Flight/No. Pol: ${detail_data.no_flight_trayek || '-'}`
			: ''
		this.txt.awb_exim = detail_type == 'nhin-exim'
			? detail_data.nomor_awb
				? detail_data.tanggal_awb
					? `${detail_data.nomor_awb} tanggal ${detail_data.tanggal_awb}` 
					: detail_data.nomor_awb
				: detail_data.tanggal_awb
					? `- tanggal ${detail_data.tanggal_awb}` 
					: ''
			: ''
		this.txt.koli_exim = detail_type == 'nhin-exim' 
			? this.converters.string(detail_data.merek_koli)
			: ''
		this.txt.entitas_exim = detail_type == 'nhin-exim' 
			? detail_data.entitas != null 
				? this.converters.string(detail_data.entitas.data.nama) 
				: ''
			: ''
		let txt_npwp_exim = ''
		if (detail_type == 'nhin-exim') {
			if (detail_data.entitas != null) {
				let npwp_exim = detail_data.entitas.data.identitas.filter(function (id) {
					if (id.jenis == 'NPWP') {
						return id
					}
				})
	
				if (npwp_exim.length > 0) { txt_npwp_exim = npwp_exim[0].nomor }	
			}
		}
		this.txt.npwp_exim = txt_npwp_exim
		this.txt.barang_exim = detail_type == 'nhin-exim' ? txt_barang : ''
		this.txt.data_lain_exim = detail_type == 'nhin-exim' 
			? this.converters.string(detail_data.data_lain) 
			: ''

		// Sarkut
		this.txt.nama_sarkut = detail_type == 'nhin-sarkut'
			? this.converters.string(detail_data.nama_sarkut) 
			: ''
		this.txt.jenis_sarkut = detail_type == 'nhin-sarkut'
			? this.converters.string(detail_data.jenis_sarkut) 
			: ''
		this.txt.nomor_sarkut = detail_type == 'nhin-sarkut'
			? this.converters.string(detail_data.nomor_sarkut) 
			: ''
		this.txt.asal_sarkut = detail_type == 'nhin-sarkut'
			? detail_data.pelabuhan_asal
				? detail_data.pelabuhan_asal.negara
					? `${detail_data.pelabuhan_asal.airport_name}, ${detail_data.pelabuhan_asal.negara.kode_2}`
					: detail_data.pelabuhan_asal.airport_name
				: ''
			: ''
		this.txt.tujuan_sarkut = detail_type == 'nhin-sarkut'
			? detail_data.pelabuhan_tujuan
				? detail_data.pelabuhan_tujuan.negara
					? `${detail_data.pelabuhan_tujuan.airport_name}, ${detail_data.pelabuhan_tujuan.negara.kode_2}`
					: detail_data.pelabuhan_tujuan.airport_name
				: ''
			: ''
		this.txt.imo_mmsi = detail_type == 'nhin-sarkut'
			? this.converters.string(detail_data.imo_mmsi)
			: ''
		this.txt.data_lain_sarkut = detail_type == 'nhin-sarkut' 
			? this.converters.string(detail_data.data_lain)
			: ''

		// Orang
		this.txt.nama_orang = detail_type == 'nhin-orang'
			? detail_data.entitas
				? detail_data.entitas.nama
				: ''
			: ''
		this.txt.jenis_kelamin = detail_type == 'nhin-orang'
			? detail_data.entitas
				? detail_data.entitas.jenis_kelamin
					? detail_data.entitas.jenis_kelamin.uraian
					: ''
				: ''
			: ''
		this.txt.kewarganegaraan = detail_type == 'nhin-orang'
			? detail_data.entitas
				? detail_data.entitas.warga_negara
					? detail_data.entitas.warga_negara.nama_negara
					: ''
				: ''
			: ''
		let txt_paspor = ''
		if (detail_type == 'nhin-orang') {
			if (detail_data.entitas != null) {
				let paspor = detail_data.entitas.identitas.filter(function (id) {
					if (id.jenis == 'PASPOR') {
						return id
					}
				})
	
				if (paspor.length > 0) { txt_paspor = paspor[0].nomor }	
			}
		}
		this.txt.paspor = txt_paspor
		this.txt.nomor_sarkut_orang = detail_type == 'nhin-orang'
			? this.converters.string(detail_data.nomor_sarkut) 
			: ''
		this.txt.asal_orang = detail_type == 'nhin-orang'
			? detail_data.pelabuhan_asal
				? detail_data.pelabuhan_asal.negara
					? `${detail_data.pelabuhan_asal.airport_name}, ${detail_data.pelabuhan_asal.negara.kode_2}`
					: detail_data.pelabuhan_asal.airport_name
				: ''
			: ''
		this.txt.tujuan_orang = detail_type == 'nhin-orang'
			? detail_data.pelabuhan_tujuan
				? detail_data.pelabuhan_tujuan.negara
					? `${detail_data.pelabuhan_tujuan.airport_name}, ${detail_data.pelabuhan_tujuan.negara.kode_2}`
					: detail_data.pelabuhan_tujuan.airport_name
				: ''
			: ''
		this.txt.waktu_berangkat = detail_type == 'nhin-orang'
			? detail_data.tanggal_berangkat
				? detail_data.waktu_berangkat
					? `${detail_data.tanggal_berangkat} ${detail_data.waktu_berangkat}`
					: detail_data.tanggal_berangkat
				: ''
			: ''
		this.txt.waktu_datang = detail_type == 'nhin-orang'
			? detail_data.tanggal_datang
				? detail_data.waktu_datang
					? `${detail_data.tanggal_datang} ${detail_data.waktu_datang}`
					: detail_data.tanggal_datang
				: ''
			: ''
		this.txt.data_lain_orang = detail_type == 'nhin-orang'
			? this.converters.string(detail_data.data_lain)
			: ''

		this.txt.indikasi = this.converters.string(this.data.indikasi)

		let pejabat = this.data.petugas.penerbit
		this.txt.jabatan = `${pejabat.txt_tipe_ttd}${pejabat.jabatan}`
	}

	writeText() 
	{
		this.createHeader()
		this.createNomor(this.jenis_dok)

		// No & tanggal
		this.write('Nomor')
		this.write(':', inds.cln1)
		this.write(this.data.no_dok_lengkap, inds.val1)

		this.write('Referensi', inds.lbl2)
		this.break()

		this.write('Tanggal')
		this.write(':', inds.cln1)
		this.write(this.full_tgl_dok, inds.val1)

		this.write('Nomor LKAI-N', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.nomor_lkain, inds.val2)
		this.break()

		this.write('Sifat')
		this.write(':', inds.cln1)
		this.write(this.data.sifat, inds.val1)

		this.write('Tanggal LKAI-N', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tgl_lkain, inds.val2)
		this.break()

		this.write('Klasifikasi')
		this.write(':', inds.cln1)
		this.write(this.data.klasifikasi, inds.val1)
		this.break(1)

		// Uraian
		this.write(this.txt.tujuan)
		this.break()

		let txt_op = '     Sehubungan dengan hasil analisis intelijen yang mengindikasikan adanya pelanggaran kepabeanan atau cukai, '
			+ 'diperintahkan / direkomendasikan*) kepada Saudara untuk melakukan penindakan terhadap '
			+ 'Barang / Sarana Pengangkut / Orang / Bangunan / lainnya*), dengan informasi sebagai berikut:'
		this.write(txt_op)
		this.break()

		this.writeData('A', 'Tempat', this.txt.tempat, 1)
		this.writeData('B', 'Tanggal/Waktu', this.txt.waktu, 1)
		this.writeData('C', 'Kantor Bea dan Cukai', this.txt.kantor, 1)

		// EXIM
		this.writeData('D', 'Kegiatan atas Barang Impor/Ekspor*):', null, 1)
		this.writeData('1', 'Nama/No. Dokumen Kepabeanan', this.txt.dok_exim)
		this.writeData('2', 'Eks/Untuk Kapal/Pesawat/Alat Angkut/Lainnya', this.txt.sarkut_exim)
		this.writeData('3', 'No. BL/AWB', this.txt.awb_exim)
		this.writeData('4', 'No. Container/Merek Kolli', this.txt.koli_exim)
		this.writeData('5', 'Importir/Eksportir/PPJK', this.txt.entitas_exim)
		this.writeData('6', 'NPWP', this.txt.npwp_exim)
		this.writeData('7', 'Jenis/Jumlah barang', this.txt.barang_exim)
		this.writeData('8', 'Data Lainnya', this.txt.data_lain_exim)

		// Sarkut
		this.writeData('E', 'Kegiatan atas Sarana Pengangkut:', null, 1)
		this.writeData('1', 'Nama', this.txt.nama_sarkut)
		this.writeData('2', 'jenis Sarana Pengangkut', this.txt.jenis_sarkut)
		this.writeData('3', 'Voyage / Flight / No Pol', this.txt.nomor_sarkut)
		this.writeData('4', 'Pelabuhan Asal', this.txt.asal_sarkut)
		this.writeData('5', 'Pelabuhan Tujuan', this.txt.tujuan_sarkut)
		this.writeData('6', 'IMO / MMSI', this.txt.imo_mmsi)
		this.writeData('7', 'Data Lainnya', this.txt.data_lain_sarkut)

		// Orang
		this.writeData('F', 'Kegiatan atas Orang:', null, 1)
		this.writeData('1', 'Nama', this.txt.nama_orang)
		this.writeData('2', 'Jenis Kelamin', this.txt.jenis_kelamin)
		this.writeData('3', 'Kewarganegaraan', this.txt.kewarganegaraan)
		this.writeData('4', 'No Paspor', this.txt.paspor)
		this.writeData('5', 'Flight / Voyage', this.txt.nomor_sarkut_orang)
		this.writeData('6', 'Pelabuhan / Bandara Asal', this.txt.asal_orang)
		this.writeData('7', 'Pelabuhan / Bandara Tujuan', this.txt.tujuan_orang)
		this.writeData('8', 'Waktu Keberangkatan', this.txt.waktu_berangkat)
		this.writeData('9', 'Waktu Kedatangan', this.txt.waktu_datang)
		this.writeData('10', 'Data Lainnya', this.txt.data_lain_orang)
		this.break()

		// Indikasi
		this.write('Indikasi:')
		this.write(this.txt.indikasi, inds.indikasi)
		this.break(1)

		// Closing
		let txt_closing = 'Demikian disampaikan agar pelaksanaan Nota Hasil Intelijen ini dilaporkan pada kesempatan pertama.'
		this.write(txt_closing)
		this.break(1)

		// TTD
		this.ttd(
			inds.ttd, 
			this.data.petugas.penerbit.jabatan, 
			this.data.petugas.penerbit.txt_tipe_ttd, 
			this.data.petugas.penerbit.name
		)
		this.break()

		// CC
		this.cc(this.data.tembusan)

		// LAMPIRAN
		if (this.data.barang != null) {
			if (this.data.barang.length > 1) {
				this.pdf.setFont('Helvetica', 'normal')
				this.pdf.addPage()
			
				// Header
				this.headerLampiran()
			
				// Tabel barang
				this.tabelBarang(this.data.barang)
			}	
		}
	}

	writeData(numbering, label, value=null, level=2)
	{
		let ind_num = (level == 1) ? this.left_margin : inds.lbl3
		let ind_lbl = (level == 1) ? inds.lbl3 : inds.lbl4
		this.write(`${numbering}.`, ind_num)
		this.write(label, ind_lbl)
		if (value != null) {
			this.write(':', inds.cln3)
			this.write(value, inds.val3)	
		}
		this.break()
	}
}

export default PdfNhiN