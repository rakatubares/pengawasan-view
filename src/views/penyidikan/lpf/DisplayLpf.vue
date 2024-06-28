<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_lpf }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_lpf }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jenis Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_pelanggaran }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Pasal</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_pasal }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tempat</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tempat }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Waktu</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tanggal_waktu }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Status Penangkapan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_status_penangkapan }}
					</CCol>
				</CRow>
				<CRow class="sep">
					<CCol md="3">
						<h5><b>Pelaku</b></h5>
					</CCol>
					<CCol md="9">
						<p 
							class="a nav-link p-0"
							@click="showEntitas(document.penyidikan.pelaku.id)"
						>{{ disp_pelaku }}</p>
					</CCol>
				</CRow>
				<CRow class="mt-2 mb-1 sep">
					<CCol md="3" class="py-1">
						<b>Surat Perintah</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sprint }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>SBP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sbp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>LP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lp }}
					</CCol>
				</CRow>
				<CRow class="sep">
					<CCol md="3">
						<h5><b>BAP Saksi</b></h5>
					</CCol>
					<CCol md="9">
						<p 
							class="a nav-link p-0"
							@click="showEntitas(document.saksi.id)"
						>{{ disp_saksi }}</p>
					</CCol>
				</CRow>
				<CRow class="sep">
					<CCol md="3">
						<h5><b>BAP Tersangka</b></h5>
					</CCol>
					<CCol md="9">
						<p 
							class="a nav-link p-0"
							@click="showEntitas(document.tersangka.id)"
						>{{ disp_tersangka }}</p>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Resume Perkara</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_resume_perkara }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Dokumen Lain</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_dokumen_lain }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Kesimpulan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_kesimpulan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Usulan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_usulan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Catatan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_catatan }}
					</CCol>
				</CRow>
				<MyDisplayPegawai
					title="Peneliti"
					:data.sync="document.petugas.peneliti"
				/>
				<MyDisplayPejabat
					title="Atasan 1"
					:data.sync="document.petugas.atasan1"
				/>
				<MyDisplayPejabat
					title="Atasan 2"
					:data.sync="document.petugas.atasan2"
				/>
			</CCol>
		</CRow>

		<MyModalEntitasOrang
			ref="modal_entitas"
			:show.sync="show_modal_entitas"
		/>
	</div>
</template>

<script>
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

export default {
	name: 'DisplayLpf',
	components: {
		MyDisplayPegawai,
		MyDisplayPejabat,
		MyModalEntitasOrang,
	},
	props: {
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			show_modal_entitas: false,
		}
	},
	computed: {
		disp_no_lpf() { return this.document.no_dok_lengkap || '-' },
		disp_tgl_lpf() { return this.document.tanggal_dokumen || '-' },
		disp_pelanggaran() { return this.document.penyidikan.jenis_pelanggaran || '-' },
		disp_pasal() { return this.document.penyidikan.pasal || '-' },
		disp_tempat() { return this.document.penyidikan.tempat_pelanggaran || '-' },
		disp_tanggal_waktu() { 
			let tanggal = this.document.penyidikan.tanggal_pelanggaran
			let waktu = this.document.penyidikan.waktu_pelanggaran

			let txt = tanggal 
				? waktu 
					? `${tanggal} ${waktu}`
					: tanggal
				: waktu 
					? waktu
					: '-'
			return txt
		},
		disp_status_penangkapan() { 
			let txt = this.document.penyidikan.tertangkap_tangan
				? 'Tertangkap tangan'
				: 'Tidak tertangkap tangan'
			return txt
		},
		disp_sprint() { 
			let txt = '-'

			if (this.document.penindakan.sprint) {
				txt = (
					(this.document.penindakan.sprint.nomor_sprint || '') 
					+ ' tanggal ' 
					+ (this.document.penindakan.sprint.tanggal_sprint || '')
				)
			}
			return txt 
		},
		disp_lp() { return `${this.document.lp.no_dok_lengkap} tanggal ${this.document.lp.tanggal_dokumen}`},
		disp_sbp() { return `${this.document.sbp.no_dok_lengkap} tanggal ${this.document.sbp.tanggal_dokumen}`},
		disp_pelaku() { return this.document.penyidikan.pelaku.nama || '-' },
		disp_saksi() { 
			let txt = this.document.saksi.nama
				? this.document.tanggal_bap_saksi
					? `${this.document.saksi.nama} tanggal ${this.document.tanggal_bap_saksi}`
					: this.document.saksi.nama
				: this.document.tanggal_bap_saksi
					? `tanggal ${this.document.tanggal_bap_saksi}`
					: '-'

			return txt
		},
		disp_tanggal_bap_saksi() { return this.document.tanggal_bap_saksi || '-' },
		disp_tersangka() { return this.document.tersangka.nama || '-' },
		disp_tanggal_bap_tersangka() { return this.document.tanggal_bap_tersangka || '-' },
		disp_resume_perkara() { return this.document.resume_perkara || '-' },
		disp_tanggal_resume_perkara() { return this.document.tanggal_resume_perkara || '-' },
		disp_dokumen_lain() { 
			var dokumen_lain = this.document.jenis_dokumen_lain + this.document.nomor_dokumen_lain
			return dokumen_lain
		},
		disp_tanggal_dokumen_lain() { return this.document.tanggal_dokumen_lain || '-' },
		disp_kesimpulan() { return this.document.kesimpulan || '-' },
		disp_usulan() { return this.document.usulan || '-' },
		disp_catatan() { return this.document.catatan || '-' },
	},
	methods: {
		showEntitas(entitas_id) {
			this.$refs.modal_entitas.showModal('show', entitas_id)
		},
	},
}
</script>

<style>

</style>