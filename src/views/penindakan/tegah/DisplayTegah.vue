<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol>
						<h4>{{ disp_no_ba_tegah }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol>
						<h5>{{ disp_tgl_ba_tegah }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Surat Perintah</b>
					</CCol>
					<CCol md="9">
						{{ disp_sprint }}
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
	penindakan: {
		tanggal_penindakan: null,
		sprint: {
			nomor_sprint: null,
			tanggal_sprint: null
		},
		saksi: {nama: null},
		petugas: {}
	}
}
export default {
	name: 'DisplayTegah',
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
		disp_no_ba_tegah() { return this.data_doc.no_dok_lengkap || '-' },
		disp_tgl_ba_tegah() { return this.data_doc.tanggal_dokumen || '-' },
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