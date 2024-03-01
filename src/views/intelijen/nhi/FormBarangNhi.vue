<template>
	<div class="wrapper">
		<MyTableBarang
			:state.sync="state"
			:doc_type.sync="doc_type"
			:doc_id.sync="doc_id"
			:data_objek.sync="data_objek"
			:with_photo="false"
		/>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyTableBarang from '../../components/barang/TableItemBarang.vue'

export default {
	name: 'FormBarangNhi',
	components: {
		MyTableBarang,
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_objek: {item: null}
		}
	},
	// methods: {
	// 	async getData() {
	// 		// let response = await api.getObjek(this.doc_type, this.doc_id)
	// 		let response = await api.getBarang(this.doc_type, this.doc_id)
	// 		if (response.data != null) {
	// 			this.data_objek = response.data
	// 		} else {
	// 			this.data_objek = {item: null}
	// 		}
	// 	},
	// },
	// mounted() {
	// 	this.getData()
	// }
}
</script>

<style>

</style>