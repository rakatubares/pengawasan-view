<template>
	<div class="wrapper">
		<CRow 
			class="mt-3 mx-2 pt-3 border-top"
		>
			<CCol col="12">
				<CRow>
					<CCol md="12">
						<h5>Barang</h5>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Jumlah/Jenis Kemasan</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_kemasan}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Jenis/Nomor dan Tanggal Dokumen</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_dokumen}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Pemilik/Importir/Eksportir/Kuasa</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_pemilik}}
					</CCol>
				</CRow>

				<!-- Tabel item barang -->
				<CRow>
					<CCol>
						<MyTableBarang
							state="show"
							:doc_type="doc_type"
							:doc_id="doc_id"
							:data_objek="data_objek"
						>
						</MyTableBarang>
					</CCol>
				</CRow>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import MyTableBarang from '../Options/TableItemBarang.vue'

export default {
	name: 'DisplayBarang',
	components: {
		MyTableBarang
	},
	props: {
		doc_type: String,
		doc_id: Number,
		data_objek: Object
	},
	computed: {
		disp_kemasan() {
			let txt = (this.data.jumlah_kemasan || '-') + ' ' + (this.data.kemasan.kode_kemasan || '')
			return txt
		},
		disp_dokumen() {
			if (this.data.dokumen != null) {
				var txt = (this.data.dokumen.jns_dok || '') + ' ' + (this.data.dokumen.no_dok || '-') + ' / ' + (this.data.dokumen.tgl_dok || '-')
			} else {
				var txt = '-'
			}
			return txt
		},
		disp_pemilik() {
			return this.data.pemilik.nama || '-'
		},
	},
	data() {
		return {
			data: this.data_objek,
		}
	},
}
</script>

<style>

</style>