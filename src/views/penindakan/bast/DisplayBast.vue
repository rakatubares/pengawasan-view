<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_bast }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1">
						<h5>{{ disp_tgl_bast }}</h5>
					</CCol>
				</CRow>

				<CRow class="mb-1">
					<CCol md="3">
						<b>Dalam rangka</b>
					</CCol>
					<CCol md="9">
						{{ disp_dalam_rangka }}
					</CCol>
				</CRow>
				
				<!-- Yang Menerima -->
				<MyDisplayEntitas
					v-if="data_bast.yang_menerima.type == 'orang'"
					title="Yang Menerima"
					:data.sync="data_bast.yang_menerima.data"
				/>
				<MyDisplayPegawai
					v-else-if="data_bast.yang_menerima.type == 'pegawai'"
					title="Yang Menerima"
					:data.sync="data_bast.yang_menerima.data"
				/>
				<CRow class="my-2">
					<CCol md="3" class="py-1">
						<b>Atas Nama</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ data_bast.yang_menerima.atas_nama }}
					</CCol>
				</CRow>

				<!-- Yang Menyerahkan -->
				<MyDisplayEntitas
					v-if="data_bast.yang_menyerahkan.type == 'orang'"
					title="Yang Menyerahkan"
					:data.sync="data_bast.yang_menyerahkan.data"
				/>
				<MyDisplayPegawai
					v-else-if="data_bast.yang_menyerahkan.type == 'pegawai'"
					title="Yang Menyerahkan"
					:data.sync="data_bast.yang_menyerahkan.data"
				/>
				<CRow class="my-2">
					<CCol md="3" class="py-1">
						<b>Atas Nama</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ data_bast.yang_menyerahkan.atas_nama }}
					</CCol>
				</CRow>
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
	dalam_rangka: null,
	yang_menerima: {
		type: null,
		data: null,
		atas_nama: null,
	},
	yang_menyerahkan: {
		type: null,
		data: null,
		atas_nama: null,
	},
}

export default {
	name: 'DisplayBast',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai
	},
	props: {
		doc_id: Number
	},
	data() {
		return {
			data_bast: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_bast() { return this.data_bast.no_dok_lengkap || '-' },
		disp_tgl_bast() { return this.data_bast.tanggal_dokumen || '-' },
		disp_dalam_rangka() { return this.data_bast.dalam_rangka || '-' },
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById('bast', this.doc_id)
			this.data_bast = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>

</style>