import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 62.5,
		end: 147.5
	},
	ind: {
		alp: 15,
		dtl: 21,
		cln: 85,
		txt: 88,
		cln2: 40,
		txt2: 43,
		lbl3: 120,
		cln3: 135,
		txt3: 138,
		cln4: 50,
		txt4: 53,
		ttd:125,
		lamp: 140
	}
}

class PdfBukaPengaman extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'BERITA ACARA PEMBUKAAN TANDA PENGAMAN'
		this.data = data
		this.prepareDate(this.data.dokumen.bukapengaman.tanggal_dokumen, this.data.dokumen.bukapengaman.sprint.tanggal_sprint)
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.dokumen.bukapengaman.no_dok_lengkap)

		////// URAIAN TOP //////
		let txt_sprint = 'Berdasarkan Surat Perintah/Surat Tugas Kepala Bidang Penindakan dan Penyidikan Nomor: ' 
			+ this.data.dokumen.bukapengaman.sprint.nomor_sprint 
			+ ' tanggal ' + this.full_tgl_sprint + '.'
		let arr_sprint = converters.array_text(txt_sprint, 105)
		this.pdf.text(arr_sprint, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*(arr_sprint.length + 1)
		
		this.pdf.text('Kami yang bertanda tangan di bawah ini:', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		// Petugas 1
		this.pdf.text('1.', this.props.ind.alp, this.ln)
		this.pdf.text('Nama', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.data.dokumen.bukapengaman.petugas1.name, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Pangkat', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.data.dokumen.bukapengaman.petugas1.pangkat, this.props.ind.txt2, this.ln)
		this.pdf.text('NIP', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(this.data.dokumen.bukapengaman.petugas1.nip, this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height*2

		// Petugas 2
		if (this.data.dokumen.bukapengaman.petugas2 != null) {
			var txt_nama_petugas2 = this.data.dokumen.bukapengaman.petugas2.name
			var txt_pangkat_petugas2 = this.data.dokumen.bukapengaman.petugas2.pangkat
			var txt_nip_petugas2 = this.data.dokumen.bukapengaman.petugas2.nip
		} else {
			var txt_nama_petugas2 = ''
			var txt_pangkat_petugas2 = ''
			var txt_nip_petugas2 = ''
		}
		this.pdf.text('2.', this.props.ind.alp, this.ln)
		this.pdf.text('Nama', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(txt_nama_petugas2, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Pangkat', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(txt_pangkat_petugas2, this.props.ind.txt2, this.ln)
		this.pdf.text('NIP', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(txt_nip_petugas2, this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height*2

		let txt_waktu = 'Pada hari ini ' + this.hr 
			+ ' tanggal ' + this.tgl + ' bulan ' + this.bln + ' tahun ' + this.thn 
			+ ' telah melakukan pembukaan tanda pengaman yang ditempatkan/dilekatkan oleh Bea dan Cukai atas:'
		let arr_waktu = converters.array_text(txt_waktu, 105)
		this.pdf.text(arr_waktu, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_waktu.length

		////// DETAIL //////
		let data_sarkut = this.dataObjek(this.data.objek, 'sarkut')
		this.detailSarkut(data_sarkut)

		let data_barang = this.dataObjek(this.data.objek, 'barang')
		this.detailBarang(data_barang)

		////// URAIAN BOTTOM //////
		this.ln += this.props.font.height
		let txt_pengaman = 'Sebanyak ' 
			+ converters.string(this.data.dokumen.bukapengaman.jumlah_pengaman)
			+ ' '
			+ converters.string(this.data.dokumen.bukapengaman.satuan_pengaman)
			+ ' Nomor ' 
			+ converters.string(this.data.dokumen.bukapengaman.nomor_pengaman)
			+ ' tanggal '
			+ converters.string(this.data.dokumen.bukapengaman.tanggal_pengaman)
			+ ' pada tempat-tempat sebagai berikut: '
			+ converters.string(this.data.dokumen.bukapengaman.tempat_pengaman)
			+ ' dengan dasar: '
			+ converters.string(this.data.dokumen.bukapengaman.dasar_pengamanan)
			+ '.'
		let arr_pengaman = converters.array_text(txt_pengaman, 105)
		this.pdf.text(arr_pengaman, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*(arr_pengaman.length + 1)

		let txt_disaksikan = 'Pembukaan tanda pengaman disaksikan oleh:'
		this.pdf.text(txt_disaksikan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nama', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.dokumen.bukapengaman.saksi.nama), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Alamat', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.dokumen.bukapengaman.saksi.alamat).replace('\n', ' '), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Pekerjaan', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.dokumen.bukapengaman.saksi.pekerjaan), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Selaku pemilik / kuasa sarana pengangkut / barang* yang ditegah.', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*2

		this.pdf.text('Demikian Pencatatan ini dibuat dengan sebenarnya.', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		////// TTD //////
		let txt_saksi = 'Yang Menyaksikan'
		let txt_pejabat = 'Yang Melakukan Pembukaan Tanda Pengaman'
		this.ttd(txt_saksi, txt_pejabat, this.data.dokumen.bukapengaman.saksi, this.data.dokumen.bukapengaman.petugas1, this.data.dokumen.bukapengaman.petugas2)

		////// LAMPIRAN //////
		if (this.data.objek != null) {
			if (this.data.objek.type == 'barang') {
				if (this.data.objek.data.item.length > 1) {
					this.pdf.setFont('Helvetica', 'normal')
					this.pdf.addPage()
					// Header
					this.headerLampiran(this.data.dokumen.bukapengaman.no_dok_lengkap)
					// Tabel barang
					this.tabelBarang()
				}
			}
		}

		////// WATERMARK //////
		if ([100].includes(this.data.dokumen.bukapengaman.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfBukaPengaman