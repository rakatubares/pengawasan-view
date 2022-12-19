<template>
	<div class="wrapper sep">
		<CRow class="my-2">
			<CCol md="3" class="py-1">
				<h5 class="mb-0"><b>{{ title }}</b></h5>
			</CCol>
			<CCol md="9" class="py-1">
				{{ disp_pegawai }}
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
	},
	computed: {
		disp_pegawai() {
			return `${this.data_pegawai.name} - ${this.data_pegawai.nip}`
		},
	}
}
</script>

<style>
div.sep {
	border-top: 1px solid;
	border-color: #d8dbe0;;
}
</style>