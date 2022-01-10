<template>
	<div class="wrapper">
		<!-- Display data detail -->
		<MyDisplaySarkut 
			v-if="active_detail == 'sarkut'"
			:data_objek="data_objek"
		/>
		<MyDisplayBarang 
			v-if="active_detail == 'barang'"
			:doc_type="doc_type"
			:dco_id="doc_id"
			:data_objek="data_objek.data"
		/>
		<MyDisplayBangunan
			v-if="active_detail == 'bangunan'"
			:data_objek="data_objek"
		/>
		<MyDisplayBadan
			v-if="active_detail == 'orang'"
			:data_objek="data_objek"
		/>
		<MyDisplayDokumen
			v-if="active_detail == 'dokumen'"
			:data_objek="data_objek"
		/>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayBadan from './DisplayBadan.vue'
import MyDisplayBangunan from './DisplayBangunan.vue'
import MyDisplayBarang from './DisplayBarang.vue'
import MyDisplayDokumen from './DisplayDokumen.vue'
import MyDisplaySarkut from './DisplaySarkut.vue'

export default {
	name: 'DisplayDetail',
	components: {
		MyDisplayBadan,
		MyDisplayBangunan,
		MyDisplayBarang,
		MyDisplayDokumen,
		MyDisplaySarkut,
	},
	props: {
		doc_type: String,
		doc_id: Number,
	},
	data() {
		return {
			data_objek: {type: null}
		}
	},
	computed: {
		active_detail() {
			return this.data_objek.type
		}
	},
	methods: {
		async getData() {
			this.data_objek = await api.getObjek(this.doc_type, this.doc_id)
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>

</style>