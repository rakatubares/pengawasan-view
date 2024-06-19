import Pdf from '../MyPdf'

const inds = {
	cln1: 30,
	val1: 35,
	lbl2: 130,
	cln2: 155,
	val2: 160,
	lbl3: 15,
	lbl4: 20,
	cln3: 110,
	val3: 115,
	indikasi: 25,
	ttd: 125,
	lamp: 150,
}

class PdfNhi extends Pdf
{
	constructor(data, data_barang)
	{
		data.barang = data_barang
		super(data, 'NOTA HASIL INTELIJEN')
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)
		this.txt = {}
		this.txt.tgl_lkai = this.converters.fullDate(this.data.tanggal_lkai)
		this.txt.nomor_lkai = this.data.nomor_lkai || ''
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
		if (this.data.barang.length > 1) {
			txt_barang = 'LIHAT LAMPIRAN'
		} else if (this.data.barang.length == 1) {
			txt_barang = `${this.data.barang[0].jumlah_barang} `
				+ `${this.data.barang[0].satuan.satuan} `
				+ `${this.data.barang[0].uraian_barang}`
			txt_barang = this.converters.string(txt_barang)
		}

		// Exim
		this.txt.dok_exim = detail_type == 'nhi-exim'
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
		this.txt.sarkut_exim = detail_type == 'nhi-exim'
			? `${detail_data.nama_sarkut || '-'} Voy/Flight/No. Pol: ${detail_data.nomor_sarkut || '-'}`
			: ''
		this.txt.awb_exim = detail_type == 'nhi-exim'
			? detail_data.nomor_awb
				? detail_data.tanggal_awb
					? `${detail_data.nomor_awb} tanggal ${detail_data.tanggal_awb}` 
					: detail_data.nomor_awb
				: detail_data.tanggal_awb
					? `- tanggal ${detail_data.tanggal_awb}` 
					: ''
			: ''
		this.txt.koli_exim = detail_type == 'nhi-exim' 
			? this.converters.string(detail_data.merek_koli)
			: ''
		this.txt.entitas_exim = detail_type == 'nhi-exim' 
			? detail_data.entitas != null 
				? this.converters.string(detail_data.entitas.data.nama) 
				: ''
			: ''
		let txt_npwp_exim = ''
		if (detail_type == 'nhi-exim') {
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
		this.txt.barang_exim = detail_type == 'nhi-exim' ? txt_barang : ''
		this.txt.data_lain_exim = detail_type == 'nhi-exim' 
			? this.converters.string(detail_data.data_lain) 
			: ''

		// BKC
		this.txt.tempat_bkc = detail_type == 'nhi-bkc' 
			? this.converters.string(detail_data.tempat_penimbunan) 
			: ''
		this.txt.penyalur_bkc = detail_type == 'nhi-bkc'
			? this.converters.string(detail_data.penyalur) 
			: ''
		this.txt.tempat_penjualan_bkc = detail_type == 'nhi-bkc'
			? this.converters.string(detail_data.tempat_penjualan) 
			: ''
		this.txt.nppbkc = detail_type == 'nhi-bkc'
			? this.converters.string(detail_data.nppbkc) 
			: ''
		this.txt.sarkut_bkc = detail_type == 'nhi-bkc'
			? `${detail_data.nama_sarkut || '-'} Voy/Flight/No. Pol: ${detail_data.nomor_sarkut || '-'}`
			: ''
		this.txt.barang_bkc = detail_type == 'nhi-bkc' ? txt_barang : ''
		this.txt.data_lain_bkc = detail_type == 'nhi-bkc' 
			? this.converters.string(detail_data.data_lain) 
			: ''

		// Tertentu
		this.txt.dok_tertentu = detail_type == 'nhi-tertentu'
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
		this.txt.sarkut_tertentu = detail_type == 'nhi-tertentu'
			? `${detail_data.nama_sarkut || '-'} Voy/Flight/No. Pol: ${detail_data.nomor_sarkut || '-'}`
			: ''
		this.txt.awb_tertentu = detail_type == 'nhi-tertentu'
			? detail_data.nomor_awb
				? detail_data.tanggal_awb
					? `${detail_data.nomor_awb} tanggal ${detail_data.tanggal_awb}` 
					: detail_data.nomor_awb
				: detail_data.tanggal_awb
					? `- tanggal ${detail_data.tanggal_awb}` 
					: ''
			: ''
		this.txt.koli_tertentu = detail_type == 'nhi-tertentu' 
			? this.converters.string(detail_data.merek_koli)
			: ''
		this.txt.entitas_tertentu = detail_type == 'nhi-tertentu' 
			? detail_data.entitas != null 
				? this.converters.string(detail_data.entitas.data.nama) 
				: ''
			: ''
		this.txt.barang_tertentu = detail_type == 'nhi-tertentu' ? txt_barang : ''
		this.txt.data_lain_tertentu = detail_type == 'nhi-tertentu' 
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

		this.write('Nomor LKAI', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.nomor_lkai, inds.val2)
		this.break()

		this.write('Sifat')
		this.write(':', inds.cln1)
		this.write(this.data.sifat, inds.val1)

		this.write('Tanggal LKAI', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tgl_lkai, inds.val2)
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

		// BKC
		this.writeData('E', 'Kegiatan atas Barang Kena Cukai:', null, 1)
		this.writeData('1', 'Eks Pabrik/Tempat Penyimpanan/Tempat Penimbunan', this.txt.tempat_bkc)
		this.writeData('2', 'Penyalur', this.txt.penyalur_bkc)
		this.writeData('3', 'Tempat Penjualan Eceran', this.txt.tempat_penjualan_bkc)
		this.writeData('4', 'NPPBKC', this.txt.nppbkc)
		this.writeData('5', 'Eks/Untuk Kapal/Pesawat/Alat Angkut/Lainnya', this.txt.sarkut_bkc)
		this.writeData('6', 'Jenis/Jumlah barang', this.txt.barang_bkc)
		this.writeData('7', 'Data Lainnya', this.txt.data_lain_bkc)

		// Tertentu
		this.writeData('F', 'Kegiatan atas Barang Tertentu:', null, 1)
		this.writeData('1', 'Nama/No. Dokumen Kepabeanan', this.txt.dok_tertentu)
		this.writeData('2', 'Eks/Untuk Kapal/Pesawat/Alat Angkut/Lainnya', this.txt.sarkut_tertentu)
		this.writeData('3', 'No. BL/AWB', this.txt.awb_tertentu)
		this.writeData('4', 'No. Container/Merek Kolli', this.txt.koli_tertentu)
		this.writeData('5', 'Orang Pribadi/Badan Hukum', this.txt.entitas_tertentu)
		this.writeData('6', 'Jenis/Jumlah barang', this.txt.barang_tertentu)
		this.writeData('7', 'Data Lainnya', this.txt.data_lain_tertentu)
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
		if (this.data.barang.length > 1) {
			this.pdf.setFont('Helvetica', 'normal')
			this.pdf.addPage()
		
			// Header
			this.headerLampiran()
		
			// Tabel barang
			this.tabelBarang(this.data.barang)
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

export default PdfNhi