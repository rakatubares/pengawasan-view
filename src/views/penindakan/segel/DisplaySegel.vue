<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ba_segel }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ba_segel }}</h5>
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
						<b>Jenis Segel</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis_segel }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jumlah Segel</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jumlah_segel }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Nomor Segel</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_nomor_segel }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tempat Segel</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tempat_segel }}
					</CCol>
				</CRow>
				<MyDisplayEntitas
					title="Saksi"
					:data.sync="data_segel.penindakan.saksi"
				/>
				<MyDisplayPegawai
					title="Pejabat 1"
					:data.sync="data_segel.penindakan.petugas1"
				/>
				<MyDisplayPegawai
					title="Pejabat 2"
					:data.sync="data_segel.penindakan.petugas2"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayEntitas from '../../components/DisplayEntitas.vue'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'

const default_data = {
	no_dok_lengkap: null,
	jenis_segel: null,
	jumlah_segel: null,
	nomor_segel: null,
	lokasi_segel: null,
	penindakan: {
		tanggal_penindakan: null,
		sprint: {
			nomor_sprint: null,
			tanggal_sprint: null
		}
	},
}

export default {
	name: 'DisplaySegel',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai
	},
	props: {
		doc_id: Number
	},
	data() {
		return {
			data_segel: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_ba_segel() { return this.data_segel.no_dok_lengkap || '-' },
		disp_tgl_ba_segel() { return this.data_segel.penindakan.tanggal_penindakan || '-' },
		disp_sprint() { return ((this.data_segel.penindakan.sprint.nomor_sprint || '') + ' tanggal ' + (this.data_segel.penindakan.sprint.tanggal_sprint || '')) },
		disp_jenis_segel() { return this.data_segel.jenis_segel || '-' },
		disp_jumlah_segel() { return ((this.data_segel.jumlah_segel || '-') + ' ' + (this.data_segel.satuan_segel || '')) },
		disp_nomor_segel() { return this.data_segel.nomor_segel || '-'},
		disp_tempat_segel() { return this.data_segel.tempat_segel || '-' },
	},
	methods: {
		async getData() {
			this.data_segel = await api.getBasicDataById('segel', this.doc_id)
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>

</style>