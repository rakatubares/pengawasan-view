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
				{{ data_pegawai.name }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>NIP</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data_pegawai.nip }}
			</CCol>
		</CRow>
		<CRow class="mb-1">
			<CCol md="3" class="py-1">
				<b>Pangkat</b>
			</CCol>
			<CCol md="9" class="py-1">
				{{ data_pegawai.pangkat }}
			</CCol>
		</CRow>
	</div>
</template>

<script>
const default_data = {
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
	},
	watch: {
		data(val) {
			if (val != null) {
				this.data_pegawai = JSON.parse(JSON.stringify(val))
			}
		}
	},
	data() {
		return {
			data_pegawai: JSON.parse(JSON.stringify(default_data))
		}
	},
	mounted() {
		if (this.data != null) {
			this.data_pegawai = JSON.parse(JSON.stringify(this.data))
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