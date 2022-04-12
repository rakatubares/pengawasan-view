<template>
	<div class="wrapper sep">
		<CRow class="mt-2">
			<CCol>
				<h4><b>{{ title }}</b></h4>
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="pt-1">
				<b>Nama</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.nama }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Alias</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.alias }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Jenis Kelamin</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.jenis_kelamin }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Tempat / Tanggal Lahir</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ `${data.tempat_lahir} / ${data.tanggal_lahir}` }}
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
				<b>Penerbit Identitas</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.penerbit_identitas }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Tempat Terbit</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.tempat_identitas_terbit }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Alamat Identitas</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.alamat }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Alamat Tinggal</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.alamat_tinggal }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Agama</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.agama }}
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
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>No Telepon</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.nomor_telepon }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Email</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.email }}
			</CCol>
		</CRow>
	</div>
</template>

<script>
const data_default = {
	nama: null,
	alias: null,
	jenis_kelamin: null,
	tempat_lahir: null,
	tanggal_lahir: null,
	warga_negara: null,
	agama: null,
	jenis_identitas: null,
	nomor_identitas: null,
	penerbit_identitas: null,
	tempat_identitas_terbit: null,
	alamat: null,
	alamat_tinggal: null,
	pekerjaan: null,
	nomor_telepon: null,
	email: null,
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