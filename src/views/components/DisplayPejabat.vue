<template>
	<div class="wrapper sep">
		<CRow class="mt-2">
			<CCol md="3" class="py-1">
				<h5 class="mb-0"><b>{{ title }}</b></h5>
			</CCol>
			<CCol md="9" class="py-1">
				{{ disp_pegawai }}
			</CCol>
		</CRow>
		<CRow class="mb-2">
			<CCol md="3" class="py-1">
				<b>Jabatan</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ disp_jabatan }}
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
		disp_pegawai() {
			if (this.data != null) {
				return `${this.data.name} - ${this.data.nip}`	
			} else {
				return '-'
			}
		},
		disp_jabatan() {
			if (this.data != null) {
				return this.data.txt_tipe_ttd + this.data.jabatan
			} else {
				return '-'
			}
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