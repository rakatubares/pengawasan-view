import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const ind_start = 10

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 77.5,
		end: 132.5
	},
	ind: {
		num: ind_start,
		lbl: ind_start + 6,
		cln: ind_start + 42,
		txt: ind_start + 45,
		lbl2: ind_start + 120,
		cln2: ind_start + 150,
		txt2: ind_start + 153,
		lbl3: ind_start + 12,
		cln3: ind_start + 47,
		txt3: ind_start + 50,
		ttd1: ind_start + 7,
		plh2: ind_start + 118,
		ttd2: ind_start + 125,
		lamp: 140
	}
}

class PdfLpN extends Pdf {
	constructor(data) {
		super(props);
		this.data = data
		this.jenis_dok = 'LAPORAN PELANGGARAN NPP'
		this.prepareDocDate(this.data.tanggal_dokumen)
		this.prepareSprintDate(this.data.sprint.tanggal_sprint)
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.no_dok_lengkap)

		////// URAIAN TOP //////
		this.pdf.text('1.', this.props.ind.num, this.ln)
		this.pdf.text('Surat Perintah', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.sprint.nomor_sprint, this.props.ind.txt, this.ln)
		this.pdf.text('Tanggal', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.full_tgl_sprint, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Nomor', this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('2.', this.props.ind.num, this.ln)
		this.pdf.text('Locus', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_lokasi = converters.array_text(this.data.locus.replace('\n', ' '), 40)
		this.pdf.text(txt_lokasi, this.props.ind.txt, this.ln)
		let txt_tanggal_tempus = this.data.tempus.substring(0,10)
		let txt_waktu_tempus = this.data.tempus.substring(11)
		this.pdf.text('Tempus', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(txt_tanggal_tempus, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Jam', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(txt_waktu_tempus, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('3.', this.props.ind.num, this.ln)
		let lbl_uraian = converters.array_text('Uraian Penindakan', 15)
		let lng_lbl_uraian = lbl_uraian.length
		this.pdf.text(lbl_uraian, this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_uraian = converters.array_text(this.data.uraian_penindakan, 90)
		let lng_txt_uraian = txt_uraian.length
		this.pdf.text(txt_uraian, this.props.ind.txt, this.ln)
		let lng_uraian = lng_txt_uraian > lng_lbl_uraian ? lng_txt_uraian : lng_lbl_uraian
		this.ln += this.props.font.height*lng_uraian
		
		////// DETAIL //////
		// SARKUT
		let jenis_sarkut = this.data.objek != null
			? this.data.objek.type == 'sarkut' 
				? this.data.objek.data.jenis_sarkut 
				: ""
			: ""
		let no_flight = this.data.objek != null
			? this.data.objek.type == 'sarkut' 
				? this.data.objek.data.no_flight_trayek != null
					? this.data.objek.data.no_flight_trayek : ''
				: ""
			: ""

		this.pdf.text('A.', this.props.ind.lbl, this.ln)
		this.pdf.text('Sarana Pengangkut', this.props.ind.lbl3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Jenis', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(jenis_sarkut, this.props.ind.txt, this.ln)
		this.pdf.text('No. Pol/Voy/Flight', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(no_flight, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nomor Petikemas', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('Ukuran', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.ln += this.props.font.height

		// BARANG
		let komoditi = this.data.objek != null
			? this.data.objek.type == 'barang' 
				? this.data.objek.data.item.length == 1
					? this.data.objek.data.item[0].uraian_barang
					: ('riksa' in this.data)
						? `${this.data.objek.data.item.length} ITEM, LIHAT LAMPIRAN BA ${this.data.riksa}`
						: `${this.data.objek.data.item.length} ITEM, LIHAT LAMPIRAN`
				: ''
			: ''
		let jumlah_barang = this.data.objek != null
			? this.data.objek.type == 'barang' 
				? this.data.objek.data.item.length == 1
					? this.data.objek.data.item[0].jumlah_barang + ' ' + this.data.objek.data.item[0].satuan.kode_satuan
					: ('riksa' in this.data)
					? `${this.data.objek.data.item.length} ITEM, LIHAT LAMPIRAN BA ${this.data.riksa}`
					: `${this.data.objek.data.item.length} ITEM, LIHAT LAMPIRAN`
				: ''
			: ''

		this.pdf.text('B.', this.props.ind.lbl, this.ln)
		this.pdf.text('Barang', this.props.ind.lbl3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Komoditi/Jenis', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let arr_komoditi = converters.array_text(komoditi, 90)
		this.pdf.text(arr_komoditi, this.props.ind.txt, this.ln)
		let height_komoditi = arr_komoditi.length > 1 ? arr_komoditi.length : 1
		this.ln += this.props.font.height*height_komoditi

		this.pdf.text('Jumlah', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(jumlah_barang, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		// BANGUNAN
		let alamat = this.data.objek != null
			? this.data.objek.type == 'bangunan' 
				? converters.array_text(this.data.objek.data.alamat, 90)
				: ''
			: ''
		let no_reg = this.data.objek != null
			? this.data.objek.type == 'bangunan' 
				? this.data.objek.data.no_reg != null
					? this.data.objek.data.no_reg : ''
				: ''
			: ''
		let pemilik = this.data.objek != null
			? this.data.objek.type == 'bangunan' 
				? this.data.objek.data.pemilik.nama : ''
			: ''

		this.pdf.text('C.', this.props.ind.lbl, this.ln)
		this.pdf.text('Bangunan/Tempat', this.props.ind.lbl3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Alamat', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(alamat, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		let lbl_no_reg = converters.array_text('No Reg Bangunan / NPPBKC / dll.', 15)
		this.pdf.text(lbl_no_reg, this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(no_reg, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*lbl_no_reg.length

		let lbl_pemilik = converters.array_text('Pemilik / yang menguasai', 15)
		this.pdf.text(lbl_pemilik, this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(pemilik, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*lbl_pemilik.length

		// ORANG
		let nama_orang = this.data.objek != null
			? this.data.objek.type == 'orang' 
				? this.data.objek.data.nama : ''
			: ''
		let tanggal_lahir = this.data.objek != null 
			? this.data.objek.type == 'orang' 
				? this.data.objek.data.tanggal_lahir : ''
			: ''
		let jenis_kelamin = this.data.objek != null
			? this.data.objek.type == 'orang' 
				? this.data.objek.data.jenis_kelamin == 'F'
					? 'Perempuan' 
					: this.data.objek.data.jenis_kelamin == 'M'
						? 'Laki-laki'
						: ''
				: ''
			: ''
		let identitas = this.data.objek != null
			? this.data.objek.type == 'orang' 
				? this.data.objek.data.nomor_identitas + '(' + this.data.objek.data.jenis_identitas + ')' 
				: ''
			: ''
		let alamat_orang = this.data.objek != null
			? this.data.objek.type == 'orang' 
				? converters.array_text(this.data.objek.data.alamat_identitas, 40)
				: ''
			: ''
		let warga_negara = this.data.objek != null
			? this.data.objek.type == 'orang' 
				? this.data.objek.data.warga_negara 
					? this.data.objek.data.warga_negara.nama_negara	: ''
				: ''
			: ''

		this.pdf.text('D.', this.props.ind.lbl, this.ln)
		this.pdf.text('Orang', this.props.ind.lbl3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nama', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(nama_orang, this.props.ind.txt, this.ln)
		this.pdf.text('Tanggal Lahir', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(tanggal_lahir, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Jenis Kelamin', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(jenis_kelamin, this.props.ind.txt, this.ln)
		this.pdf.text('Identitas', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(identitas, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Alamat', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(alamat_orang, this.props.ind.txt, this.ln)
		this.pdf.text('Kewarganegaraan', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(warga_negara, this.props.ind.txt2, this.ln)
		let len_alamat_orang = alamat_orang.length > 0 ? alamat_orang.length : 1
		this.ln += this.props.font.height*len_alamat_orang

		////// URAIAN BOTTOM //////
		this.pdf.text('4.', this.props.ind.num, this.ln)
		this.pdf.text('Nomor SB Penegahan', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.no_sbp, this.props.ind.txt, this.ln)
		this.pdf.text('Tanggal', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.data.tanggal_sbp, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('5.', this.props.ind.num, this.ln)
		this.pdf.text('Diberikan kepada', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Nama', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.saksi.nama, this.props.ind.txt, this.ln)
		this.pdf.text('Selaku', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text('Pemilik/Kuasanya*', this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		let txt_alamat_saksi = converters.array_text(this.data.saksi.alamat_identitas.replace('\n', ' '), 90)
		this.pdf.text('Alamat', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(txt_alamat_saksi, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
		let txt_identitas_saksi = this.data.saksi.nomor_identitas + ' (' + this.data.saksi.jenis_identitas + ')'
		this.pdf.text('Identitas', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(txt_identitas_saksi, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('6.', this.props.ind.num, this.ln)
		this.pdf.text('Hal yang terjadi', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_hal_terjadi = converters.array_text(this.data.hal_terjadi, 90)
		this.pdf.text(txt_hal_terjadi, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*(((txt_hal_terjadi.length) > 0 ? txt_hal_terjadi.length : 1) + 1)

		this.pdf.text('Pejabat yang melaksanakan penindakan,', this.props.ind.ttd2, this.ln)
		this.ln += this.props.font.height*4
		this.pdf.text(this.data.petugas.name, this.props.ind.ttd2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('NIP. ' + this.data.petugas.nip, this.props.ind.ttd2, this.ln)
		this.ln += this.props.font.height*2

		this.pdf.text('7.', this.props.ind.num, this.ln)
		this.pdf.text('Analisa hasil penindakan', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_analisa = converters.array_text(this.data.analisa, 85)
		this.pdf.text(txt_analisa, this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height*txt_analisa.length

		this.pdf.text('8.', this.props.ind.num, this.ln)
		this.pdf.text('Kesimpulan', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_kesimpulan = converters.array_text(this.data.kesimpulan, 85)
		this.pdf.text(txt_kesimpulan, this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height*(txt_kesimpulan.length + 1)

		////// TTD //////
		let ln_tanggal = this.ln
		let ln_ttd_jabatan = ln_tanggal + this.props.font.height
		let ln_ttd_nama = ln_ttd_jabatan + this.props.font.height*4
		let ln_ttd_nip = ln_ttd_nama + this.props.font.height
		this.ln = ln_ttd_nip + this.props.font.height*3
		
		let plh_penyusun = this.data.penyusun.plh ? 'Plh.' : ''
		this.pdf.text(plh_penyusun, this.props.ind.num, ln_ttd_jabatan)
		this.pdf.text(this.data.penyusun.jabatan.jabatan, this.props.ind.ttd1, ln_ttd_jabatan)
		this.pdf.text(this.data.penyusun.user.name, this.props.ind.ttd1, ln_ttd_nama)
		this.pdf.text('NIP. ' + this.data.penyusun.user.nip, this.props.ind.ttd1, ln_ttd_nip)

		this.pdf.text('Tangerang, ' + this.full_tgl_dok, this.props.ind.ttd2, ln_tanggal)
		let plh_penerbit = this.data.penerbit.plh ? 'Plh.' : ''
		this.pdf.text(plh_penerbit, this.props.ind.plh2, ln_ttd_jabatan)
		this.pdf.text(this.data.penerbit.jabatan.jabatan, this.props.ind.ttd2, ln_ttd_jabatan)
		this.pdf.text(this.data.penerbit.user.name, this.props.ind.ttd2, ln_ttd_nama)
		this.pdf.text('NIP. ' + this.data.penerbit.user.nip, this.props.ind.ttd2, ln_ttd_nip)

		////// KETERANGAN //////
		this.pdf.text('Tembusan:', this.props.ind.num, this.ln)

		////// LAMPIRAN //////
		if (this.data.objek != null) {
			if (this.data.objek.type == 'barang') {
				if ((this.data.objek.data.item.length > 1) && !('riksa' in this.data)) {
					this.pdf.setFont('Helvetica', 'normal')
					this.pdf.addPage()
					
					// Header
					this.headerLampiran(this.data.no_dok_lengkap)
					
					// Tabel barang
					this.tabelBarang()
				}
			}	
		}

		////// WATERMARK //////
		if ([100].includes(this.data.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfLpN