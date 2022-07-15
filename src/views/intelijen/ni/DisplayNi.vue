<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ni }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ni }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>No {{label_lkai}}</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lkai }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Sifat</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sifat }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Klasifikasi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_klasifikasi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tujuan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tujuan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Uraian</b>
					</CCol>
					<CCol md="9" class="py-1">
						 <span v-html="disp_uraian"></span>
					</CCol>
				</CRow>
				<MyDisplayPejabat
					title="Penerbit"
					:data.sync="data_doc.penerbit"
				/>
				<div class="sep mt-4">
					<CRow class="mb-1 mt-2">
						<CCol md="3" class="py-1">
							<b>Tembusan</b>
						</CCol>
						<CCol md="9" class="py-1" v-if="data_tembusan != null">
							<div v-if="data_tembusan.length > 0">
								<p class="mb-1" v-for="(txt,id) in data_tembusan" :key="id">- {{txt}}</p>
							</div>
							<div v-else>
								-
							</div>
						</CCol>
						<CCol md="9" class="py-1" v-else>
							-
						</CCol>
					</CRow>
				</div>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'

export default {
	name: 'DisplayNi',
	components: {
		MyDisplayPejabat,
	},
	props: {
		doc_type: String,
		label_lkai: String,
		doc_id: Number
	},
	data() {
		return {
			data_doc: {}
		}
	},
	computed: {
		disp_no_ni() { return this.data_doc.no_dok_lengkap || '-' },
		disp_tgl_ni() { return this.data_doc.tanggal_dokumen || '-' },
		disp_lkai() { 
			if (
				(this.data_doc.nomor_lkai != null) &&
				(this.data_doc.tanggal_lkai != null)
			) {
				let no_lkai = this.data_doc.nomor_lkai || '-'
				let tgl_lkai = this.data_doc.tanggal_lkai || '-'
				var lkai = `${no_lkai} tanggal ${tgl_lkai}`
			} else {
				var lkai = '-'
			}

			return lkai
		},
		disp_sifat() { return this.data_doc.sifat || '-' },
		disp_klasifikasi() { return this.data_doc.klasifikasi || '-' },
		disp_tujuan() { return this.data_doc.tujuan || '-' },
		disp_uraian() { return this.data_doc.uraian || '-' },
		data_tembusan() { return  this.data_doc.tembusan || null }
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			this.data_doc = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>

</style>