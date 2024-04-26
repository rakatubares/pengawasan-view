<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ba_segel }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ba_segel }}</h5>
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
						<b>Tempat Segel</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tempat_segel }}
					</CCol>
				</CRow>
				<CRow class="sep">
					<CCol md="3">
						<h5><b>Saksi</b></h5>
					</CCol>
					<CCol md="9">
						<p 
							class="a nav-link p-0"
							@click="showEntitas(data_doc.penindakan.saksi.id)"
						>{{ disp_saksi }}</p>
					</CCol>
				</CRow>
				<MyDisplayPegawai
					title="Petugas 1"
					:data.sync="data_doc.penindakan.petugas.petugas1"
				/>
				<MyDisplayPegawai
					title="Petugas 2"
					:data.sync="data_doc.penindakan.petugas.petugas2"
				/>
			</CCol>
		</CRow>

		<MyModalEntitasOrang
			ref="modal_saksi"
			:show.sync="show_modal_saksi"
		/>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

const default_data = {
	no_dok_lengkap: null,
	jenis_segel: null,
	jumlah_segel: null,
	nomor_segel: null,
	lokasi_segel: null,
	penindakan: {
		tanggal_penindakan: null,
		sprint: {
			nomor_sprint: null,
			tanggal_sprint: null
		},
		saksi: {nama: null},
		petugas: {}
	},
}

export default {
	name: 'DisplaySegel',
	components: {
		MyDisplayPegawai,
		MyModalEntitasOrang,
	},
	props: {
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_doc: JSON.parse(JSON.stringify(default_data)),
			show_modal_saksi: false,
		}
	},
	computed: {
		disp_no_ba_segel() { return this.data_doc.no_dok_lengkap || '-' },
		disp_tgl_ba_segel() { return this.data_doc.tanggal_dokumen || '-' },
		disp_sprint() { 
			let txt = '-'

			if (this.data_doc.penindakan.sprint) {
				txt = (
					(this.data_doc.penindakan.sprint.nomor_sprint || '') 
					+ ' tanggal ' 
					+ (this.data_doc.penindakan.sprint.tanggal_sprint || '')
				)
			}
			return txt 
		},
		disp_jenis_segel() { return this.data_doc.jenis_segel || '-' },
		disp_jumlah_segel() { return ((this.data_doc.jumlah_segel || '-') + ' ' + (this.data_doc.satuan_segel || '')) },
		disp_nomor_segel() { return this.data_doc.nomor_segel || '-'},
		disp_tempat_segel() { return this.data_doc.tempat_segel || '-' },
		disp_saksi() { 
			let txt = this.data_doc.penindakan.saksi
				? this.data_doc.penindakan.saksi.nama : '-'
			return txt
		}
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.data_doc = response.data
		},
		showEntitas(saksi_id) {
			this.$refs.modal_saksi.showModal('show', saksi_id)
		},
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>

</style>