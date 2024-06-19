import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const ind_start = 15

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
		lbl2: ind_start + 12,
		cln: ind_start + 60,
		txt: ind_start + 62,
		txt1: ind_start + 65,
		cln2: ind_start + 40,
		txt2: ind_start + 42,
		ttd:125,
		lamp: 140
	}
}

class PdfSegel extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'BERITA ACARA SERAH TERIMA'
		this.data = data
		this.prepareDocDate(this.data.tanggal_dokumen)
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.no_dok_lengkap)

		////// URAIAN TOP //////
		let txt_waktu = 'Pada hari ini ' + this.hr + ' tanggal ' + this.tgl + ' bulan ' + this.bln + ' tahun ' + this.thn + '.'
		this.pdf.text(txt_waktu, this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height

		let txt_menyerahkan = 'Saya/Kami* yang bertanda tangan di bawah bertindak untuk/atas nama ' + this.data.yang_menyerahkan.atas_nama + ', telah menyerahkan:'
		let arr_menyerahkan = converters.array_text(txt_menyerahkan, 110)
		this.pdf.text(arr_menyerahkan, this.props.ind.num, this.ln)
		this.ln += this.props.font.height*(arr_menyerahkan.length + 1)

		////// DETAIL //////
		// SARKUT
		let jenis_sarkut = this.data.objek != null
			? this.data.objek.type == 'sarkut' 
				? this.data.objek.data.jenis_sarkut 
				: ""
			: ""
		let no_reg = this.data.objek != null
			? this.data.objek.type == 'sarkut' 
				? this.data.objek.data.no_reg_polisi 
				: ""
			: ""

		this.pdf.text('1.', this.props.ind.num, this.ln)
		this.pdf.text('Sarana Pengangkut*', this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('a.', this.props.ind.lbl, this.ln)
		this.pdf.text('Jenis Sarana Pengangkut', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(jenis_sarkut, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('No Reg/No Polisi', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(no_reg, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*1.5

		// BARANG
		let kemasan = this.data.objek != null
			? this.data.objek.type == 'barang' 
				? this.data.objek.data.jumlah_kemasan + ' ' + this.data.objek.data['kemasan']['kode_kemasan']
				: ''
			: ''

		let create_barang = this.data.objek != null
			? this.data.objek.type == 'barang' 
				? this.data.objek.data.item.length <= 5
					? true : false
				: null
			: null

		this.pdf.text('2.', this.props.ind.num, this.ln)
		this.pdf.text('Barang*', this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('a.', this.props.ind.lbl, this.ln)
		this.pdf.text('Jml/No Petikemas/Kemasan', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(kemasan, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Jumlah/Jenis Barang', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)

		if (create_barang == true) {
			this.data.objek.data.item.forEach(element => {
				let txt_barang = element.jumlah_barang
					+ ' ' + element.satuan.kode_satuan
					+ ' ' + element.uraian_barang
				let arr_barang = converters.array_text(txt_barang, 70)
				
				this.pdf.text('-', this.props.ind.txt, this.ln)
				this.pdf.text(arr_barang, this.props.ind.txt1, this.ln)
				this.ln += this.props.font.height*arr_barang.length
			});
			this.ln += this.props.font.height*0.5
		} else if (create_barang == false) {
			this.pdf.text(`${this.data.objek.data.item.length} ITEM, LIHAT LAMPIRAN`, this.props.ind.txt, this.ln)
			this.ln += this.props.font.height*1.5
		} else {
			this.pdf.text('', this.props.ind.txt, this.ln)
			this.ln += this.props.font.height*1.5
		}
		

		// DOKUMEN
		let dokumen = this.data.objek != null
			? this.data.objek.type == 'dokumen' 
				? this.data.objek.data.jns_dok 
					+ ' nomor ' + this.data.objek.data.no_dok
					+ ' tanggal ' + this.data.objek.data.tgl_dok
				: ''
			: ''

		this.pdf.text('3.', this.props.ind.num, this.ln)
		this.pdf.text('Dokumen*', this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('a.', this.props.ind.lbl, this.ln)
		this.pdf.text('Jenis/No dan Tgl Dokumen', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(dokumen, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*1.5

		// ORANG
		let nama_orang = this.data.objek != null
			? this.data.objek.type == 'orang' 
				? this.data.objek.data.nama : ''
			: ''
		let identitas = this.data.objek != null
			? this.data.objek.type == 'orang' 
				? this.data.objek.data.nomor_identitas + ' (' + this.data.objek.data.jenis_identitas + ')' 
				: ''
			: ''

		this.pdf.text('4.', this.props.ind.num, this.ln)
		this.pdf.text('Orang*', this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('a.', this.props.ind.lbl, this.ln)
		this.pdf.text('Nama', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(nama_orang, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('No Identitas', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(identitas, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height*1.5

		////// URAIAN BOTTOM //////
		// PENERIMA
		this.ln += this.props.font.height
		this.pdf.text('Diserahkan kepada:', this.props.ind.num, this.ln)
		this.ln += this.props.font.height
		
		let nama_penerima = null
		let id_penerima = null
		if (this.data.yang_menerima.type == 'orang') {
			nama_penerima = this.data.yang_menerima.data.nama
			id_penerima = this.data.yang_menerima.data.jenis_identitas 
				+ ' ' + this.data.yang_menerima.data.nomor_identitas 
		} else {
			nama_penerima = this.data.yang_menerima.data.name
			id_penerima = this.data.yang_menerima.data.nip 
		}

		this.pdf.text('Nama', this.props.ind.num, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(nama_penerima, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('NIP/No Identitas', this.props.ind.num, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(id_penerima, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		let txt_menerima = 'Menerima penyerahan untuk/atas nama: ' + this.data.yang_menerima.atas_nama
		let arr_menerima = converters.array_text(txt_menerima, 110)
		this.pdf.text(arr_menerima, this.props.ind.num, this.ln)
		this.ln += this.props.font.height*(arr_menerima.length + 1)

		// DALAM RANGKA
		let txt_dalam_rangka = 'Penyerahan dilaksanakan dalam rangka: ' + this.data.dalam_rangka
		let arr_dalam_rangka = converters.array_text(txt_dalam_rangka, 110)
		this.pdf.text(arr_dalam_rangka, this.props.ind.num, this.ln)
		this.ln += this.props.font.height*(arr_dalam_rangka.length + 1)

		this.pdf.text('Demikian Berita Acara ini dibuat dengan sebenarnya.', this.props.ind.num, this.ln)
		this.ln += this.props.font.height*3

		////// TTD //////
		let ln_tgl_ttd = this.ln
		let ln_ttd_jabatan = ln_tgl_ttd + this.props.font.height
		let ln_ttd_nama = ln_ttd_jabatan + this.props.font.height*5
		let ln_ttd_nip = ln_ttd_nama + this.props.font.height
		this.ln = ln_ttd_nip + this.props.font.height*3

		let nip_penerima = this.data.yang_menerima.type == 'pegawai'
			? 'NIP. ' + this.data.yang_menerima.data.nip
			: ''
		
		let nama_yg_menyerahkan = null
		let nip_yg_menyerahkan = null
		if (this.data.yang_menyerahkan.type == 'orang') {
			nama_yg_menyerahkan = this.data.yang_menyerahkan.data.nama
			nip_yg_menyerahkan = ''
		} else {
			nama_yg_menyerahkan = this.data.yang_menyerahkan.data.name
			nip_yg_menyerahkan = 'NIP. ' + this.data.yang_menyerahkan.data.nip
		}

		this.pdf.text('Yang menerima,', this.props.ind.lbl, ln_ttd_jabatan)
		this.pdf.text(nama_penerima, this.props.ind.lbl, ln_ttd_nama)
		this.pdf.text(nip_penerima, this.props.ind.lbl, ln_ttd_nip)
		
		this.pdf.text('Tangerang, ' + this.data.tanggal_dokumen, this.props.ind.ttd, ln_tgl_ttd)
		this.pdf.text('Yang menyerahkan,', this.props.ind.ttd, ln_ttd_jabatan)
		this.pdf.text(nama_yg_menyerahkan, this.props.ind.ttd, ln_ttd_nama)
		this.pdf.text(nip_yg_menyerahkan, this.props.ind.ttd, ln_ttd_nip)

		////// KETERANGAN //////
		this.pdf.text('Coret yang tidak perlu', this.props.ind.num, this.ln)

		////// LAMPIRAN //////
		if (this.data.objek != null) {
			if (this.data.objek.type == 'barang') {
				if (this.data.objek.data.item.length > 5) {
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

export default PdfSegel