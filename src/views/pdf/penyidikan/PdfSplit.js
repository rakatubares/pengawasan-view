import converters from "../../../helpers/converter";
import pangkat from "../../../helpers/pangkat"
import Pdf from "../MyPdf"

const inds = {
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
	lamp: 140,
}

class PdfSplit extends Pdf {
	constructor(data) {
		super(data, 'SURAT PERINTAH PENELITIAN (SPLIT)', 30)
	}

	generateText()
	{
		super.generateText()

		this.txt.lp = 'Laporan Pelanggaran Nomor : ' + this.data.lp.no_dok_lengkap +
			' Tanggal ' + this.data.lp.tanggal_dokumen + '.'

		this.txt.uraian_lp = 'Bahwa dengan adanya Laporan Pelanggaran ' + this.data.penyidikan.jenis_pelanggaran + ', ' +
			'maka dipandang perlu untuk mengumpulkan bahan keterangan dan menemukan bukti permulaan yang cukup ' +
			'akan adanya tindak pidana kepabeanan dan/atau cukai.'

		this.txt.dugaan = 'Melakukan tugas penelitian berupa mencari, mengumpulkan bahan keterangan, ' +
			'dan menemukan bukti permulaan yang cukup atas perkara ' + this.data.dugaan_pelanggaran +
			' yang diduga dilakukan oleh:'
	}

	writeText()
	{
		this.createHeaderSimple()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		////// DASAR //////
		this.pdf.setFont('Helvetica', 'bold')
		this.write('Dasar')
		this.pdf.setFont('Helvetica', 'normal')
		this.write(':', inds.cln)

		this.write('1.', inds.num)
		let txt_dasar_1 = 'Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan ' +
			'sebagaimana telah diubah dengan Undang-Undang Nomor 17 Tahun 2006;'
		this.write(txt_dasar_1, inds.txt)
		this.break()

		this.write('2.', inds.num)
		let txt_dasar_2 = 'Undang-Undang Nomor 11 Tahun 1995 tentang Cukai ' +
				'sebagaimana telah diubah dengan Undang-Undang Nomor 39 Tahun 2007;'
		this.write(txt_dasar_2, inds.txt)
		this.break()

		this.write('3.', inds.num)
		let txt_dasar_3 = 'Peraturan Menteri Keuangan Nomor 74/PMK.01/2009 tentang ' +
				'Organisasi dan Tata Kerja Instansi Vertikal Direktorat Jenderal Bea dan Cukai;'
		this.write(txt_dasar_3, inds.txt)
		this.break()

		this.write('4.', inds.num)
		this.write(this.txt.lp, inds.txt)
		this.break(1)

		////// PERTIMBANGAN //////
		this.pdf.setFont('Helvetica', 'bold')
		this.write('Pertimbangan')
		this.pdf.setFont('Helvetica', 'normal')
		this.write(':', inds.cln)

		this.write('1.', inds.num)
		this.write(this.txt.uraian_lp, inds.txt)
		this.break()

		this.write('2.', inds.num)
		let txt_perlu = 'Bahwa untuk maksud tersebut perlu dikeluarkan Surat Perintah Penelitian.'
		this.write(txt_perlu, inds.txt)
		this.break(1)


		this.pdf.setFont('Helvetica', 'bold')
		this.write('D I P E R I N T A H K A N', this.page_width/2, this.ln, 'center')
		this.pdf.setFont('Helvetica', 'normal')
		this.break(1)


		////// KEPADA //////
		this.pdf.setFont('Helvetica', 'bold')
		this.write('Kepada')
		this.pdf.setFont('Helvetica', 'normal')
		this.write(':', inds.cln)

		let n = 1
		this.data.petugas.pelaksana.forEach(pelaksana => {
			this.write(`${n}.`, inds.num)
			this.write('Nama', inds.txt)
			this.write(':', inds.cln2)
			this.write(pelaksana.name, inds.txt2)
			this.break()

			this.write('NIP', inds.txt)
			this.write(':', inds.cln2)
			this.write(pelaksana.nip, inds.txt2)
			this.break()

			this.write('Pangkat / Gol.', inds.txt)
			this.write(':', inds.cln2)
			let txt_pangkat = `${pangkat.getPangkat(pelaksana.pangkat)} / ${pelaksana.pangkat}`
			this.write(txt_pangkat, inds.txt2)
			this.break()

			this.write('Jabatan', inds.txt)
			this.write(':', inds.cln2)
			this.write('Pelaksana pemeriksa', inds.txt2)
			this.break(1)

			n += 1
		});

		////// UNTUK //////
		this.pdf.setFont('Helvetica', 'bold')
		this.write('Untuk')
		this.pdf.setFont('Helvetica', 'normal')
		this.write(':', inds.cln)

		// Pelaku
		this.write('1.', inds.num)
		this.write(this.txt.dugaan, inds.txt)
		this.break(1)

		this.write('Nama', inds.txt)
		this.write(':', inds.cln3)
		this.write(this.data.penyidikan.pelaku.nama, inds.txt3)
		this.break()

		this.write('Pekerjaan', inds.txt)
		this.write(':', inds.cln3)
		this.write(this.data.penyidikan.pelaku.pekerjaan, inds.txt3)
		this.break()

		this.write('Tempat/tanggal lahir', inds.txt)
		this.write(':', inds.cln3)
		let txt_ttl = `${this.data.penyidikan.pelaku.tempat_lahir} / ${this.data.penyidikan.pelaku.tanggal_lahir}`
		this.write(txt_ttl, inds.txt3)
		this.break()

		this.write('Alamat', inds.txt)
		this.write(':', inds.cln3)
		let alamat = this.data.penyidikan.pelaku.alamat_identitas ?? this.data.penyidikan.pelaku.alamat_tinggal
		alamat = converters.string(alamat)
		this.write(alamat, inds.txt3)
		this.break(1)

		// Lapor
		this.write('2.', inds.num)
		let txt_lapor = 'Setelah melaksanakan Surat Perintah ini agar melaporkan kepada yang memberi perintah.'
		this.write(txt_lapor, inds.txt)
		this.break(1)

		////// PENUTUP //////
		this.write('Demikian surat perintah ini dibuat untuk dilaksanakan dengan penuh tanggung jawab.')
		this.break(1)

		////// TTD //////
		this.write('Dikeluarkan di', inds.ttd)
		this.write(':', inds.cln4)
		this.write('Tangerang', inds.txt4)
		this.break()

		this.write('Pada tanggal', inds.ttd)
		this.write(':', inds.cln4)
		this.write(this.full_tgl_dok, inds.txt4)
		this.pdf.line(inds.ttd, this.ln+0.5, inds.ttd+60, this.ln+0.5)
		this.break()

		this.ttd(
			inds.ttd,
			this.data.petugas.pejabat.jabatan,
			this.data.petugas.pejabat.txt_tipe_ttd,
			this.data.petugas.pejabat.name,
			this.data.petugas.pejabat.nip,
		)
		this.break()

		////// TEMBUSAN //////
		this.cc(this.data.tembusan)
	}
}

export default PdfSplit