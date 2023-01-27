<template>
	<div class="wrapper">
		<MyDisplayBarang 
			v-if="display_barang"
			:doc_type="doc_type"
			:doc_id="doc_id"
			:data_objek="data_bhp"
			:bhp="true"
		/>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayBarang from './DisplayBarang.vue'

export default {
	name: 'DisplayBhp',
	components: {
		MyDisplayBarang,
	},
	props: {
		doc_type: String,
		doc_id: Number,
	},
	data() {
		return {
			data_bhp: null,
			display_barang: false,
		}
	},
	methods: {
		async getData() {
			let response = await api.getBhpByDocId(this.doc_type, this.doc_id)
			this.data_bhp = response.data.data
			console.log('DISPLAY BHP - GET DATA', JSON.parse(JSON.stringify(this.data_bhp)))
		}
	},
	async mounted() {
		this.display_barang = false
		await this.getData()
		this.display_barang = true
	}
}
</script>

<style>

</style>