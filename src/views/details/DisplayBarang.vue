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
							:doc="doc"
						>
						</MyTableBarang>
					</CCol>
				</CRow>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import MyTableBarang from './Options/TableItemBarang.vue'

export default {
	name: 'DisplayBarang',
	components: {
		MyTableBarang
	},
	props: {
		doc: Object
	},
	computed: {
		disp_kemasan() {
			let t = (this.data.jumlah_kemasan || '-') + ' ' + (this.data.satuan_kemasan || '')
			console.log('t', t)
			return t
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
			data: this.doc.objek.data,
		}
	},
}
</script>

<style>

</style>