<template>
	<div class="wrapper">
		<CRow 
			class="mt-3 mx-2 pt-3 border-top"
		>
			<CCol col="12">
				<CRow>
					<CCol md="12">
						<h5>Bangunan / Tempat</h5>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Alamat</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_alamat}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>No Reg. Bangunan/NPPPBKC</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_no_reg}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Pemilik</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_pemilik}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Identitas Pemilik</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_identitas}}
					</CCol>
				</CRow>
			</CCol>
		</CRow>
	</div>
</template>

<script>
export default {
	name: 'DisplayBangunan',
	props: {
		doc: {
			type: Object,
			default: null
		}
	},
	computed: {
		disp_alamat() {
			return (this.data.alamat || '-')
		},
		disp_no_reg() {
			return (this.data.no_reg || '-')
		},
		disp_pemilik() {
			return (this.data.pemilik.nama || '-')
		},
		disp_identitas() {
			return (this.data.pemilik.jenis_identitas || '') + ' ' + (this.data.pemilik.nomor_identitas || '-')
		},
	},
	data() {
		return {
			data: this.doc.objek.data
		}
	},
}
</script>

<style>

</style>