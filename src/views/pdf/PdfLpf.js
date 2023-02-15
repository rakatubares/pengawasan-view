import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 73,
		end: 138
	},
	ind: {
		alp: 15,
		num: 20,
		lbl: 25,
		cln: 80,
		txt: 85,
		lbl2: 25,
		lbl3: 30,
		ttd:125,
		ttd2: 75,
		lamp: 140
	}
}

class PdfLpf extends Pdf {
	constructor(data) {
		super(props, 30)
		this.jenis_dok = 'LEMBAR PENELITIAN FORMAL (LPF)'
		this.data = data
	}

	generatePdf() {
		this.createHeaderSimple()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.no_dok_lengkap, 50)
		this.prepareDocDate(this.data.tanggal_dokumen)
		
		////// URAIAN PELANGGARAN //////
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('A.', this.props.ind.alp, this.ln)
		this.pdf.text('Uraian Pelanggaran', this.props.ind.num, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height

		this.pdf.text('1.', this.props.ind.num, this.ln)
		this.pdf.text('Jenis Pelanggaran / Pasal', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_jenis_pelanggaran = this.data.penyidikan.jenis_pelanggaran || '-'
		let txt_pasal = this.data.penyidikan.pasal || '-'
		let txt_pelanggaran = txt_jenis_pelanggaran + ' / ' + txt_pasal
		let arr_pelanggaran = converters.array_text(txt_pelanggaran, 70)
		let hgt_pelanggaran = 1
		if (arr_pelanggaran.length > 1) {
			hgt_pelanggaran = arr_pelanggaran.length
		}
		this.pdf.text(arr_pelanggaran, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*hgt_pelanggaran

		this.pdf.text('2.', this.props.ind.num, this.ln)
		this.pdf.text('Tempat (Locus)', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_tempat_pelanggaran = this.data.penyidikan.tempat_pelanggaran || '-'
		txt_tempat_pelanggaran = converters.string(txt_tempat_pelanggaran).replace('\n', ' ')
		let arr_tempat_pelanggaran = converters.array_text(txt_tempat_pelanggaran, 70)
		let hgt_tempat_pelanggaran = 1
		if (arr_tempat_pelanggaran.length > 1) {
			hgt_tempat_pelanggaran = arr_tempat_pelanggaran.length
		}
		this.pdf.text(arr_tempat_pelanggaran, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*hgt_tempat_pelanggaran

		this.pdf.text('3.', this.props.ind.num, this.ln)
		this.pdf.text('Waktu (Tempus)', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_waktu_pelanggaran = this.data.penyidikan.waktu_pelanggaran || '-'
		this.pdf.text(txt_waktu_pelanggaran, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('4.', this.props.ind.num, this.ln)
		this.pdf.text('Pelaku', this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nama', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_nama_pelaku = this.data.penyidikan.pelaku.nama || '-'
		this.pdf.text(txt_nama_pelaku, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Jenis Kelamin', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_jk_pelaku = this.data.penyidikan.pelaku.jenis_kelamin.uraian || '-'
		this.pdf.text(txt_jk_pelaku, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Umur', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('-', this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Alamat', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_alamat_pelaku = this.data.penyidikan.pelaku.alamat_identitas || '-'
		txt_alamat_pelaku = converters.string(txt_alamat_pelaku).replace('\n', ' ')
		let arr_alamat_pelaku = converters.array_text(txt_alamat_pelaku, 70)
		let hgt_alamat_pelaku = 1
		if (arr_alamat_pelaku.length > 1) {
			hgt_alamat_pelaku = arr_alamat_pelaku.length
		}
		this.pdf.text(arr_alamat_pelaku, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*hgt_alamat_pelaku

		this.pdf.text('5.', this.props.ind.num, this.ln)
		this.pdf.text('Status Penangkapan', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_status_penangkapan = this.data.penyidikan.status_penangkapan || '-'
		this.pdf.text(txt_status_penangkapan, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		////// KELENGKAPAN DOKUMEN //////
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('B.', this.props.ind.alp, this.ln)
		this.pdf.text('Kelengkapan Dokumen Penindakan', this.props.ind.num, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height

		this.pdf.text('1.', this.props.ind.num, this.ln)
		this.pdf.text('No. Surat Perintah/Tugas', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_no_sprint = this.data.penindakan.sprint.nomor_sprint || '-'
		let txt_tgl_sprint = this.data.penindakan.sprint.tanggal_sprint || '-'
		let txt_sprint = txt_no_sprint + ' Tanggal ' + txt_tgl_sprint
		this.pdf.text(txt_sprint, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('2.', this.props.ind.num, this.ln)
		this.pdf.text('No. SBP', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_no_sbp = this.data.dokumen.sbp.no_dok_lengkap || '-'
		let txt_tgl_sbp = this.data.dokumen.sbp.tanggal_dokumen || '-'
		let txt_sbp = txt_no_sbp + ' Tanggal ' + txt_tgl_sbp
		this.pdf.text(txt_sbp, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('3.', this.props.ind.num, this.ln)
		this.pdf.text('No. LP/LK/Lap. Polisi', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_no_lp = this.data.dokumen.lp.no_dok_lengkap || '-'
		let txt_tgl_lp = this.data.dokumen.lp.tanggal_dokumen || '-'
		let txt_lp = txt_no_lp + ' Tanggal ' + txt_tgl_lp
		this.pdf.text(txt_lp, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('4.', this.props.ind.num, this.ln)
		this.pdf.text('BAP Saksi atas nama', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_saksi = '-'
		if (
			(this.data.saksi != null) || 
			(this.data.tanggal_bap_saksi != null)
		) {
			let txt_nama_saksi = '-'
			if (this.data.saksi != null) {
				txt_nama_saksi = this.data.saksi.nama
			}
			let txt_tgl_bap_saksi = this.data.tanggal_bap_saksi || '-'
			txt_saksi = txt_nama_saksi + ' Tanggal ' + txt_tgl_bap_saksi
		}
		this.pdf.text(txt_saksi, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('5.', this.props.ind.num, this.ln)
		this.pdf.text('BAP Tersangka atas nama', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_tersangka = '-'
		if (
			(this.data.tersangka != null) || 
			(this.data.tanggal_bap_tersangka != null)
		) {
			let txt_nama_tersangka = '-'
			if (this.data.tersangka != null) {
				txt_nama_tersangka = this.data.tersangka.nama
			}
			let txt_tgl_bap_tersangka = this.data.tanggal_bap_tersangka || '-'
			txt_tersangka = txt_nama_tersangka + ' Tanggal ' + txt_tgl_bap_tersangka
		}
		this.pdf.text(txt_tersangka, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('6.', this.props.ind.num, this.ln)
		this.pdf.text('Resume Perkara', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_resume = '-'
		if (
			(this.data.resume_perkara != null) || 
			(this.data.tanggal_resume_perkara != null)
		) {
			let txt_no_resume = this.data.resume_perkara || '-'
			let txt_tgl_resume = this.data.tanggal_resume_perkara || '-'
			txt_resume = txt_no_resume + ' Tanggal ' + txt_tgl_resume
		}
		this.pdf.text(txt_resume, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('7.', this.props.ind.num, this.ln)
		this.pdf.text('Dokumen lain', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_dokumen_lain = '-'
		if (
			(this.data.jenis_dokumen_lain != null) || 
			(this.data.nomor_dokumen_lain != null) || 
			(this.data.tanggal_resume_perkara != null)
		) {
			let txt_jenis_nomor_dokumen_lain = '-'
			if (
				(this.data.jenis_dokumen_lain != null) ||
				(this.data.nomor_dokumen_lain != null)
			) {
				let txt_jenis_dokumen_lain = ''
				if (this.data.jenis_dokumen_lain != null) {
					txt_jenis_dokumen_lain = this.data.jenis_dokumen_lain + ' '	
				}
				
				let txt_nomor_dokumen_lain = ''
				if (this.data.nomor_dokumen_lain != null) {
					txt_nomor_dokumen_lain = this.data.nomor_dokumen_lain
				}

				if (
					(this.data.jenis_dokumen_lain != null) &&
					(this.data.nomor_dokumen_lain != null)
				) {
					txt_jenis_nomor_dokumen_lain = txt_jenis_dokumen_lain + ' ' + txt_nomor_dokumen_lain
				} else {
					txt_jenis_nomor_dokumen_lain = txt_jenis_dokumen_lain + txt_nomor_dokumen_lain
				}
			}

			let txt_tgl_dokumen_lain = this.data.tanggal_resume_perkara || '-'
			txt_dokumen_lain = txt_jenis_nomor_dokumen_lain + ' Tanggal ' + txt_tgl_dokumen_lain
		}
		this.pdf.text(txt_dokumen_lain, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		////// BHP //////
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('C.', this.props.ind.alp, this.ln)
		this.pdf.text('Barang Hasil Penindakan', this.props.ind.num, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height

		this.pdf.text('1.', this.props.ind.num, this.ln)
		this.pdf.text('Komoditi', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_komoditi = '-'
		let hgt_komoditi = 1
		if (this.data.barang != null) {
			txt_komoditi = this.getKomoditi(this.data.barang.item)
			txt_komoditi = converters.array_text(txt_komoditi, 50)
			hgt_komoditi = txt_komoditi.length
		}
		this.pdf.text(txt_komoditi, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*hgt_komoditi

		this.pdf.text('Uraian Barang', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_barang = '-'
		if (this.data.barang != null) {
			if (this.data.barang.item.length == 0) {
				txt_barang = '-'
			} else if (this.data.barang.item.length > 1) {
				txt_barang = 'LIHAT LAMPIRAN'
			} else {
				txt_barang = this.data.barang.item[0].uraian_barang
			}	
		}
		let arr_barang = converters.array_text(txt_barang, 70)
		this.pdf.text(txt_barang, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*arr_barang.length

		this.pdf.text('Merek', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_merek = '-'
		if (this.data.barang != null) {
			if (this.data.barang.item.length == 0) {
				txt_merek = '-'
			} else if (this.data.barang.item.length > 1) {
				txt_merek = 'LIHAT LAMPIRAN'
			} else {
				txt_merek = this.data.barang.item[0].merk
			}	
		}
		let arr_merek = converters.array_text(txt_merek, 70)
		this.pdf.text(arr_merek, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*arr_merek.length

		this.pdf.text('Kondisi', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_kondisi = '-'
		if (this.data.barang != null) {
			if (this.data.barang.item.length == 0) {
				txt_kondisi = '-'
			} else if (this.data.barang.item.length > 1) {
				txt_kondisi = 'LIHAT LAMPIRAN'
			} else {
				txt_kondisi = this.data.barang.item[0].kondisi
			}	
		}
		let arr_kondisi = converters.array_text(txt_kondisi, 70)
		this.pdf.text(arr_kondisi, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*arr_kondisi.length

		this.pdf.text('Tipe', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_tipe = '-'
		if (this.data.barang != null) {
			if (this.data.barang.item.length == 0) {
				txt_tipe = '-'
			} else if (this.data.barang.item.length > 1) {
				txt_tipe = 'LIHAT LAMPIRAN'
			} else {
				txt_tipe = this.data.barang.item[0].tipe
			}	
		}
		let arr_tipe = converters.array_text(txt_tipe, 70)
		this.pdf.text(arr_tipe, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*arr_tipe.length

		this.pdf.text('Spesifikasi Lain', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_spesifikasi = '-'
		if (this.data.barang != null) {
			if (this.data.barang.item.length == 0) {
				txt_spesifikasi = '-'
			} else if (this.data.barang.item.length > 1) {
				txt_spesifikasi = 'LIHAT LAMPIRAN'
			} else {
				txt_spesifikasi = this.data.barang.item[0].spesifikasi_lain
			}	
		}
		let arr_spesifikasi = converters.array_text(txt_spesifikasi, 70)
		this.pdf.text(arr_spesifikasi, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*arr_spesifikasi.length

		this.pdf.text('2.', this.props.ind.num, this.ln)
		this.pdf.text('Dokumen Pab./Cukai Asal', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_jenis_dokumen_asal = this.data.barang.dokumen.jns_dok || '-'
		this.pdf.text(txt_jenis_dokumen_asal, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Kantor Pendaftaran', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('', this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nomor', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_nomor_dokumen_asal = this.data.barang.dokumen.no_dok || '-'
		this.pdf.text(txt_nomor_dokumen_asal, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Tanggal', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_tanggal_dokumen_asal = this.data.barang.dokumen.tgl_dok || '-'
		this.pdf.text(txt_tanggal_dokumen_asal, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		// Sarkut
		let txt_jenis_sarkut = '-'
		let txt_nomor_sarkut = '-'
		if (this.data.penyidikan.sarkut != null) {
			txt_jenis_sarkut = this.data.penyidikan.sarkut.jenis_sarkut
			let txt_nomor_flight = this.data.penyidikan.sarkut.no_flight_trayek || '-'
			let txt_nomor_registrasi = this.data.penyidikan.sarkut.no_reg_polisi || '-'
			txt_nomor_sarkut = txt_nomor_flight + ' / ' + txt_nomor_registrasi
		}

		this.pdf.text('3.', this.props.ind.num, this.ln)
		this.pdf.text('Pengangkut', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(txt_jenis_sarkut, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('No. Voyage/No. Polisi', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(txt_nomor_sarkut, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Kontainer No.', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('-', this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Ukuran', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('-', this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		////// KESIMPULAN //////
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('D.', this.props.ind.alp, this.ln)
		this.pdf.text('Kesimpulan', this.props.ind.num, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_kesimpulan = this.data.kesimpulan || '-'
		let arr_kesimpulan = converters.array_text(txt_kesimpulan, 70)
		this.pdf.text(arr_kesimpulan, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*arr_kesimpulan.length

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('E.', this.props.ind.alp, this.ln)
		this.pdf.text('Usulan', this.props.ind.num, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_usulan = this.data.usulan || '-'
		let arr_usulan = converters.array_text(txt_usulan, 70)
		this.pdf.text(arr_usulan, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*arr_usulan.length

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('F.', this.props.ind.alp, this.ln)
		this.pdf.text('Catatan/disposisi atasan', this.props.ind.num, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.ln += this.props.font.height*2

		let y_rect_catatan = this.ln - 5
		let txt_catatan = this.data.catatan || '-'
		let arr_catatan = converters.array_text(txt_catatan, 110)
		this.pdf.text(arr_catatan, this.props.ind.lbl, this.ln)
		let h_rect_catatan = this.props.font.height*(arr_catatan.length+1)
		this.pdf.rect(this.props.ind.num, y_rect_catatan, 180, h_rect_catatan, 'D')
		this.ln += h_rect_catatan+this.props.font.height

		////// TTD //////
		this.pdf.text(`Tangerang, ${this.full_tgl_dok}`, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height

		let plh_atasan1 = (this.data.atasan1.plh == true) ? 'Plh. ' : '';
		this.pdf.text(`${plh_atasan1}${this.data.atasan1.jabatan.jabatan}`, this.props.ind.alp, this.ln)
		this.pdf.text(`Tim Peneliti,`, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height*5

		this.pdf.text(this.data.atasan1.user.name, this.props.ind.alp, this.ln)
		this.pdf.text(this.data.peneliti.name, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height

		this.pdf.text(`NIP. ${this.data.atasan1.user.nip}`, this.props.ind.alp, this.ln)
		this.pdf.text(`NIP. ${this.data.peneliti.nip}`, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height*2

		let plh_atasan2 = (this.data.atasan2.plh == true) ? 'Plh. ' : '';
		this.pdf.text(`${plh_atasan2}${this.data.atasan2.jabatan.jabatan}`, this.props.ind.ttd2, this.ln)
		this.ln += this.props.font.height*5

		this.pdf.text(this.data.atasan2.user.name, this.props.ind.ttd2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text(`NIP. ${this.data.atasan2.user.nip}`, this.props.ind.ttd2, this.ln)

		////// LAMPIRAN //////
		if (this.data.barang != null) {
			// if (this.data.objek.type == 'barang') {
				if (this.data.barang.item.length > 1) {
					this.pdf.setFont('Helvetica', 'normal')
					this.pdf.addPage()
					// Header
					this.headerLampiran(this.data.no_dok_lengkap)
					// Tabel barang
					this.tabelBarang(this.data.barang.item, true)
				}
			// }
		}

		////// WATERMARK //////
		if ([100].includes(this.data.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}

	getKomoditi(item_barang) {
		let flat_komoditi = [];
		item_barang.forEach(item => {
			if (item.kategori != null) {
				let kategori = item.kategori.kategori
				if (!flat_komoditi.includes(kategori)) {
					flat_komoditi.push(kategori)	
				}
			}
		});
		
		let txt_komoditi = flat_komoditi.join(', ');
		return txt_komoditi
	}
}

export default PdfLpf