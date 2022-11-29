<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-4 mx-2" md="12">
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tanggal Penarikan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tanggal }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Lokasi Penyimpanan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lokasi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Keterangan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_keterangan }}
					</CCol>
				</CRow>
				<MyDisplayPegawai
					title="Petugas Penarikan"
					:data.sync="data_tarik.petugas_penarikan"
				/>

				<!-- Button simpan -->
				<CRow class="mt-2">
					<CCol sm="12">
						<CButton
							color="success"
							@click="editData"
						>
							Edit
						</CButton>
					</CCol>
				</CRow>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'

const default_data = {
	tanggal_penarikan: null,
	lokasi_penyimpanan: null,
	keterangan_penarikan: null,
	petugas_penarikan: {user_id: null}
}

export default {
	name: 'DisplayPenarikanBhp',
	components: {
		MyDisplayPegawai
	},
	props: {
		doc_id: Number
	},
	data() {
		return {
			data_tarik: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_tanggal() { return this.data_tarik.tanggal_penarikan || '-' },
		disp_lokasi() { return this.data_tarik.lokasi_penyimpanan || '-' },
		disp_keterangan() { return this.data_tarik.keterangan_penarikan || '-' },
	},
	methods: {
		async getData() {
			this.data_tarik = await api.getDocumentById('sbp/tarik', this.doc_id)
		},
		editData() {
			this.$emit('edit-data')
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>

</style>