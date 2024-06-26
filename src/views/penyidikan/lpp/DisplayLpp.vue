<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_lpp }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_lpp }}</h5>
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
						<b>Asal Perkara</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_asal_perkara }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jenis Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis_penindakan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jenis Perkara</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis_perkara }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Status Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_status_pelanggaran }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jenis Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis_pelanggaran }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Modus Operandi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_modus_operandi }}
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
						<b>Tanggal dan Waktu</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tanggal_waktu }}
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
				<MyDisplayPegawai
					title="Penyusun"
					:data.sync="document.petugas.penyusun"
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
			ref="modal_pelaku"
			:show.sync="show_modal_pelaku"
		/>
	</div>
</template>

<script>
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

export default {
	name: 'DisplayLpp',
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
			show_modal_pelaku: false,
		}
	},
	computed: {
		disp_no_lpp() { return this.document.no_dok_lengkap || '-' },
		disp_tgl_lpp() { return this.document.tanggal_dokumen || '-' },
		disp_lp() { return `${this.document.lp.no_dok_lengkap} tanggal ${this.document.lp.tanggal_dokumen}`},
		disp_sbp() { return `${this.document.sbp.no_dok_lengkap} tanggal ${this.document.sbp.tanggal_dokumen}`},
		disp_asal_perkara() { return this.document.asal_perkara || '-' },
		disp_jenis_penindakan() { return this.document.jenis_penindakan || '-' },
		disp_jenis_perkara() { return this.document.jenis_perkara.kategori || '-' },
		disp_status_pelanggaran() { 
			let txt = this.document.penyidikan.tertangkap_tangan
				? 'Tertangkap tangan'
				: 'Tidak tertangkap tangan'
			return txt
		},
		disp_jenis_pelanggaran() { return this.document.penyidikan.jenis_pelanggaran || '-' },
		disp_modus_operandi() { return this.document.penyidikan.modus || '-' },
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
		disp_catatan() { return this.document.catatan || '-' },
		disp_pelaku() { 
			let txt = this.document.penyidikan.pelaku
				? this.document.penyidikan.pelaku.nama : '-'
			return txt
		}
	},
	methods: {
		showEntitas(pelaku_id) {
			this.$refs.modal_pelaku.showModal('show', pelaku_id)
		},
	},
}
</script>

<style>

</style>