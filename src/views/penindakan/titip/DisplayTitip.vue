<template>
	<div class="wrapper display-titip">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ba_titip }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ba_titip }}</h5>
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
						<b>BA Segel</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_segel }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Lokasi Penitipan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lokasi_titip }}
					</CCol>
				</CRow>
				<MyDisplayEntitas
					title="Pemilik/Penerima"
					:data.sync="data_titip.penerima"
				/>
				<MyDisplayEntitas
					title="Saksi"
					:data.sync="data_titip.saksi"
				/>
				<MyDisplayPegawai
					title="Petugas 1"
					:data.sync="data_titip.petugas1"
				/>
				<MyDisplayPegawai
					title="Petugas 2"
					:data.sync="data_titip.petugas2"
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
	nomor_segel: null,
	tanggal_segel: null,
	lokasi_titip: null,
	sprint: {
		nomor_sprint: null,
		tanggal_sprint: null
	}
}

export default {
	name: 'DisplayTitip',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai
	},
	props: {
		doc_id: Number
	},
	data() {
		return {
			data_titip: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_ba_titip() { return this.data_titip.no_dok_lengkap || '-' },
		disp_tgl_ba_titip() { return this.data_titip.tanggal_dokumen || '-' },
		disp_segel() {
			let txt_no_segel = this.data_titip.nomor_segel || '-'
			let txt_tgl_segel = ''
			if (this.data_titip.tanggal_segel != null) {
				txt_tgl_segel = ' tanggal ' + this.data_titip.tanggal_segel
			} else {
				txt_tgl_segel = ''
			}
			return txt_no_segel + txt_tgl_segel
		},
		disp_sprint() { return ((this.data_titip.sprint.nomor_sprint || '') + ' tanggal ' + (this.data_titip.sprint.tanggal_sprint || '')) },
		disp_lokasi_titip() { return this.data_titip.lokasi_titip || '-' },
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById('titip', this.doc_id)
			this.data_titip = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>
.display-titip .row+.row {
	margin-top:0;
}
</style>