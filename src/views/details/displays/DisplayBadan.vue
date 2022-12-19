<template>
	<div class="wrapper">
		<CRow 
			class="mt-3 mx-2 pt-3 border-top"
		>
			<CCol col="12">
				<CRow>
					<CCol md="12">
						<h5>Badan / Orang</h5>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nama</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_nama}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Alias</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_alias}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Tanggal Lahir</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_tanggal_lahir}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Kewarganegaraan</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_warga_negara}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Alamat Tinggal</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_alamat_tinggal}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Alamat Identitas</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_alamat}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nomor Identitas</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_identitas}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Penerbit Identitas</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_penerbit}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Tempat Terbit</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_tempat_terbit}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nomor Telepon</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_telepon}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Email</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_email}}
					</CCol>
				</CRow>
			</CCol>
		</CRow>
	</div>
</template>

<script>
export default {
	name: 'DisplayBadan',
	props: {
		data_objek: Object
	},
	computed: {
		disp_nama() { return this.data.nama || '-' },
		disp_alias() { return this.data.alias || '-' },
		disp_tanggal_lahir() { return this.data.tanggal_lahir || '-' },
		disp_warga_negara() { return this.data.warga_negara.nama_negara || '-' },
		disp_alamat_tinggal() { return this.data.alamat_tinggal || '-' },
		disp_alamat() { return this.data.alamat || '-' },
		disp_identitas() { return (this.data.jenis_identitas || '') + ' ' + (this.data.nomor_identitas || '-') },
		disp_penerbit() { return this.data.penerbit_identitas || '-' },
		disp_tempat_terbit() { return this.data.tempat_identitas_terbit || '-' },
		disp_telepon() { return this.data.nomor_telepon || '-' },
		disp_email() { return this.data.email || '-' },
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