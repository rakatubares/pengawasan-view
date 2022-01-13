<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_dok_lengkap }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_dok }}</h5>
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
						<b>Tanggal Segel</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tanggal_segel }}
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
					title="Pemilik/Saksi"
					:data.sync="data_buka_segel.saksi"
				/>
				<MyDisplayPegawai
					title="Petugas 1"
					:data.sync="data_buka_segel.petugas1"
				/>
				<MyDisplayPegawai
					title="Petugas 2"
					:data.sync="data_buka_segel.petugas2"
				/>
				<!-- <CRow class="mb-1">
					<CCol md="3">
						<b>Nama Pemilik/Saksi</b>
					</CCol>
					<CCol md="9">
						{{ disp_nama_saksi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Alamat</b>
					</CCol>
					<CCol md="9">
						{{ disp_alamat_saksi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Pekerjaan</b>
					</CCol>
					<CCol md="9">
						{{ disp_pekerjaan_saksi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Identitas</b>
					</CCol>
					<CCol md="9">
						{{ disp_identitas }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Petugas 1</b>
					</CCol>
					<CCol md="9">
						{{ disp_petugas1 }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Petugas 2</b>
					</CCol>
					<CCol md="9">
						{{ disp_petugas2 }}
					</CCol>
				</CRow> -->
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
	jenis_segel: null,
	jumlah_segel: null,
	tempat_segel: null,
	sprint: {
		nomor_sprint: null,
		tanggal_sprint: null
	}
}

export default {
	name: 'DisplayBukaSegel',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai
	},
	props: {
		doc_id: Number
	},
	data() {
		return {
			data_buka_segel: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_dok_lengkap() { return this.data_buka_segel.no_dok_lengkap || '-' },
		disp_tgl_dok() { return this.data_buka_segel.tanggal_dokumen || '-' },
		disp_sprint() { return ((this.data_buka_segel.sprint.nomor_sprint || '') + ' tanggal ' + (this.data_buka_segel.sprint.tanggal_sprint || '')) },
		disp_jenis_segel() { return this.data_buka_segel.jenis_segel || '-' },
		disp_jumlah_segel() { return ((this.data_buka_segel.jumlah_segel || '-') + ' ' + (this.data_buka_segel.satuan_segel || '')) },
		disp_nomor_segel() { return this.data_buka_segel.nomor_segel || '-' },
		disp_tanggal_segel() { return this.data_buka_segel.tanggal_segel || '-' },
		disp_tempat_segel() { return this.data_buka_segel.tempat_segel || '-' },
		// disp_nama_saksi() { return this.data.main.data.saksi.nama || '-' },
		// disp_alamat_saksi() { return this.data.main.data.saksi.alamat || '-' },
		// disp_pekerjaan_saksi() { return this.data.main.data.saksi.pekerjaan || '-' },
		// disp_identitas() { return (this.data.main.data.saksi.jenis_identitas || '') + ' ' + (this.data.main.data.saksi.nomor_identitas || '-') },
		// disp_petugas1() { return this.data.main.data.petugas1.name || '-' },
		// disp_petugas2() { 
		// 	if (this.data.main.data.petugas2 != null) {
		// 		return this.data.main.data.petugas2.name
		// 	} else {
		// 		return '-'
		// 	}
		// },
	},
	methods: {
		async getData() {
			this.data_buka_segel = await api.getBasicDataById('bukasegel', this.doc_id)
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>

</style>