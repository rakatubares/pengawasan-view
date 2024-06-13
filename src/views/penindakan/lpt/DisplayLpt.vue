<template>
	<div class="wrapper display-lpt">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_dok_lengkap }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_dok }}</h5>
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
						<b>No SBP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sbp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Barang</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_barang }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Lokasi Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lokasi_penindakan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Waktu Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_waktu_penindakan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Sarana Prasarana</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sarpras }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Kronologi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_kronologi }}
					</CCol>
				</CRow>
				<CRow class="sep">
					<CCol md="3">
						<h5><b>Saksi</b></h5>
					</CCol>
					<CCol md="9">
						<p 
							class="a nav-link p-0"
							@click="showEntitas(document.penindakan.saksi.id)"
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
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

export default {
	name: 'DisplayLpt',
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
		disp_no_dok_lengkap() { return this.document.no_dok_lengkap || '-' },
		disp_tgl_dok() { return this.document.tanggal_dokumen || '-' },
		disp_sprint() { 
			let txt = this.document.penindakan.sprint
				? this.document.penindakan.sprint.nomor_sprint
					? this.document.penindakan.sprint.tanggal_sprint
						? `${this.document.penindakan.sprint.nomor_sprint} tanggal ${this.document.penindakan.sprint.tanggal_sprint}`
						: this.document.penindakan.sprint.nomor_sprint
					: this.document.penindakan.sprint.tanggal_sprint
						? `tanggal ${this.document.penindakan.sprint.tanggal_sprint}`
						: '-'
				: '-'
			return txt
		},
		disp_sbp() { 
			let txt = this.document.sbp
				? this.document.sbp.no_dok_lengkap
					? this.document.sbp.tanggal_dokumen
						? `${this.document.sbp.no_dok_lengkap} tanggal ${this.document.sbp.tanggal_dokumen}`
						: this.document.sbp.no_dok_lengkap
					: this.document.sbp.tanggal_dokumen
						? `tanggal ${this.document.sbp.tanggal_dokumen}`
						: '-'
				: '-'
			return txt
		},
		disp_barang() { return this.document.barang || '-' },
		disp_lokasi_penindakan() { return this.document.penindakan.lokasi_penindakan || '-' },
		disp_waktu_penindakan() {
			let txt = this.document.penindakan
				? this.document.penindakan.tanggal_selesai_penindakan
					? this.document.penindakan.waktu_selesai_penindakan
						? `${this.document.penindakan.tanggal_selesai_penindakan} ${this.document.penindakan.waktu_selesai_penindakan}`
						: this.document.penindakan.tanggal_selesai_penindakan
					: this.document.penindakan.waktu_selesai_penindakan
						? this.document.penindakan.waktu_selesai_penindakan
						: '-'
				: '-'
			return txt
		},
		disp_sarpras() { return this.document.sarpras || '-' },
		disp_kronologi() { return this.document.kronologi || '-' },
		disp_saksi() { 
			let txt = this.document.penindakan.saksi
				? this.document.penindakan.saksi.nama : '-'
			return txt
		},
	}
}
</script>

<style>

</style>