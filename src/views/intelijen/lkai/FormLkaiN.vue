<template>
	<div class="wrapper">
		<MyFormLkai
			ref="formLkai"
			:state.sync="form_state"
			:tipe_surat="tipe_surat"
			:doc_type="doc_type"
			:doc_id.sync="doc_id"
			default_pejabat="bd.0502"
			kode_lppi="lppin"
			label_lppi="LPPI-N"
			label_lpti="LPTI-N"
			label_npi="NPI-N"
			label_nhi="NHI-N"
			label_ni="NI-N"
			@get-data="getData"
			@insert-data="insertData"
			@update-data="updateData"
		/>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import LkainKeys from './LkainKeys'
import MyFormLkai from './FormLkai.vue'

export default {
	name: 'FormLkaiN',
	components: {
		MyFormLkai
	},
	props: {
		state: String,
		tipe_surat: String,
		doc_type: String,
		doc_id: Number,
	},
	data() {
		return {
			form_state: this.state,
			lkain_keys: JSON.parse(JSON.stringify(LkainKeys))
		}
	},
	watch: {
		form_state(val) {
			this.$emit('update:state', val)
		},
		state(val) {
			this.form_state = val
		}
	},
	methods: {
		getData(data) {
			data = this.convertFromLkainData(data)
			this.$refs.formLkai.updateData(data)
		},
		async insertData(data) {
			data = this.convertToLkainData(data)
			data = await api.storeDoc(this.doc_type, data)
			data = this.convertFromLkainData(data)
			this.$refs.formLkai.updateData(data)
		},
		async updateData(data) {
			data = this.convertToLkainData(data)
			data = await api.updateDoc(this.doc_type, data.id, data)
			data = this.convertFromLkainData(data)
			this.$refs.formLkai.updateData(data)
		},
		convertToLkainData(data) {
			for (const [old_key, new_key] of Object.entries(this.lkain_keys)) {
				Object.defineProperty(data, new_key, 
					Object.getOwnPropertyDescriptor(data, old_key)
				)
				delete data[old_key];
			}
			return data
		},
		convertFromLkainData(data) {
			for (const [new_key, old_key] of Object.entries(this.lkain_keys)) {
				Object.defineProperty(data, new_key, 
					Object.getOwnPropertyDescriptor(data, old_key)
				)
				delete data[old_key];
			}
			return data
		},
	}
}
</script>

<style>

</style>