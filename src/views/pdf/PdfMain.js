import jsPDF from "jspdf"
import 'jspdf-autotable'

import converters from "../../helpers/converter"

class Pdf {
	constructor(props) {
		this.props = props
		this.pdf = new jsPDF('p', 'mm', [297, 210]);
		this.ln = 50
	}

	prepareDate(tgl_dok=this.data.penindakan.tanggal_penindakan, tgl_sprint=this.data.penindakan.sprint.tanggal_sprint) {
		this.tgl_dok = converters.date(tgl_dok, 'DD-MM-YYYY')
		this.tgl_sprint = converters.date(tgl_sprint, 'DD-MM-YYYY')
		this.full_tgl_dok = this.tgl_dok != null ? converters.fullDate(this.tgl_dok) : ''
		this.full_tgl_sprint = converters.fullDate(this.tgl_sprint)
		this.hr = this.tgl_dok != null ? converters.weekDay(this.tgl_dok) : ''
		this.tgl = this.tgl_dok != null ? this.tgl_dok.getDate() : ''
		this.bln = this.tgl_dok != null ? converters.monthName(this.tgl_dok) : ''
		this.thn = this.tgl_dok != null ? this.tgl_dok.getFullYear() : ''
	}

	/**
	 * Generate kop surat
	 */
	createHeader() {
		// Logo
		var image = new Image()
		image.src = "form/logo-kemenkeu.png"
		this.pdf.addImage(image, 'png', 15, 7.5, (233/8), (216/8));

		// Identitas Kantor
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.setFontSize('13')
		this.pdf.text("KEMENTERIAN KEUANGAN REPUBLIK INDONESIA", 125, 10, "center");
		this.pdf.setFontSize('11')
		this.pdf.text("DIREKTORAT JENDERAL BEA DAN CUKAI", 125, 15, "center");
		this.pdf.setFontSize('13')
		this.pdf.text(["KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE C", "SOEKARNO-HATTA"], 125, 20, "center")
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.setFontSize('7')
		this.pdf.text(
			[
				'AREA KARGO BANDARA SOEKARNO-HATTA, TANGERANG, BANTEN KODE POS 15126; CALL CENTER: 1500225 (BRAVO BC)',
				'EMAIL: BCKPUSOETTA@CUSTOMS.GO.ID; WEBSITE: WWW.BCSOEKARNOHATTA.BEACUKAI.GO.ID;',
				'FACEBOOK: BEA CUKAI SOEKARNO HATTA; LAYANAN INFORMASI: PLI_SH@CUSTOMS.GO.ID; INSTAGRAM: @BCSOETTA;',
				'TWITTER: @BCSOETTA; PENGADUAN MASYARAKAT: WWW.BEACUKAI.GO.ID/PENGADUAN.HTML'
			], 
			125, 30, "center"
		)

		// Underline
		this.pdf.line(10,41,200,41)
	}

	/**
	 * Generate penomoran
	 * 
	 * @param {String} doc_title 
	 * @param {String} doc_no 
	 */
	createNomor(doc_title, doc_no) {
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.setFontSize(this.props.font.size)
	
		this.pdf.text(doc_title, 105, this.ln, 'center')
		this.pdf.line(this.props.title_line.start, this.ln+0.5, this.props.title_line.end, this.ln+0.5)
		
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height
		
		this.pdf.text(doc_no, 105, this.ln, 'center')
		this.ln += this.props.font.height*2
	}

	dataObjek(data_objek, type) {
		let data = data_objek != null
			? data_objek.type == type
				? data_objek.data
				: null
			: null

		return data;
	}

	/**
	 * Data sarana pengangkut
	 * 
	 * @param {String} data_sarkut 
	 * @param {Array} add_components 
	 */
	detailSarkut(data_sarkut, add_components=[]) {
		let data = converters.sarkut(data_sarkut)

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('a.', this.props.ind.alp, this.ln)
		this.pdf.text('Sarana pengangkut* :', this.props.ind.dtl, this.ln)
		this.ln += this.props.font.height

		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text('Nama dan Jenis Sarkut', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.nama, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('No. Voy / Penerbangan / Trayek*', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.flight, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Ukuran / Kapasitas Muatan', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.kapasitas, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nahkoda / Pilot / Pengemudi*', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.pilot, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		if (add_components.includes('identitas')) {
			this.pdf.text('Nomor Identitas', this.props.ind.dtl, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.pdf.text(data.identitas, this.props.ind.txt, this.ln)
			this.ln += this.props.font.height
		}

		this.pdf.text('Bendera', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.bendera, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nomor Register / Polisi*', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.no_reg, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
	}

	/**
	 * Data barang
	 * 
	 * @param {String} data_barang 
	 * @param {Array} add_components 
	 */
	detailBarang(data_barang, add_components=[]) {
		let data = converters.barang(data_barang)
		let item_barang = data_barang != null ? data_barang.item : null
	
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('b.', this.props.ind.alp, this.ln)
		this.pdf.text('Barang* :', this.props.ind.dtl, this.ln)
		this.ln += this.props.font.height
	
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text(['Jumlah / Jenis / Ukuran Nomor', 'Peti Kemas / Kemasan'], this.props.ind.dtl, this.ln)
		this.ln += this.props.font.height
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.kemasan, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
	
		this.pdf.text('Jumlah / Jenis Barang', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let barang = (item_barang != null)
			? (item_barang.length > 0) 
				? (item_barang.length == 1)
					? item_barang[0]['jumlah_barang'] + ' '
						+ item_barang[0]['satuan_barang'] + ' '
						+ item_barang[0]['uraian_barang']
					: 'LIHAT LAMPIRAN'
				: ''
			: ''
		this.pdf.text(barang, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
	
		this.pdf.text('Jenis / Nomor dan Tgl Dokumen', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.dokumen, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
	
		this.pdf.text('Pemilik / Importir / Eksportir / Kuasa*', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.pemilik, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
	
		if (add_components.includes('identitas')) {
			this.pdf.text('Nomor Identitas', this.props.ind.dtl, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.pdf.text(data.identitas, this.props.ind.txt, this.ln)
			this.ln += this.props.font.height
		}
	}

	detailBangunan(data_bangunan) {
		let data = converters.bangunan(data_bangunan)
	
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('c.', this.props.ind.alp, this.ln)
		this.pdf.text('Bangunan atau tempat* :', this.props.ind.dtl, this.ln)
		this.ln += this.props.font.height
	
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text('Alamat', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.alamat, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
	
		this.pdf.text('No Reg Bangunan / NPPBKC / dll.', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.no_reg, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
	
		this.pdf.text('Nama Pemilik / Yang Menguasai*', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.pemilik, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
	}

	detailOrang(data_orang) {
		let data = converters.badan(data_orang)
	
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('d.', this.props.ind.alp, this.ln)
		this.pdf.text('Badan* :', this.props.ind.dtl, this.ln)
		this.ln += this.props.font.height
	
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text('Nama', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.nama, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
	
		this.pdf.text('Tanggal Lahir', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.tgl_lahir, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
	
		this.pdf.text('Kewarganegaraan', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.warga_negara, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
	
		this.pdf.text('Alamat', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.alamat, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
	
		this.pdf.text('Nomor Identitas', this.props.ind.dtl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data.identitas, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height
	}

	ttd(
		txt_saksi, txt_pejabat, 
		saksi=this.data.penindakan.saksi, 
		petugas1=this.data.penindakan.petugas1, 
		petugas2=this.data.penindakan.petugas2, 
		ln_tgl_hgt=1.5, ttd_hgt=6
	) {
		let ln_tgl = this.ln + this.props.font.height*ln_tgl_hgt
		let ln_jabatan_1 = ln_tgl + this.props.font.height
		let ln_nama_1 = ln_jabatan_1 + this.props.font.height*ttd_hgt
		let ln_nip_1 = ln_nama_1 + this.props.font.height
		let ln_nama_2 = ln_nip_1 + this.props.font.height*ttd_hgt
		let ln_nip_2 = ln_nama_2 + this.props.font.height
		this.ln = ln_nip_2

		// Pemilik/kuasa
		this.pdf.text(txt_saksi, this.props.ind.alp, ln_jabatan_1)
		this.pdf.text(saksi.nama, this.props.ind.alp, ln_nama_1)

		// Pejabat
		this.pdf.text('Tangerang, ' + this.full_tgl_dok, this.props.ind.ttd, ln_tgl)
		this.pdf.text(txt_pejabat, this.props.ind.ttd, ln_jabatan_1)
		this.pdf.text(petugas1.name, this.props.ind.ttd, ln_nama_1)
		this.pdf.text('NIP ' + petugas1.nip, this.props.ind.ttd, ln_nip_1)
		if (petugas2 != null) {
			var txt_nama_pejabat2 = petugas2.name
			var txt_nip_pejabat2 = petugas2.nip
		} else {
			var txt_nama_pejabat2 = '...........................................'
			var txt_nip_pejabat2 = '....................................'
		}
		this.pdf.text(txt_nama_pejabat2, this.props.ind.ttd, ln_nama_2)
		this.pdf.text('NIP ' + txt_nip_pejabat2, this.props.ind.ttd, ln_nip_2)
	}

	headerLampiran(no_dok) {
		this.ln_lamp = 10
		this.pdf.setFontSize(this.props.font.size)
		this.pdf.text('LAMPIRAN', this.props.ind.lamp, this.ln_lamp)
		this.ln_lamp += this.props.font.height
		this.pdf.setFontSize(this.props.font.size - 2)
		this.pdf.text(this.jenis_dok, this.props.ind.lamp, this.ln_lamp)
		this.ln_lamp += this.props.font.height
		this.pdf.text('Nomor : ' + no_dok, this.props.ind.lamp, this.ln_lamp)
		this.ln_lamp += this.props.font.height
		this.pdf.text('Tanggal : ' + this.full_tgl_dok, this.props.ind.lamp, this.ln_lamp)
		this.ln_lamp += this.props.font.height*3
	}

	tabelBarang() {
		const tabelData = converters.item_barang(this.data.objek.data.item)
		const tabelHead = [
			{header: 'No', dataKey: 'no'},
			{header: 'Uraian Barang', dataKey: 'uraian'},
			{header: 'Jumlah', dataKey: 'jumlah'},
		]
	
		this.pdf.autoTable({
			columns: tabelHead,
			body: tabelData,
			margin: {top: this.ln_lamp},
			theme: 'grid',
			styles: {
				fontSize: this.props.font.size,
				textColor: 20,
				fillColor: null,
				lineWidth: 0.25,
				lineColor: 1,
			},
			headStyles: {
				halign: 'center'
			},
			columnStyles: {
				0: {
					cellWidth: 10,
					halign: 'center'
				},
				1: {minCellWidth: 50},
				2: {
					minCellWidth: 20,
					halign: 'center'
				},
			},
		})
	}

	watermark() {
		var totalPages = this.pdf.internal.getNumberOfPages();
	
		for (let i = 1; i <= totalPages; i++) {
			this.pdf.setPage(i);
			this.pdf.saveGraphicsState()
			this.pdf.setGState(new this.pdf.GState({opacity: 0.2}))
			this.pdf.setFont('Helvetica', 'bold')
			this.pdf.setTextColor('E02401')
			this.pdf.setFontSize('200')
			this.pdf.text('DRAFT', 75, 270, { angle: 60 })
			this.pdf.restoreGraphicsState()
		}
	}
}

export default Pdf