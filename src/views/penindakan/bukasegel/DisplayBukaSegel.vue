<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ba_buka_segel }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ba_buka_segel }}</h5>
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
						<b>Tanggal Segel</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tanggal_segel }}
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
							@click="showEntitas(document.saksi.id)"
						>{{ disp_saksi }}</p>
					</CCol>
				</CRow>
				<MyDisplayPegawai
					title="Petugas 1"
					:data.sync="document.petugas.petugas1"
				/>
				<MyDisplayPegawai
					title="Petugas 2"
					:data.sync="document.petugas.petugas2"
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
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

export default {
	name: 'DisplayBukaSegel',
	components: {
		MyDisplayPegawai,
		MyModalEntitasOrang,
	},
	props: {
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			show_modal_saksi: false,
		}
	},
	computed: {
		disp_no_ba_buka_segel() { return this.document.no_dok_lengkap || '-' },
		disp_tgl_ba_buka_segel() { return this.document.tanggal_dokumen || '-' },
		disp_sprint() { return ((this.document.sprint.nomor_sprint || '') + ' tanggal ' + (this.document.sprint.tanggal_sprint || '')) },
		disp_jenis_segel() { return this.document.jenis_segel || '-' },
		disp_jumlah_segel() { return ((this.document.jumlah_segel || '-') + ' ' + (this.document.satuan_segel || '')) },
		disp_nomor_segel() { return this.document.nomor_segel || '-' },
		disp_tanggal_segel() { return this.document.tanggal_segel || '-' },
		disp_tempat_segel() { return this.document.tempat_segel || '-' },
		disp_saksi() { 
			let txt = this.document.saksi
				? this.document.saksi.nama : '-'
			return txt
		}
	},
	methods: {
		setDocument(val) {
			console.log('DISPLAY BUKA SEGEL - SET DATA', JSON.parse(JSON.stringify(val)))
			this.document = JSON.parse(JSON.stringify(val))
		},
		showEntitas(saksi_id) {
			this.$refs.modal_saksi.showModal('show', saksi_id)
		},
	},
}
</script>

<style>

</style>