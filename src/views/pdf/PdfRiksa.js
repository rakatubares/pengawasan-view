import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 77,
		end: 133
	},
	ind: {
		alp: 15,
		dtl: 21,
		cln: 85,
		txt: 88,
		cln2: 50,
		txt2: 53,
		cln3: 75,
		txt3: 78,
		cln4: 30,
		txt4: 33,
		ttd:125,
		lamp: 140
	}
}

class PdfRiksa extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'BERITA ACARA PEMERIKSAAN'
		this.data = data
		this.prepareDocDate()
		this.prepareSprintDate()
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.dokumen.riksa.no_dok_lengkap)

		////// URAIAN TOP //////
		let txt_waktu = 'Pada hari ini ' + this.hr + ' tanggal ' + this.tgl + ' bulan ' + this.bln + ' tahun ' + this.thn + '.'
		this.pdf.text(txt_waktu, this.props.ind.dtl, this.ln)
		this.ln += this.props.font.height

		let txt_sprint = 'Berdasarkan Surat Perintah : Kepala Bidang Penindakan dan Penyidikan Nomor ' 
			+ this.data.penindakan.sprint.nomor_sprint 
			+ ' tanggal ' + this.full_tgl_sprint + '.'
		let arr_sprint = converters.array_text(txt_sprint, 105)
		this.pdf.text(arr_sprint, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_sprint.length

		let txt_pernyataan = 'Kami yang bertanda tangan di bawah ini telah melakukan pemeriksaan terhadap:'
		let arr_pernyataan = converters.array_text(txt_pernyataan, 105)
		this.pdf.text(arr_pernyataan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_pernyataan.length

		////// DETAIL //////
		let data_sarkut = this.dataObjek(this.data.objek, 'sarkut')
		this.detailSarkut(data_sarkut)

		let data_barang = this.dataObjek(this.data.objek, 'barang')
		this.detailBarang(data_barang)

		let data_bangunan = this.dataObjek(this.data.objek, 'bangunan')
		this.detailBangunan(data_bangunan)

		////// URAIAN BOTTOM //////
		this.pdf.text('Lokasi Pemeriksaan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.data.penindakan.lokasi_penindakan.replace('\n', ' '), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Hasil Pemeriksaan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.ln_txt_lampiran = this.ln
		this.ln += this.props.font.height

		let txt_disaksikan = 'Pemeriksaan disaksikan oleh pengangkut/pemilik/importir/eksportir '
			+ 'atau kuasanya/ketua lingkungan/dll*:'
		let arr_saksi = converters.array_text(txt_disaksikan, 110)
		this.pdf.text(arr_saksi, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_saksi.length

		this.pdf.text('Nama', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(converters.string(this.data.penindakan.saksi.nama), this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Alamat', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(converters.string(this.data.penindakan.saksi.alamat).replace('\n', ' '), this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Pekerjaan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(converters.string(this.data.penindakan.saksi.pekerjaan), this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Nomor Identitas (KTP/SIM/Paspor*)', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_identitas = converters.string(this.data.penindakan.saksi.nomor_identitas)
			+ converters.string_format(converters.string(this.data.penindakan.saksi.jenis_identitas), ' ({})')
		this.pdf.text(txt_identitas, this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Demikian Berita Acara ini dibuat dengan sebenarnya.', this.props.ind.dtl, this.ln)

		////// TTD //////
		this.ln += this.props.font.height*2
		let txt_saksi = 'Pemilik/Importir/Eksportir/Kuasanya/Saksi*'
		let txt_pejabat = 'Pejabat yang melakukan pemeriksaan,'
		this.ttd(txt_saksi, txt_pejabat)

		////// KETERANGAN //////
		this.ln += this.props.font.height*3
		this.pdf.setFont('Helvetica', 'italic')
		this.pdf.text('*Coret yang tidak perlu', this.props.ind.alp, this.ln)

		////// LAMPIRAN //////
		if (this.data.objek != null) {
			if (this.data.objek.type == 'barang') {
				this.pdf.setFont('Helvetica', 'normal')
				this.pdf.addPage()

				// Header
				this.ln_lamp = 10
				this.pdf.text('Lampiran Berita Acara Pemeriksaan', this.props.ind.alp, this.ln_lamp)
				this.ln_lamp += this.props.font.height
				this.pdf.text('Nomor', this.props.ind.alp, this.ln_lamp)
				this.pdf.text(':', this.props.ind.cln4, this.ln_lamp)
				this.pdf.text(this.data.dokumen.riksa.no_dok_lengkap, this.props.ind.txt4, this.ln_lamp)
				this.ln_lamp += this.props.font.height
				this.pdf.text('Tanggal', this.props.ind.alp, this.ln_lamp)
				this.pdf.text(':', this.props.ind.cln4, this.ln_lamp)
				this.pdf.text(this.full_tgl_dok, this.props.ind.txt4, this.ln_lamp)
				this.ln_lamp += this.props.font.height*3

				// Tabel barang
				this.pdf.setFont('Helvetica', 'bold')
				this.pdf.text('LAPORAN HASIL PEMERIKSAAN', 105, this.ln_lamp, 'center')
				this.ln_lamp += this.props.font.height*2
				this.pdf.setFont('Helvetica', 'normal')
				this.pdf.text('Hasil pemeriksaan kedapatan:', this.props.ind.alp, this.ln_lamp)
				this.ln_lamp += this.props.font.height
				let table_height = this.tabelBarang()

				// TTD
				this.ttd(
					'Pemilik/lmportir/Eksportir/Kuasanya/Saksi*,',
					'Pejabat yang melakukan pemeriksaan,',
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					table_height,
					false
				)

				// Set teks jumlah lampiran
				let totalPages = this.pdf.internal.getNumberOfPages();
				this.pdf.setPage(1);
				this.pdf.text(`Laporan hasil pemeriksaan terlampir sebanyak ${totalPages - 1} halaman.`, this.props.ind.txt2, this.ln_txt_lampiran)
			} else {
				this.pdf.setFont('Helvetica', 'normal')
				this.pdf.text(`Laporan hasil pemeriksaan terlampir sebanyak - halaman.`, this.props.ind.txt2, this.ln_txt_lampiran)
			}
		} else {
			this.pdf.setFont('Helvetica', 'normal')
			this.pdf.text(`Laporan hasil pemeriksaan terlampir sebanyak - halaman.`, this.props.ind.txt2, this.ln_txt_lampiran)
		}

		////// WATERMARK //////
		if ([100].includes(this.data.dokumen.riksa.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfRiksa