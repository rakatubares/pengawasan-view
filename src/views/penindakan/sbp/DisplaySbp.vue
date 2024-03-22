<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_sbp }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_sbp }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Surat Perintah</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sprint }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>LPTP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lptp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Lokasi Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lokasi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Uraian Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_uraian }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Alasan Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_alasan }}
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
						<b>Waktu Mulai Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_waktu_mulai }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Waktu Selesai Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_waktu_selesai }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Hal Terjadi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_hal_terjadi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Catatan LPTP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_catatan }}
					</CCol>
				</CRow>
				<CRow class="sep">
					<CCol md="3">
						<h5><b>Saksi</b></h5>
					</CCol>
					<CCol md="9">
						<p 
							class="a nav-link p-0"
							@click="showEntitas(data_sbp.penindakan.saksi.id)"
						>{{ disp_saksi }}</p>
					</CCol>
				</CRow>
				<MyDisplayPegawai
					title="Pejabat 1"
					:data.sync="data_sbp.penindakan.petugas.petugas1"
				/>
				<MyDisplayPegawai
					title="Pejabat 2"
					:data.sync="data_sbp.penindakan.petugas.petugas2"
				/>
				<MyDisplayPejabat
					v-if="doc_type == 'sbp'"
					title="Atasan"
					:data.sync="data_sbp.lptp.petugas.atasan"
				/>
			</CCol>
		</CRow>

		<MyModalEntitasOrang
			ref="modal_saksi"
			:show.sync="show_modal_saksi"
		/>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayEntitas from '../../components/DisplayEntitas.vue'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

const default_data = {
	no_dok_lengkap: null,
	uraian_penindakan: null,
	alasan_penindakan: null,
	jenis_pelanggaran: null,
	wkt_mulai_penindakan: null,
	wkt_selesai_penindakan: null,
	hal_terjadi: null,
	penindakan: {
		tanggal_penindakan: null,
		lokasi_penindakan: null,
		sprint: {
			nomor_sprint: null,
			tanggal_sprint: null
		},
		saksi: {nama: null},
		petugas: {}
	},
	lptp: {
		no_dok_lengkap: null,
		catatan: null,
		petugas: {}
	}
}

export default {
	name: 'DisplaySbp',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai,
		MyDisplayPejabat,
		MyModalEntitasOrang,
	},
	props: {
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_sbp: JSON.parse(JSON.stringify(default_data)),
			show_modal_saksi: false,
		}
	},
	computed: {
		disp_no_sbp() { return this.data_sbp.no_dok_lengkap || '-' },
		disp_tgl_sbp() { return this.data_sbp.penindakan.tanggal_penindakan || '-' },
		disp_sprint() { return ((this.data_sbp.penindakan.sprint.nomor_sprint || '') + ' tanggal ' + (this.data_sbp.penindakan.sprint.tanggal_sprint || '')) },
		disp_lptp() { return this.data_sbp.lptp.no_dok_lengkap || '-' },
		disp_lokasi() {
			var grup_lokasi = this.data_sbp.penindakan.grup_lokasi ? `(${this.data_sbp.penindakan.grup_lokasi.lokasi}) ` : ''
			var lokasi = this.data_sbp.penindakan.lokasi_penindakan ? this.data_sbp.penindakan.lokasi_penindakan : '-'
			return grup_lokasi+lokasi
		},
		disp_uraian() { return this.data_sbp.uraian_penindakan || '-' },
		disp_alasan() { return this.data_sbp.alasan_penindakan || '-' },
		disp_pelanggaran() { return this.data_sbp.jenis_pelanggaran || '-' },
		disp_waktu_mulai() { return ((this.data_sbp.tanggal_mulai_penindakan || '-') + ' ' + (this.data_sbp.waktu_mulai_penindakan || '-')) },
		disp_waktu_selesai() { return ((this.data_sbp.tanggal_selesai_penindakan || '-') + ' ' + (this.data_sbp.waktu_selesai_penindakan || '-')) },
		disp_hal_terjadi() { return this.data_sbp.hal_terjadi || '-' },
		disp_catatan() { return this.data_sbp.lptp.catatan || '-' },
		disp_saksi() { return this.data_sbp.penindakan.saksi.nama || '-'},
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.data_sbp = response.data
		},
		showEntitas(saksi_id) {
			this.$refs.modal_saksi.showModal('show', saksi_id)
		},
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>
.a {
	text-decoration: none;
	background-color: transparent;
	color: #321fdb;
}
.a:hover {
	cursor: pointer;
}
</style>