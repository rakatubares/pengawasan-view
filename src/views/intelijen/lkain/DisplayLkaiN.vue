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
					:data.sync="document.petugas.analis"
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
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'

export default {
	name: 'DisplayLkaiN',
	components: {
		MyDisplayPegawai,
	},
	props: {
		doc_type: String,
		document: Object,
		label_lppi: String,
		label_lpti: String,
		label_npi: String,
		label_nhi: String,
		label_ni: String,
	},
	computed: {
		disp_no_lkai() { return this.document.no_dok_lengkap || '-' },
		disp_tgl_lkai() { return this.document.tanggal_dokumen || '-' },
		disp_lppi() { 
			if (
				(this.document.nomor_lppin != null) &&
				(this.document.tanggal_lppin != null)
			) {
				let no_lppi = this.document.nomor_lppin || '-'
				let tgl_lppi = this.document.tanggal_lppin || '-'
				var lppi = `${no_lppi} tanggal ${tgl_lppi}`
			} else {
				var lppi = '-'
			}

			return lppi
		},
		disp_lpti() { 
			if (
				(this.document.nomor_lptin != null) &&
				(this.document.tanggal_lptin != null)
			) {
				let no_lpti = this.document.nomor_lptin || '-'
				let tgl_lpti = this.document.tanggal_lptin || '-'
				var lpti = `${no_lpti} tanggal ${tgl_lpti}`
			} else {
				var lpti = '-'
			}

			return lpti
		},
		disp_npi() { 
			if (
				(this.document.nomor_npin != null) &&
				(this.document.tanggal_npin != null)
			) {
				let no_npi = this.document.nomor_npin || '-'
				let tgl_npi = this.document.tanggal_npin || '-'
				var npi = `${no_npi} tanggal ${tgl_npi}`
			} else {
				var npi = '-'
			}

			return npi
		},
		disp_informasi() { return this.document.informasi || '-' },
		disp_prosedur() { return this.document.prosedur || '-' },
		disp_hasil() { return this.document.hasil || '-' },
		disp_kesimpulan() { return this.document.kesimpulan || '-' },
		flag_nhi() { 
			let flag = this.document.flag_rekom_nhin == 1
				? true : false 
			return flag
		},
		flag_ni() { 
			let flag = this.document.flag_rekom_nin == 1
				? true : false 
			return flag
		},
		disp_rekomendasi() { return this.document.rekomendasi_lain || '-' },
		disp_informasi_lain() { return this.document.informasi_lain || '-' },
		disp_tujuan() { return this.document.tujuan || '-' },
		disp_es_4() { return this.document.petugas.pejabat.name || '-' },
		disp_kep_es_4() { 
			let keputusan = this.document.keputusan_pejabat == true 
				? 'Diterima' 
				: 'Ditolak'

			return keputusan
		},
		disp_ctt_es_4() { return this.document.catatan_pejabat || '-' },
		disp_tgl_es_4() { return this.document.tanggal_terima_pejabat || '-' },
		disp_es_3() { return this.document.petugas.atasan.name || '-' },
		disp_kep_es_3() { 
			let keputusan = this.document.keputusan_atasan == true 
				? 'Diterima' 
				: 'Ditolak'

			return keputusan
		},
		disp_ctt_es_3() { return this.document.catatan_atasan || '-' },
		disp_tgl_es_3() { return this.document.tanggal_terima_atasan || '-' },
	},
}
</script>

<style>

</style>