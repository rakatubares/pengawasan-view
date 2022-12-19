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
			return `${this.data.user.name} - ${this.data.user.nip}`
		},
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