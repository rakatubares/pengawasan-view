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
				{{ data.name }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>NIP</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.nip }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Pangkat</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.pangkat }}
			</CCol>
		</CRow>
	</div>
</template>

<script>
const data_default = {
	name: null,
	nip: null,
	pangkat: null,
}

export default {
	name: 'DisplayPegawai',
	props: {
		title: {
			type: String,
			default: 'Pegawai'
		},
		data: Object
	}
}
</script>

<style>
div.sep {
	border-top: 1px solid;
	border-color: #d8dbe0;;
}
</style>