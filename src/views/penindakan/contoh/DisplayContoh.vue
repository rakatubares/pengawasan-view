<template>
	<div class="wrapper display-contoh">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ba_contoh }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ba_contoh }}</h5>
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
						<b>Lokasi Pengambilan Contoh</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lokasi }}
					</CCol>
				</CRow>
				<MyDisplayEntitas
					title="Saksi"
					:data.sync="data_contoh.saksi"
				/>
				<MyDisplayPegawai
					title="Petugas 1"
					:data.sync="data_contoh.petugas1"
				/>
				<MyDisplayPegawai
					title="Petugas 2"
					:data.sync="data_contoh.petugas2"
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
	tanggal_dokumen: null,
	lokasi: null,
	sprint: {
		nomor_sprint: null,
		tanggal_sprint: null
	},
}

export default {
	name: 'DisplayContoh',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai
	},
	props: {
		doc_id: Number
	},
	data() {
		return {
			data_contoh: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_ba_contoh() { return this.data_contoh.no_dok_lengkap || '-' },
		disp_tgl_ba_contoh() { return this.data_contoh.tanggal_dokumen || '-' },
		disp_sprint() { return ((this.data_contoh.sprint.nomor_sprint || '') + ' tanggal ' + (this.data_contoh.sprint.tanggal_sprint || '')) },
		disp_lokasi() { return this.data_contoh.lokasi || '-' },
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById('contoh', this.doc_id)
			this.data_contoh = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>
.display-contoh .row+.row {
	margin-top:0;
}
</style>