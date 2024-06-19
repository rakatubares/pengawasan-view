<template>
	<div class="wrapper display-lp">
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
						<b>No LPHP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lphp }}
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
						<b>Jenis Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Pasal</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_pasal }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Modus</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_modus }}
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
				<MyDisplayPejabat
					:data.sync="document.petugas.pejabat"
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
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

export default {
	name: 'DisplayLp',
	components: {
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
		disp_uraian() { return this.document.penindakan.uraian_penindakan || '-' },
		disp_jenis() { return this.document.penindakan.jenis_pelanggaran || '-' },
		disp_pasal() { return this.document.pasal || '-' },
		disp_modus() { return this.document.modus || '-' },
		disp_locus() { return this.document.penindakan.lokasi_penindakan || '-' },
		disp_tempus() { return this.document.penindakan.tanggal_selesai_penindakan || '-' },
		disp_saksi() { 
			let txt = this.document.penindakan.saksi
				? this.document.penindakan.saksi.nama : '-'
			return txt
		},
	},
}
</script>

<style>
</style>