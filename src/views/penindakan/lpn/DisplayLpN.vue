<template>
	<div class="wrapper display-lpn">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_lp }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_lp }}</h5>
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
						<b>No LPHP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lphp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Locus</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_locus }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tempus</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tempus }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Uraian Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_uraian }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Hal yang Terjadi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_hal_terjadi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Analisa hasil penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_analisa }}
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
				<CRow class="sep">
					<CCol md="3">
						<h5><b>Pemilik/Saksi</b></h5>
					</CCol>
					<CCol md="9">
						<p 
							class="a nav-link p-0"
							@click="showEntitas(document.penindakan.saksi.id)"
						>{{ disp_saksi }}</p>
					</CCol>
				</CRow>
				<MyDisplayPegawai
					title="Petugas Penindakan"
					:data.sync="document.penindakan.petugas.petugas1"
				/>
				<MyDisplayPejabat
					title="Penyusun"
					:data.sync="document.petugas.penyusun"
				/>
				<MyDisplayPejabat
					:data.sync="document.petugas.penerbit"
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
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

export default {
	name: 'DisplayLpN',
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
			show_modal_saksi: false,
		}
	},
	computed: {
		disp_no_lp() { return this.document.no_dok_lengkap || '-' },
		disp_tgl_lp() { return this.document.tanggal_dokumen || '-' },
		disp_sprint() { return (
			(this.document.sprint.nomor_sprint || '') 
			+ ' tanggal ' + 
			(this.document.sprint.tanggal_sprint || '')
		) },
		disp_lphp() {
			let txt_no_lphp = this.document.nomor_lphp || '-'
			let txt_tgl_lphp = ''

			if (this.document.tanggal_lphp != null) {
				txt_tgl_lphp = ' tanggal ' + this.document.tanggal_lphp
			} else {
				txt_tgl_lphp = ''
			}

			return txt_no_lphp + txt_tgl_lphp
		},
		disp_locus() { return this.document.penindakan.lokasi_penindakan || '-' },
		disp_tempus() { return this.document.penindakan.tanggal_selesai_penindakan || '-' },
		disp_uraian() { return this.document.penindakan.uraian_penindakan || '-' },
		disp_hal_terjadi() { return this.document.penindakan.hal_terjadi || '-' },
		disp_analisa() { return this.document.analisa_lphp || '-' },
		disp_kesimpulan() { return this.document.kesimpulan || '-' },
		disp_saksi() { 
			let txt = this.document.penindakan.saksi
				? this.document.penindakan.saksi.nama : '-'
			return txt
		},
	},
}
</script>

<style>
.display-lpn .row+.row {
	margin-top:0;
}
</style>