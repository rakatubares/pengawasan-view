<template>
	<div class="wrapper">
		<CRow 
			class="mt-3 mx-2 pt-3 border-top"
		>
			<CCol col="12">
				<CRow>
					<CCol md="12">
						<h5>Dokumen</h5>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Jenis</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_jenis}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nomor</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_nomor}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Tanggal</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_tanggal}}
					</CCol>
				</CRow>
			</CCol>
		</CRow>
	</div>
</template>

<script>
export default {
	name: 'DisplayDokumen',
	props: {
		data_objek: Object
	},
	computed: {
		disp_jenis() {
			return this.data.jns_dok || '-'
		},
		disp_nomor() {
			return this.data.no_dok || '-'
		},
		disp_tanggal() {
			return this.data.tgl_dok || '-'
		},
	},
	data() {
		return {
			data: this.data_objek.data
		}
	},
}
</script>

<style>

</style>