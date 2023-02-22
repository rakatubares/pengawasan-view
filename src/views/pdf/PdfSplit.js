import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
	font: {
		size: 10,
		height: 4,
		txt_prop: {'align':'justify', 'maxWidth': 145},
		txt_len: 80,
	},
	title_line: {
		start: 70,
		end: 140
	},
	ind: {
		lbl: 15,
		cln: 40,
		num: 45,
		txt: 50,
		cln2: 75,
		txt2: 80,
		cln3: 85,
		txt3: 90,
		plh: 118,
		ttd:125,
		cln4: 150,
		txt4: 155,
		lamp: 140
	},
	txt_len: 85,
}

class PdfSplit extends Pdf {
	constructor(data) {
		super(props, 30)
		this.jenis_dok = 'SURAT PERINTAH PENELITIAN (SPLIT)'
		this.data = data
	}

	generatePdf() {
		this.createHeaderSimple()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.no_dok_lengkap, 50)
		this.prepareDocDate(this.data.tanggal_dokumen)

		////// DASAR //////
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Dasar', this.props.ind.lbl, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('1.', this.props.ind.num, this.ln)
		let txt_dasar_1 = 'Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan ' +
			'sebagaimana telah diubah dengan Undang-Undang Nomor 17 Tahun 2006;'
		let arr_dasar_1 = converters.array_text(txt_dasar_1, this.props.font.txt_len)
		this.pdf.text(arr_dasar_1, this.props.ind.txt, this.ln, this.props.font.txt_prop)
		this.ln += this.props.font.height*arr_dasar_1.length

		this.pdf.text('2.', this.props.ind.num, this.ln)
		let txt_dasar_2 = 'Undang-Undang Nomor 11 Tahun 1995 tentang Cukai ' +
			'sebagaimana telah diubah dengan Undang-Undang Nomor 39 Tahun 2007;'
		let arr_dasar_2 = converters.array_text(txt_dasar_2, this.props.font.txt_len)
		this.pdf.text(arr_dasar_2, this.props.ind.txt, this.ln, this.props.font.txt_prop)
		this.ln += this.props.font.height*arr_dasar_2.length

		this.pdf.text('3.', this.props.ind.num, this.ln)
		let txt_dasar_3 = 'Peraturan Menteri Keuangan Nomor 74/PMK.01/2009 tentang ' +
			'Organisasi dan Tata Kerja Instansi Vertikal Direktorat Jenderal Bea dan Cukai;'
		let arr_dasar_3 = converters.array_text(txt_dasar_3, this.props.font.txt_len)
		this.pdf.text(arr_dasar_3, this.props.ind.txt, this.ln, this.props.font.txt_prop)
		this.ln += this.props.font.height*arr_dasar_3.length

		this.pdf.text('4.', this.props.ind.num, this.ln)
		let txt_dasar_4 = 'Laporan Pelanggaran Nomor : ' + this.data.dokumen.lp.no_dok_lengkap +
			' Tanggal ' + this.data.dokumen.lp.tanggal_dokumen + '.'
		let arr_dasar_4 = converters.array_text(txt_dasar_4, this.props.font.txt_len)
		this.pdf.text(arr_dasar_4, this.props.ind.txt, this.ln, this.props.font.txt_prop)
		this.ln += this.props.font.height*(arr_dasar_4.length + 0.5)

		////// PERTIMBANGAN //////
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Pertimbangan', this.props.ind.lbl, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('1.', this.props.ind.num, this.ln)
		let txt_timbang_1 = 'Bahwa dengan adanya Laporan Pelanggaran ' + this.data.penyidikan.jenis_pelanggaran + ', ' +
			'maka dipandang perlu untuk mengumpulkan bahan keterangan dan menemukan bukti permulaan yang cukup ' +
			'akan adanya tindak pidana kepabeanan dan/atau cukai.'
		let arr_timbang_1 = converters.array_text(txt_timbang_1, this.props.font.txt_len)
		this.pdf.text(arr_timbang_1, this.props.ind.txt, this.ln, this.props.font.txt_prop)
		this.ln += this.props.font.height*arr_timbang_1.length

		this.pdf.text('2.', this.props.ind.num, this.ln)
		let txt_timbang_2 = 'Bahwa untuk maksud tersebut perlu dikeluarkan Surat Perintah Penelitian.'
		let arr_timbang_2 = converters.array_text(txt_timbang_2, this.props.font.txt_len)
		this.pdf.text(arr_timbang_2, this.props.ind.txt, this.ln, this.props.font.txt_prop)
		this.ln += this.props.font.height*(arr_timbang_2.length + 1)

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('D I P E R I N T A H K A N', 105, this.ln, 'center')
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height*2

		////// KEPADA //////
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Kepada', this.props.ind.lbl, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text(':', this.props.ind.cln, this.ln)
		if (this.data.petugas.length == 0) {
			this.pdf.text('-', this.props.ind.txt, this.ln)
			this.ln += this.props.font.height*2
		} else if (this.data.petugas.length <= 3) {
			let num = 1
			this.data.petugas.forEach(petugas => {
				// Nama
				this.pdf.text(`${num}.`, this.props.ind.num, this.ln)
				this.pdf.text('Nama', this.props.ind.txt, this.ln)
				this.pdf.text(':', this.props.ind.cln2, this.ln)
				this.pdf.text(petugas.name, this.props.ind.txt2, this.ln)
				this.ln += this.props.font.height

				// NIP
				this.pdf.text('NIP', this.props.ind.txt, this.ln)
				this.pdf.text(':', this.props.ind.cln2, this.ln)
				this.pdf.text(petugas.nip, this.props.ind.txt2, this.ln)
				this.ln += this.props.font.height

				// Pangkat
				this.pdf.text('Pangkat / Gol.', this.props.ind.txt, this.ln)
				this.pdf.text(':', this.props.ind.cln2, this.ln)
				this.pdf.text(petugas.pangkat, this.props.ind.txt2, this.ln)
				this.ln += this.props.font.height

				// Jabatan
				this.pdf.text('Jabatan', this.props.ind.txt, this.ln)
				this.pdf.text(':', this.props.ind.cln2, this.ln)
				// TEXT TO BE WRITTEN : JABATAN
				this.ln += this.props.font.height*2

				num += 1
			});
			
		} else {
			this.pdf.text('TERLAMPIR', this.props.ind.num, this.ln)
			this.ln += this.props.font.height*2
		}

		////// UNTUK //////
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Untuk', this.props.ind.lbl, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('1.', this.props.ind.num, this.ln)
		let txt_untuk_1 = 'Melakukan tugas penelitian berupa mencari, mengumpulkan bahan keterangan, ' +
			'dan menemukan bukti permulaan yang cukup atas perkara ' + this.data.dugaan_pelanggaran +
			' yang diduga dilakukan oleh:'
		this.pdf.text(txt_untuk_1, this.props.ind.txt, this.ln, this.props.font.txt_prop)
		let hgt_untuk_1 = Math.round(txt_untuk_1.length / (this.props.font.txt_prop.maxWidth - this.props.ind.txt))
		this.ln += this.props.font.height*(hgt_untuk_1 + 1)

		this.pdf.text('Nama', this.props.ind.txt, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(this.data.penyidikan.pelaku.nama, this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Pekerjaan', this.props.ind.txt, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(this.data.penyidikan.pelaku.pekerjaan, this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Tempat/tanggal lahir', this.props.ind.txt, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let ttl = this.data.penyidikan.pelaku.tempat_lahir + ' / ' + this.data.penyidikan.pelaku.tanggal_lahir
		this.pdf.text(ttl, this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Alamat', this.props.ind.txt, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_alamat = this.data.penyidikan.pelaku.alamat_identitas || '-'
		txt_alamat = converters.string(txt_alamat).replace('\n', ' ')
		let arr_alamat = converters.array_text(txt_alamat, this.props.txt_len)
		this.pdf.text(arr_alamat, this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height*(arr_alamat.length+1)

		this.pdf.text('2.', this.props.ind.num, this.ln)
		let txt_untuk_2 = 'Setelah melaksanakan Surat Perintah ini agar melaporkan kepada yang memberi perintah.'
		let arr_untuk_2 = converters.array_text(txt_untuk_2, this.props.txt_len)
		this.pdf.text(arr_untuk_2, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*(arr_untuk_2.length+1)

		let txt_penutup = 'Demikian surat perintah ini dibuat untuk dilaksanakan dengan penuh tanggung jawab.'
		let arr_penutup = converters.array_text(txt_penutup, 90)
		this.pdf.text(arr_penutup, this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height*(arr_penutup.length+2)

		////// TTD //////
		this.pdf.text(`Dikeluarkan di`, this.props.ind.ttd, this.ln)
		this.pdf.text(`:`, this.props.ind.cln4, this.ln)
		this.pdf.text(`Tangerang`, this.props.ind.txt4, this.ln)
		this.ln += this.props.font.height

		this.pdf.text(`Pada tanggal`, this.props.ind.ttd, this.ln)
		this.pdf.text(`:`, this.props.ind.cln4, this.ln)
		this.pdf.text(this.full_tgl_dok, this.props.ind.txt4, this.ln)
		this.pdf.line(this.props.ind.ttd, this.ln+0.5, this.props.ind.ttd+60, this.ln+0.5)
		this.ln += this.props.font.height

		let plh_atasan = (this.data.pemberi_perintah.plh == true) ? 'Plh. ' : '';
		this.pdf.text(plh_atasan, this.props.ind.plh, this.ln)
		let arr_jabatan = converters.array_text(this.data.pemberi_perintah.jabatan.jabatan, 35)
		this.pdf.text(arr_jabatan, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height*5

		this.pdf.text(this.data.pemberi_perintah.user.name, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height

		this.pdf.text(`NIP. ${this.data.pemberi_perintah.user.nip}`, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height*2

		////// LAMPIRAN //////
		if (this.data.petugas.length > 3) {
			this.pdf.addPage()
			// Header
			this.headerLampiran(this.data.no_dok_lengkap)
			// Tabel barang
			this.tabelPetugas(this.data.petugas)
		}

		////// WATERMARK //////
		if ([100].includes(this.data.kode_status)) {
			this.watermark()
		}
		
		return this.pdf.output('datauristring')
	}
}

export default PdfSplit