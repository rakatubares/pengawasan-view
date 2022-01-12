<template>
	<div class="wrapper sep">
		<CRow class="mt-2">
			<CCol>
				<h4><b>{{ title }}</b></h4>
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Nama</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.nama }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Warga Negara</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.warga_negara }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Identitas</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.jenis_identitas + ' ' + data.nomor_identitas }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Tanggal Lahir</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.tanggal_lahir }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Alamat</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.alamat }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Pekerjaan</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.pekerjaan }}
			</CCol>
		</CRow>
	</div>
</template>

<script>
const data_default = {
	nama: null,
	warga_negara: null,
	jenis_identitas: null,
	nomor_identitas: null,
	tanggal_lahir: null,
	alamat: null,
	pekerjaan: null,
}

export default {
	name: 'DisplayEntitas',
	props: {
		title: {
			type: String,
			default: 'Entitas'
		},
		data: {
			type: Object,
			default() {return JSON.parse(JSON.stringify(data_default))}
		}
	},
}
</script>

<style>
div.sep {
	border-top: 1px solid;
	border-color: #d8dbe0;;
}
</style>