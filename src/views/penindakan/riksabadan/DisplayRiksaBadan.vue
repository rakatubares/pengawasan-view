<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ba_riksa_badan }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ba_riksa_badan }}</h5>
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
				<MyDisplayEntitas
					title="Identitas yang diperiksa"
					:data.sync="data_doc.orang"
				/>
				<MyDisplayEntitas
					title="Orang yang bepergian bersama"
					:data.sync="data_doc.pendamping"
				/>
				<MyDisplaySarkut
					class="mb-3"
					:data_objek.sync="data_sarkut"
				/>
				<CRow class="mb-1 border-top">
					<CCol md="3" class="py-1">
						<b>Asal</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_asal }}
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
						<b>Lokasi Pemeriksaan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lokasi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Dokumen Barang</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_dokumen }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Uraian Pemeriksaan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_uraian }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Hasil Pemeriksaan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_hasil }}
					</CCol>
				</CRow>
				<MyDisplayEntitas
					title="Saksi"
					:data.sync="data_doc.saksi"
				/>
				<MyDisplayPegawai
					title="Pejabat 1"
					:data.sync="data_doc.penindakan.petugas1"
				/>
				<MyDisplayPegawai
					title="Pejabat 2"
					:data.sync="data_doc.penindakan.petugas2"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayEntitas from '../../components/DisplayEntitas.vue'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyDisplaySarkut from '../../details/displays/DisplaySarkut.vue'

const default_data = {
	no_dok_lengkap: null,
	penindakan: {
		tanggal_penindakan: null,
		lokasi_penindakan: null,
		sprint: {
			nomor_sprint: null,
			tanggal_sprint: null
		}
	},
	sarkut: null
}

export default {
	name: 'DisplayRiksaBadan',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai,
		MyDisplaySarkut,
	},
	props: {
		doc_id: Number
	},
	data() {
		return {
			data_doc: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_ba_riksa_badan() { return this.data_doc.no_dok_lengkap || '-' },
		disp_tgl_ba_riksa_badan() { return this.data_doc.penindakan.tanggal_penindakan || '-' },
		disp_sprint() { return (
			(this.data_doc.penindakan.sprint.nomor_sprint || '') 
			+ ' tanggal ' 
			+ (this.data_doc.penindakan.sprint.tanggal_sprint || '')
		) },
		disp_asal() { return this.data_doc.asal || '-'},
		disp_tujuan() { return this.data_doc.tujuan || '-' },
		disp_lokasi() { return this.data_doc.penindakan.lokasi_penindakan || '-' },
		disp_dokumen() {
			if (this.data_doc.dokumen != null) {
				var dokumen = `${this.data_doc.dokumen.jns_dok} ${this.data_doc.dokumen.no_dok} tanggal ${this.data_doc.dokumen.tgl_dok}`
			} else {
				var dokumen = '-'
			}

			return dokumen
		},
		disp_uraian() { return this.data_doc.uraian_pemeriksaan || '-' },
		disp_hasil() { return this.data_doc.hasil_pemeriksaan || '-' },
		data_sarkut() { return {data: this.data_doc.sarkut}}
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById('riksabadan', this.doc_id)
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