<template>
	<div class="wrapper display-reekspor">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ba_reekspor }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ba_reekspor }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Dokumen Asal</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_dok_asal }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Dokumen Ekspor</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_dok_ekspor }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>MAWB</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_mawb }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>HAWB</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_hawb }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Pesawat</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_nama_sarkut }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Flight</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_flight }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>No Registrasi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_reg_sarkut }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Keterangan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_kedapatan }}
					</CCol>
				</CRow>
				<MyDisplayEntitas
					title="Saksi"
					:data.sync="data_reekspor.saksi"
				/>
				<MyDisplayPegawai
					title="Petugas 1"
					:data.sync="data_reekspor.petugas1"
				/>
				<MyDisplayPegawai
					title="Petugas 2"
					:data.sync="data_reekspor.petugas2"
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
	jenis_dok_asal: null,
	nomor_dok_asal: null,
	tanggal_dok_asal: null,
	jenis_dok_ekspor: null,
	nomor_dok_ekspor: null,
	tanggal_dok_ekspor: null,
	nomor_hawb: null,
	tanggal_hawb: null,
	nomor_mawb: null,
	tanggal_mawb: null,
	nama_sarkut: null,
	nomor_flight: null,
	tanggal_flight: null,
	nomor_reg_sarkut: null,
	kedapatan: null,
}

export default {
	name: 'DisplayReekspor',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai
	},
	props: {
		doc_id: Number
	},
	data() {
		return {
			data_reekspor: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_ba_reekspor() { return this.data_reekspor.no_dok_lengkap || '-' },
		disp_tgl_ba_reekspor() { return this.data_reekspor.tanggal_dokumen || '-' },
		disp_dok_asal() { return ((this.data_reekspor.jenis_dok_asal || '') + ' ' + (this.data_reekspor.nomor_dok_asal || '-') + ' tanggal ' + (this.data_reekspor.tanggal_dok_asal || '')) },
		disp_dok_ekspor() { return ((this.data_reekspor.jenis_dok_ekspor || '') + ' ' + (this.data_reekspor.nomor_dok_ekspor || '-') + ' tanggal ' + (this.data_reekspor.tanggal_dok_ekspor || '')) },
		disp_mawb() { return ((this.data_reekspor.nomor_mawb || '-') + ' tanggal ' + (this.data_reekspor.tanggal_mawb || '')) },
		disp_hawb() { return ((this.data_reekspor.nomor_hawb || '-') + ' tanggal ' + (this.data_reekspor.tanggal_hawb || '')) },
		disp_nama_sarkut() { return this.data_reekspor.nama_sarkut || '-' },
		disp_flight() { return ((this.data_reekspor.nomor_flight || '-') + ' tanggal ' + (this.data_reekspor.tanggal_flight || '-')) },
		disp_reg_sarkut() { return this.data_reekspor.nomor_reg_sarkut || '-' },
		disp_kedapatan() { return this.data_reekspor.kedapatan || '-' },
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById('reekspor', this.doc_id)
			this.data_reekspor = response.data.data
		}
	},
	async mounted() {
		if (this.doc_id != null) {
			await this.getData()	
		}
	}
}
</script>

<style>
.display-reekspor .row+.row {
	margin-top:0;
}
</style>