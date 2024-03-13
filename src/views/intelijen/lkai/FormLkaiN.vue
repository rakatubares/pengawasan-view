<template>
	<div class="wrapper">
		<MyFormLkai
			ref="formLkai"
			:state.sync="form_state"
			:doc_type="doc_type"
			:doc_id.sync="doc_id"
			:kode_lppi="kode_lppi"
			:label_lkai="label_lkai"
			:label_lppi="label_lppi"
			:label_lpti="label_lpti"
			:label_npi="label_npi"
			:label_nhi="label_nhi"
			:label_ni="label_ni"
			:default_pejabat="default_pejabat"
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
		kode_lppi: String,
		label_lkai: String,
		label_lppi: String,
		label_lpti: String,
		label_npi: String,
		label_nhi: String,
		label_ni: String,
		default_pejabat: String,
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