<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_lkai }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_lkai }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>No {{ label_lppi }}</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lppi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>No {{ label_lpti }}</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lpti }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>No {{ label_npi }}</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_npi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Ikhtisar Informasi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_informasi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Prosedur Analisis</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_prosedur }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Hasil Analisis</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_hasil }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Kesimpulan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_kesimpulan }}
					</CCol>
				</CRow>
				<div class="sep">
					<CRow class="mt-2">
						<CCol>
							<h4><b>Rekomendasi</b></h4>
						</CCol>
					</CRow>
				</div>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>{{ label_nhi }}</b>
					</CCol>
					<CCol md="9" class="py-1">
						<CInputCheckbox
							:checked.sync="flag_nhi"
							disabled
						/>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>{{ label_ni }}</b>
					</CCol>
					<CCol md="9" class="py-1">
						<CInputCheckbox
							:checked.sync="flag_ni"
							disabled
						/>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Rekomendasi Lainnya</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_rekomendasi }}
					</CCol>
				</CRow>
				<CRow class="mb-1" v-if="doc_type == 'lkai'">
					<CCol md="3" class="py-1">
						<b>Informasi Lainnya</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_informasi_lain }}
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
				<MyDisplayPegawai
					title="Analis"
					:data.sync="data_doc.petugas.analis"
				/>
				<div class="sep">
					<CRow class="mt-2">
						<CCol>
							<h4><b>Eselon IV</b></h4>
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Nama Pejabat</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_es_4 }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Keputusan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_kep_es_4 }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Catatan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_ctt_es_4 }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Tanggal Terima</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_tgl_es_4 }}
						</CCol>
					</CRow>
				</div>
				<div class="sep">
					<CRow class="mt-2">
						<CCol>
							<h4><b>Eselon III</b></h4>
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Nama Pejabat</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_es_3 }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Keputusan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_kep_es_3 }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Catatan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_ctt_es_3 }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Tanggal Terima</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_tgl_es_3 }}
						</CCol>
					</CRow>
				</div>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import DefaultLkai from './DefaultLkai'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'

export default {
	name: 'DisplayLkai',
	components: {
		MyDisplayPegawai
	},
	props: {
		doc_type: String,
		doc_id: Number,
		label_lppi: {
			type: String,
			default: 'LPPI',
		},
		label_lpti: {
			type: String,
			default: 'LPTI'
		},
		label_npi: {
			type: String,
			default: 'NPI'
		},
		label_nhi: {
			type: String,
			default: 'NHI'
		},
		label_ni: {
			type: String,
			default: 'NI'
		},
	},
	data() {
		return {
			data_doc: JSON.parse(JSON.stringify(DefaultLkai)),
		}
	},
	computed: {
		disp_no_lkai() { return this.data_doc.no_dok_lengkap || '-' },
		disp_tgl_lkai() { return this.data_doc.tanggal_dokumen || '-' },
		disp_lppi() { 
			if (
				(this.data_doc.nomor_lppi != null) &&
				(this.data_doc.tanggal_lppi != null)
			) {
				let no_lppi = this.data_doc.nomor_lppi || '-'
				let tgl_lppi = this.data_doc.tanggal_lppi || '-'
				var lppi = `${no_lppi} tanggal ${tgl_lppi}`
			} else {
				var lppi = '-'
			}

			return lppi
		},
		disp_lpti() { 
			if (
				(this.data_doc.nomor_lpti != null) &&
				(this.data_doc.tanggal_lpti != null)
			) {
				let no_lpti = this.data_doc.nomor_lpti || '-'
				let tgl_lpti = this.data_doc.tanggal_lpti || '-'
				var lpti = `${no_lpti} tanggal ${tgl_lpti}`
			} else {
				var lpti = '-'
			}

			return lpti
		},
		disp_npi() { 
			if (
				(this.data_doc.nomor_npi != null) &&
				(this.data_doc.tanggal_npi != null)
			) {
				let no_npi = this.data_doc.nomor_npi || '-'
				let tgl_npi = this.data_doc.tanggal_npi || '-'
				var npi = `${no_npi} tanggal ${tgl_npi}`
			} else {
				var npi = '-'
			}

			return npi
		},
		disp_informasi() { return this.data_doc.informasi || '-' },
		disp_prosedur() { return this.data_doc.prosedur || '-' },
		disp_hasil() { return this.data_doc.hasil || '-' },
		disp_kesimpulan() { return this.data_doc.kesimpulan || '-' },
		flag_nhi() { 
			let flag = this.data_doc.flag_rekom_nhi == 1
				? true : false 
			return flag
		},
		flag_ni() { 
			let flag = this.data_doc.flag_rekom_ni == 1
				? true : false 
			return flag
		},
		disp_rekomendasi() { return this.data_doc.rekomendasi_lain || '-' },
		disp_informasi_lain() { return this.data_doc.informasi_lain || '-' },
		disp_tujuan() { return this.data_doc.tujuan || '-' },
		disp_es_4() { return this.data_doc.petugas.pejabat.name || '-' },
		disp_kep_es_4() { 
			let keputusan = this.data_doc.keputusan_pejabat == true 
				? 'Diterima' 
				: 'Ditolak'

			return keputusan
		},
		disp_ctt_es_4() { return this.data_doc.catatan_pejabat || '-' },
		disp_tgl_es_4() { return this.data_doc.tanggal_terima_pejabat || '-' },
		disp_es_3() { return this.data_doc.petugas.atasan.name || '-' },
		disp_kep_es_3() { 
			let keputusan = this.data_doc.keputusan_atasan == true 
				? 'Diterima' 
				: 'Ditolak'

			return keputusan
		},
		disp_ctt_es_3() { return this.data_doc.catatan_atasan || '-' },
		disp_tgl_es_3() { return this.data_doc.tanggal_terima_atasan || '-' },
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			if (this.doc_type == 'lkai') {
				this.data_doc = response.data	
			} else {
				let data = response.data
				this.$emit('get-data', data)
			}	
		},
		updateData(data) {
			this.data_doc = data
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>

</style>