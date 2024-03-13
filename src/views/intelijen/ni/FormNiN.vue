<template>
	<div class="wrapper">
		<MyFormNi 
			ref="FormNi"
			:state.sync="form_state"
			:doc_type="doc_type"
			:doc_id.sync="id"
			:kode_lkai="kode_lkai"
			:label_ni="label_ni"
			:label_lkai="label_lkai"
			@get-data="getData"
			@insert-data="insertData"
			@update-data="updateData"
		/>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyFormNi from './FormNi.vue'
import NiNKeys from './NiNKeys'

export default {
	name: 'FormNiN',
	components: {
		MyFormNi
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
		kode_lkai: String,
		label_ni: String,
		label_lkai: String,
	},
	data() {
		return {
			form_state: this.state,
			id: this.doc_id,
			nin_keys: JSON.parse(JSON.stringify(NiNKeys))
		}
	},
	watch: {
		form_state(val) {
			this.$emit('update:state', val)
		},
		state(val) {
			this.form_state = val
		},
		id(val) {
			this.$emit('update:doc_id', val)
		},
		doc_id(val) {
			this.id = val
		},
	},
	methods: {
		getData(data) {
			data = this.convertFromNiNData(data)
			this.$refs.FormNi.updateData(data)
		},
		async insertData(data) {
			data = this.convertToNiNData(data)
			data = await api.storeDoc(this.doc_type, data)
			data = this.convertFromNiNData(data)
			this.$refs.FormNi.updateData(data)
		},
		async updateData(data) {
			data = this.convertToNiNData(data)
			data = await api.updateDoc(this.doc_type, data.id, data)
			data = this.convertFromNiNData(data)
			this.$refs.FormNi.updateData(data)
		},
		convertToNiNData(data) {
			for (const [old_key, new_key] of Object.entries(this.nin_keys)) {
				Object.defineProperty(data, new_key, 
					Object.getOwnPropertyDescriptor(data, old_key)
				)
				delete data[old_key];
			}
			return data
		},
		convertFromNiNData(data) {
			for (const [new_key, old_key] of Object.entries(this.nin_keys)) {
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