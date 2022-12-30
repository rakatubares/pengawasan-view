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
		lamp: 130
	}
}

class PdfPengaman extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'BERITA ACARA PELEKATAN TANDA PENGAMAN'
		this.data = data
		this.prepareDocDate()
		this.prepareSprintDate()
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.no_dok_lengkap)

		////// URAIAN TOP //////
		let txt_waktu = 'Pada hari ini ' + this.hr + ' tanggal ' + this.tgl + ' bulan ' + this.bln + ' tahun ' + this.thn + '.'
		this.pdf.text(txt_waktu, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		let txt_sprint = 'Berdasarkan Surat Perintah : Kepala Bidang Penindakan dan Penyidikan Nomor ' 
			+ this.data.penindakan.sprint.nomor_sprint 
			+ ' tanggal ' + this.full_tgl_sprint + '.'
		let arr_sprint = converters.array_text(txt_sprint, 105)
		this.pdf.text(arr_sprint, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*(arr_sprint.length + 1)

		// Petugas 1
		this.pdf.text('1.', this.props.ind.alp, this.ln)
		this.pdf.text('Nama', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.data.penindakan.petugas1.name, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Pangkat', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.data.penindakan.petugas1.pangkat, this.props.ind.txt2, this.ln)
		this.pdf.text('NIP', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(this.data.penindakan.petugas1.nip, this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height*2

		// Petugas 2
		if (this.data.penindakan.petugas2 != null) {
			var txt_nama_petugas2 = this.data.penindakan.petugas2.name
			var txt_pangkat_petugas2 = this.data.penindakan.petugas2.pangkat
			var txt_nip_petugas2 = this.data.penindakan.petugas2.nip
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

		let txt_pernyataan = 'Telah melakukan pelekatan tanda pengaman atas:'
		this.pdf.text(txt_pernyataan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*2

		////// DETAIL //////
		let data_sarkut = this.dataObjek(this.data.objek, 'sarkut')
		this.detailSarkut(data_sarkut)

		let data_barang = this.dataObjek(this.data.objek, 'barang')
		this.detailBarang(data_barang)

		////// URAIAN BOTTOM //////
		this.ln += this.props.font.height
		let txt_lokasi = this.data.penindakan.lokasi_penindakan.replace('\n', ' ')
		this.pdf.text('Lokasi pengamanan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln4, this.ln)
		this.pdf.text(txt_lokasi, this.props.ind.txt4, this.ln)
		this.ln += this.props.font.height

		let txt_alasan = converters.array_text(this.data.alasan_pengamanan, 90)
		let len_alasan = txt_alasan.length > 0 ? txt_alasan.length : 1
		this.pdf.text('Alasan pengamanan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln4, this.ln)
		this.pdf.text(txt_alasan, this.props.ind.txt4, this.ln)
		this.ln += this.props.font.height*len_alasan

		let txt_keterangan = converters.array_text(this.data.keterangan, 90)
		let len_keterangan = txt_keterangan.length > 0 ? txt_keterangan.length : 1
		this.pdf.text('Keterangan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln4, this.ln)
		this.pdf.text(txt_keterangan, this.props.ind.txt4, this.ln)
		this.ln += this.props.font.height*(len_keterangan + 1)

		let txt_pengaman = 'Dengan menggunakan tanda pengaman ' 
			+ converters.string(this.data.jenis_pengaman)
			+ ' sebanyak ' 
			+ converters.string(this.data.jumlah_pengaman)
			+ ' '
			+ converters.string(this.data.satuan_pengaman)
			+ ' Nomor ' 
			+ converters.string(this.data.nomor_pengaman)
			+ '. Penempatan/pelekatan tanda pengamanan dilakukan pada: '
			+ converters.string(this.data.tempat_pengaman)
			+ '.'
		let arr_pengaman = converters.array_text(txt_pengaman, 95)
		this.pdf.text(arr_pengaman, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_pengaman.length

		let txt_disaksikan = 'Pelekatan tanda pengaman disaksikan oleh:'
		this.pdf.text(txt_disaksikan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nama', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.penindakan.saksi.nama), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Alamat', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.penindakan.saksi.alamat_identitas).replace('\n', ' '), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Pekerjaan', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.penindakan.saksi.pekerjaan), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Selaku pemilik / kuasa sarana pengangkut / barang.', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*2

		this.pdf.text('Demikian Catatan Tanda Pengaman ini dibuat dengan sebenarnya.', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		////// TTD //////
		let txt_saksi = 'Yang Menyaksikan'
		let txt_pejabat = 'Yang Melakukan Pelekatan tanda Pengaman'
		this.ttd(txt_saksi, txt_pejabat, undefined, undefined, undefined, undefined, 5)

		////// LAMPIRAN //////
		if (this.data.objek != null) {
			if (this.data.objek.type == 'barang') {
				if (this.data.objek.data.item.length > 1) {
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

export default PdfPengaman