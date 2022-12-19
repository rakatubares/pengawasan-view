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
				{{ data_entitas.nama }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Alias</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data_entitas.alias }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Jenis Kelamin</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ disp_jenis_kelamin }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Tempat / Tanggal Lahir</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ `${data_entitas.tempat_lahir} / ${data_entitas.tanggal_lahir}` }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Warga Negara</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ disp_warga_negara }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Identitas</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data_entitas.jenis_identitas + ' ' + data_entitas.nomor_identitas }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Penerbit Identitas</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data_entitas.penerbit_identitas }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Tempat Terbit</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data_entitas.tempat_identitas_terbit }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Alamat Identitas</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data_entitas.alamat_identitas }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Alamat Tinggal</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data_entitas.alamat_tinggal }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Agama</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data_entitas.agama }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Pekerjaan</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data_entitas.pekerjaan }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>No Telepon</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data_entitas.nomor_telepon }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Email</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data_entitas.email }}
			</CCol>
		</CRow>
	</div>
</template>

<script>
const default_data = {
	nama: null,
	alias: null,
	jenis_kelamin: { uraian: null },
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
		data: Object
	},
	watch: {
		data(val) {
			if (val != null) {
				this.data_entitas = JSON.parse(JSON.stringify(val))
			}
		}
	},
	computed: {
		disp_jenis_kelamin() {
			return this.data_entitas.jenis_kelamin.uraian || '-'
		},
		disp_warga_negara() {
			let txt_warga_negara = ''
			if (this.data_entitas.warga_negara) {
				txt_warga_negara = this.data_entitas.warga_negara.nama_negara
			}
			return txt_warga_negara
		}
	},
	data() {
		return {
			data_entitas: JSON.parse(JSON.stringify(default_data))
		}
	},
	mounted() {
		if (this.data != null) {
			this.data_entitas = JSON.parse(JSON.stringify(this.data))
		}
	}
}
</script>

<style>
div.sep {
	border-top: 1px solid;
	border-color: #d8dbe0;;
}
</style>