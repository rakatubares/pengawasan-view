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
						<b>{{ doc_type == 'lkain' ? 'No LPPI-N' : 'No LPPI' }}</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lppi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>No LPT-I</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lpti }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>{{ doc_type == 'lkain' ? 'No NPI-N' : 'No NPI' }}</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_npi }}
					</CCol>
				</CRow>
				<div class="sep">
					<CRow class="mt-2">
						<CCol>
							<h4><b>Analisis</b></h4>
						</CCol>
					</CRow>

					<!-- Tabel ikhtisar -->
					<CDataTable
						class="my-2 mr-3"
						:items="data_doc.ikhtisar"
						:fields="ikhtisar_table_fields"
						:items-per-page="5"
						pagination
					/>
				</div>
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
						<b>NHI</b>
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
						<b>NI</b>
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
						{{ disp_informasi }}
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
					:data.sync="data_doc.analis"
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
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'

const default_data = {
	no_dok_lengkap: null,
	tanggal_dokumen: null,
	flag_lpti: null,
	nomor_lpti: null,
	tanggal_lpti: null,
	flag_npi: null,
	nomor_npi: null,
	tanggal_npi: null,
	prosedur: null,
	hasil: null,
	kesimpulan: null,
	flag_rekom_nhi: null,
	flag_rekom_ni: null,
	rekomendasi_lain: null,
	informasi_lain: null,
	tujuan: null,
	pejabat: {
		jabatan: null,
		plh: null,
		user: {name: null},
		keputusan: null,
		catatan: null,
		tanggal_terima: null,
	},
	atasan: {
		jabatan: null,
		plh: null,
		user: {name: null},
		keputusan: null,
		catatan: null,
		tanggal_terima: null,
	},
}

export default {
	name: 'DisplayLkai',
	components: {
		MyDisplayPegawai
	},
	props: {
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_doc: JSON.parse(JSON.stringify(default_data)),
			ikhtisar_table_fields: [
				{ key: 'ikhtisar', label: 'Ikhtisar' },
				{ key: 'kode_kepercayaan', label: 'Sumber' },
				{ key: 'kode_validitas', label: 'Validitas' },
			]
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
		disp_informasi() { return this.data_doc.informasi_lain || '-' },
		disp_tujuan() { return this.data_doc.tujuan || '-' },
		disp_es_4() { return this.data_doc.pejabat.user.name || '-' },
		disp_kep_es_4() { 
			let keputusan = this.data_doc.pejabat.keputusan == true 
				? 'Diterima' 
				: 'Ditolak'

			return keputusan
		},
		disp_ctt_es_4() { return this.data_doc.pejabat.catatan || '-' },
		disp_tgl_es_4() { return this.data_doc.pejabat.tanggal_terima || '-' },
		disp_es_3() { return this.data_doc.atasan.user.name || '-' },
		disp_kep_es_3() { 
			let keputusan = this.data_doc.atasan.keputusan == true 
				? 'Diterima' 
				: 'Ditolak'

			return keputusan
		},
		disp_ctt_es_3() { return this.data_doc.atasan.catatan || '-' },
		disp_tgl_es_3() { return this.data_doc.atasan.tanggal_terima || '-' },
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