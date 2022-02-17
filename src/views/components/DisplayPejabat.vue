<template>
	<div class="wrapper sep">
		<CRow class="mt-2">
			<CCol>
				<h4><b>{{ title }}</b></h4>
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Jabatan</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ disp_jabatan }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Nama</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.user.name }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>NIP</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.user.nip }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Pangkat</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data.user.pangkat }}
			</CCol>
		</CRow>
	</div>
</template>

<script>
const default_data = {
	jabatan: {jabatan: null},
	plh: null,
	user: {
		name: null,
		nip: null,
		pangkat: null,
	},
}

export default {
	name: 'DisplayPejabat',
	props: {
		title: {
			type: String,
			default: 'Pejabat'
		},
		data: {
			type: Object,
			default() {return JSON.parse(JSON.stringify(default_data))}
		}
	},
	computed: {
		disp_jabatan() {
			let jabatan = null

			if (this.data.plh == 0) {
				jabatan = this.data.jabatan.jabatan	
			} else {
				jabatan = 'Plh. ' + this.data.jabatan.jabatan
			}

			return jabatan
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