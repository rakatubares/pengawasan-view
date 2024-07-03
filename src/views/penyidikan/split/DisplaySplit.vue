<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_split }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_split }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>LP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>LPF</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lpf }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jenis Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis_pelanggaran }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Dugaan Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_dugaan_pelanggaran }}
					</CCol>
				</CRow>

				<CRow class="sep">
					<CCol md="3">
						<h5><b>Pelaku</b></h5>
					</CCol>
					<CCol md="9">
						<p 
							class="a nav-link p-0"
							@click="showEntitas(document.penyidikan.pelaku.id)"
						>{{ disp_pelaku }}</p>
					</CCol>
				</CRow>
				<MyDisplayPegawai
					v-for="(petugas, index) in document.petugas.pelaksana"
					title="Petugas"
					:data="petugas"
					:key="index"
				/>
				<MyDisplayPejabat
					title="Pemberi Perintah"
					:data.sync="document.petugas.pejabat"
				/>
			</CCol>
		</CRow>

		<MyModalEntitasOrang
			ref="modal_entitas"
			:show.sync="show_modal_entitas"
		/>
	</div>
</template>

<script>
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

export default {
	name: 'DisplaySplit',
	components: {
		MyDisplayPegawai,
		MyDisplayPejabat,
		MyModalEntitasOrang,
	},
	props: {
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			show_modal_entitas: false,
		}
	},
	computed: {
		disp_no_split() { return this.document.no_dok_lengkap || '-' },
		disp_tgl_split() { return this.document.tanggal_dokumen || '-' },
		disp_lp() { return `${this.document.lp.no_dok_lengkap} tanggal ${this.document.lp.tanggal_dokumen}` },
		disp_lpf() { return `${this.document.lpf.no_dok_lengkap} tanggal ${this.document.lpf.tanggal_dokumen}` },
		disp_jenis_pelanggaran() { return this.document.penyidikan.jenis_pelanggaran || '-' },
		disp_dugaan_pelanggaran() { return this.document.dugaan_pelanggaran || '-' },
		disp_pelaku() { 
			let txt = this.document.penyidikan.pelaku
				? this.document.penyidikan.pelaku.nama : '-'
			return txt
		},
	},
	methods: {
		showEntitas(entitas_id) {
			this.$refs.modal_entitas.showModal('show', entitas_id)
		},
	},
}
</script>

<style>

</style>