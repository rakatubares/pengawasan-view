<template>
	<div class="wrapper display-tolak2">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ba_tolak2 }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ba_tolak2 }}</h5>
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
						<b>BA Penolakan SBP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_ba_tolak1 }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>SBP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sbp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Alasan Penolakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_alasan }}
					</CCol>
				</CRow>
				<CRow class="sep">
					<CCol md="3">
						<h5><b>Pemilik/Kuasa</b></h5>
					</CCol>
					<CCol md="9">
						<p 
							class="a nav-link p-0"
							@click="showEntitas(document.penindakan.saksi.id)"
						>{{ disp_saksi }}</p>
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
					:data.sync="document.penindakan.petugas.petugas1"
				/>
				<MyDisplayPegawai
					title="Petugas 2"
					:data.sync="document.penindakan.petugas.petugas2"
				/>
			</CCol>
		</CRow>

		<MyModalEntitasOrang
			ref="modal_orang"
			:show.sync="show_modal_orang"
		/>
	</div>
</template>

<script>
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

export default {
	name: 'DisplayTolak2',
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
			show_modal_orang: false,
		}
	},
	computed: {
		disp_no_ba_tolak2() { return this.document.no_dok_lengkap || '-' },
		disp_tgl_ba_tolak2() { return this.document.tanggal_dokumen || '-' },
		disp_sprint() { 
			let txt = '-'

			if (this.document.penindakan.sprint) {
				txt = (
					(this.document.penindakan.sprint.nomor_sprint || '') 
					+ ' tanggal ' 
					+ (this.document.penindakan.sprint.tanggal_sprint || '')
				)
			}
			return txt 
		},
		disp_ba_tolak1() { return ((this.document.tolak1.no_dok_lengkap || '') 
			+ ' tanggal ' 
			+ (this.document.tolak1.tanggal_dokumen || '')) 
		},
		disp_sbp() { return ((this.document.sbp.no_dok_lengkap || '') 
			+ ' tanggal ' 
			+ (this.document.sbp.tanggal_dokumen || '')) 
		},
		disp_alasan() { return this.document.alasan || '-' },
		disp_entitas() { 
			let txt = this.document.penindakan.saksi
				? this.document.penindakan.saksi.nama : '-'
			return txt
		},
		disp_saksi() { 
			let txt = this.document.saksi
				? this.document.saksi.nama : '-'
			return txt
		},
	},
}
</script>

<style>

</style>