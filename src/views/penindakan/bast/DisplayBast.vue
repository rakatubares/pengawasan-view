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
					v-if="data_bast.main.data.yang_menerima.type == 'orang'"
					title="Yang Menerima"
					:data.sync="data_bast.main.data.yang_menerima.data"
				/>
				<MyDisplayPegawai
					v-else-if="data_bast.main.data.yang_menerima.type == 'pegawai'"
					title="Yang Menerima"
					:data.sync="data_bast.main.data.yang_menerima.data"
				/>
				<CRow class="my-2">
					<CCol md="3" class="py-1">
						<b>Atas Nama</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ data_bast.main.data.yang_menerima.atas_nama }}
					</CCol>
				</CRow>

				<!-- Yang Menyerahkan -->
				<MyDisplayEntitas
					v-if="data_bast.main.data.yang_menyerahkan.type == 'orang'"
					title="Yang Menyerahkan"
					:data.sync="data_bast.main.data.yang_menyerahkan.data"
				/>
				<MyDisplayPegawai
					v-else-if="data_bast.main.data.yang_menyerahkan.type == 'pegawai'"
					title="Yang Menyerahkan"
					:data.sync="data_bast.main.data.yang_menyerahkan.data"
				/>
				<CRow class="my-2">
					<CCol md="3" class="py-1">
						<b>Atas Nama</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ data_bast.main.data.yang_menyerahkan.atas_nama }}
					</CCol>
				</CRow>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import MyDisplayEntitas from '../../components/DisplayEntitas.vue'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'

export default {
	name: 'DisplayBast',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai
	},
	props: {
		data_bast: Object
	},
	computed: {
		disp_no_bast() { return this.data_bast.main.data.no_dok_lengkap || '-' },
		disp_tgl_bast() { return this.data_bast.main.data.tanggal_dokumen || '-' },
		disp_dalam_rangka() { return this.data_bast.main.data.dalam_rangka || '-' },
	},
}
</script>

<style>

</style>