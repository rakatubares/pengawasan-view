import PdfPenindakan from "./PdfPenindakan";

const inds = {
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
	ttd1: 17,
	ttd2: 127,
	lamp: 130
}

class PdfPengaman extends PdfPenindakan {
	constructor(
		data,
		title = 'BERITA ACARA PELEKATAN TANDA PENGAMAN',
	) {
		super(data, title, inds)
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)

		this.txt = {}
		
		this.txt.nama_petugas_1 = this.data.penindakan.petugas.petugas1
			? this.data.penindakan.petugas.petugas1.name || '-'
			: '-'
		this.txt.pangkat_petugas_1 = this.data.penindakan.petugas.petugas1
			? this.data.penindakan.petugas.petugas1.pangkat || '-'
			: '-'
		this.txt.nip_petugas_1 = this.data.penindakan.petugas.petugas1
			? this.data.penindakan.petugas.petugas1.nip || '-'
			: '-'

		this.txt.nama_petugas_2 = this.data.penindakan.petugas.petugas2
			? this.data.penindakan.petugas.petugas2.name || '-'
			: '-'
		this.txt.pangkat_petugas_2 = this.data.penindakan.petugas.petugas2
			? this.data.penindakan.petugas.petugas2.pangkat || '-'
			: '-'
		this.txt.nip_petugas_2 = this.data.penindakan.petugas.petugas2
			? this.data.penindakan.petugas.petugas2.nip || '-'
			: '-'

		this.txt.lokasi = this.data.penindakan.lokasi_penindakan || '-'
		this.txt.alasan = this.data.alasan_pengamanan || '-'
		this.txt.keterangan = this.data.keterangan || '-'

		let jenis = this.data.jenis_pengaman || '     '
		let jumlah = this.data.jumlah_pengaman
			? this.data.satuan_pengaman
				? `${this.data.jumlah_pengaman} ${this.converters.numTerbilang(this.data.jumlah_pengaman)} ${this.data.satuan_pengaman}`
				: this.data.jumlah_pengaman
			: '     '
		let nomor = this.data.nomor_pengaman || '     '
		let tempat = this.data.tempat_pengaman || '     '
		this.txt.pengaman = `Dengan menggunakan tanda pengaman ${jenis} sebanyak ${jumlah}`
			+ ` Nomor ${nomor}. Penempatan/pelekatan tanda pengamanan dilakukan pada: ${tempat}.`

		this.txt.nama_saksi = this.data.penindakan.saksi
			? this.data.penindakan.saksi.nama || '-'
			: '-'
		this.txt.alamat_saksi = this.data.penindakan.saksi
			? this.data.penindakan.saksi.alamat_identitas.replace('\n', ' ') || '-'
			: '-'
		this.txt.pekerjaan_saksi = this.data.penindakan.saksi
			? this.data.penindakan.saksi.pekerjaan || '-'
			: '-'
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		this.write(this.opening())
		this.break(.5)

		this.write('1.', inds.alp)
		this.write('Nama', inds.dtl)
		this.write(':', inds.cln2)
		this.write(this.txt.nama_petugas_1, inds.txt2)
		this.break()
		this.write('Pangkat', inds.dtl)
		this.write(':', inds.cln2)
		this.write(this.txt.pangkat_petugas_1, inds.txt2)
		this.break()
		this.write('NIP', inds.dtl)
		this.write(':', inds.cln2)
		this.write(this.txt.nip_petugas_1, inds.txt2)
		this.break(.5)

		this.write('2.', inds.alp)
		this.write('Nama', inds.dtl)
		this.write(':', inds.cln2)
		this.write(this.txt.nama_petugas_2, inds.txt2)
		this.break()
		this.write('Pangkat', inds.dtl)
		this.write(':', inds.cln2)
		this.write(this.txt.pangkat_petugas_2, inds.txt2)
		this.break()
		this.write('NIP', inds.dtl)
		this.write(':', inds.cln2)
		this.write(this.txt.nip_petugas_2, inds.txt2)
		this.break(.5)

		this.write('Telah melakukan pelekatan tanda pengaman atas:')
		this.break()

		this.writeSarkut(this.data.penindakan.objek.sarkut)
		this.writeBarang(this.data.penindakan.objek.barang)

		this.write('Lokasi pengamanan', inds.alp)
		this.write(':', inds.cln4)
		this.write(this.txt.lokasi, inds.txt4)
		this.break()

		this.write('Alasan pengamanan', inds.alp)
		this.write(':', inds.cln4)
		this.write(this.txt.alasan, inds.txt4)
		this.break()

		this.write('Keterangan', inds.alp)
		this.write(':', inds.cln4)
		this.write(this.txt.keterangan, inds.txt4)
		this.break(.5)

		this.write(this.txt.pengaman)
		this.break(.5)

		this.write('Pelekatan tanda pengaman disaksikan oleh:')
		this.break()

		this.write('Nama', inds.dtl)
		this.write(':', inds.cln2)
		this.write(this.txt.nama_saksi, inds.txt2)
		this.break()

		this.write('Alamat', inds.dtl)
		this.write(':', inds.cln2)
		this.write(this.txt.alamat_saksi, inds.txt2)
		this.break()

		this.write('Pekerjaan', inds.dtl)
		this.write(':', inds.cln2)
		this.write(this.txt.pekerjaan_saksi, inds.txt2)
		this.break()

		this.write('Selaku pemilik / kuasa sarana pengangkut / barang.')
		this.break(.5)

		this.write('Demikian Catatan Tanda Pengaman ini dibuat dengan sebenarnya.')
		this.break(.5)

		///// TTD /////
		this.write(`Tangerang, ${this.full_tgl_dok}`, inds.ttd2)
		this.break()

		let ln_ttd = this.ln

		// Saksi
		this.ttd(
			inds.ttd1,
			'Yang menyaksikan,',
			undefined,
			this.txt.nama_saksi,
		)
		this.break()

		// Pejabat
		this.ln = ln_ttd
		this.ttd(
			inds.ttd2,
			'Yang melakukan pelekatan Tanda Pengaman,',
			undefined, 
			this.data.penindakan.petugas.petugas1.name,
			this.data.penindakan.petugas.petugas1.nip,
		)

		if (this.data.penindakan.petugas.petugas2) {
			this.break()
			this.ttd(
				inds.ttd2,
				undefined,
				undefined, 
				this.data.penindakan.petugas.petugas2.name,
				this.data.penindakan.petugas.petugas2.nip,
				3,
			)	
		}

		////// LAMPIRAN //////
		if (this.data.penindakan.objek.barang) {
			if (this.data.penindakan.objek.barang.item.length > 1) {
				this.pdf.setFont('Helvetica', 'normal')
				this.pdf.addPage()
				// Header
				this.headerLampiran()
				// Tabel barang
				this.tabelBarang(this.data.penindakan.objek.barang.item)
			}
		}
	}
}

export default PdfPengaman