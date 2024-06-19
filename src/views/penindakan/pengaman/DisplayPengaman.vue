<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ba_pengaman }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ba_pengaman }}</h5>
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
						<b>Jenis Tanda Pengaman</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jumlah Tanda Pengaman</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jumlah_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Nomor Tanda Pengaman</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_nomor_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tempat Tanda Pengaman</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tempat_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Lokasi Pengamanan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lokasi_pengamanan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Alasan Pengamanan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_alasan_pengamanan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Keterangan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_keterangan }}
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
	name: 'DisplayPengaman',
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
		disp_no_ba_pengaman() { return this.document.no_dok_lengkap || '-' },
		disp_tgl_ba_pengaman() { return this.document.tanggal_dokumen || '-' },
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
		disp_jenis_pengaman() { return this.document.jenis_pengaman || '-' },
		disp_jumlah_pengaman() { return ((this.document.jumlah_pengaman || '-') + ' ' + (this.document.satuan_pengaman || '')) },
		disp_nomor_pengaman() { return this.document.nomor_pengaman || '-'},
		disp_tempat_pengaman() { return this.document.tempat_pengaman || '-' },
		disp_alasan_pengamanan() { return this.document.alasan_pengamanan || '-' },
		disp_lokasi_pengamanan() { return this.document.penindakan.lokasi_penindakan || '-' },
		disp_keterangan() { return this.document.keterangan || '-' },
		disp_saksi() { 
			let txt = this.document.penindakan.saksi
				? this.document.penindakan.saksi.nama : '-'
			return txt
		}
	},
}
</script>

<style>
</style>