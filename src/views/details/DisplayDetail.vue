<template>
	<div class="wrapper">
		<!-- Display data detail -->
		<MyDisplaySarkut 
			v-if="active_detail == 'sarkut'"
			:doc.sync="doc"
		>
		</MyDisplaySarkut>
		<MyDisplayBarang 
			v-if="active_detail == 'barang'"
			:doc.sync="doc"
		>
		</MyDisplayBarang>
		<MyDisplayBangunan
			v-if="active_detail == 'bangunan'"
			:doc.sync="doc"
		>
		</MyDisplayBangunan>
		<MyDisplayBadan
			v-if="active_detail == 'orang'"
			:doc.sync="doc"
		>
		</MyDisplayBadan>
	</div>
</template>

<script>
import api from '../../router/api2.js'
import MyDisplayBadan from '../details/DisplayBadan.vue'
import MyDisplayBangunan from '../details/DisplayBangunan.vue'
import MyDisplayBarang from '../details/DisplayBarang.vue'
import MyDisplaySarkut from '../details/DisplaySarkut.vue'

export default {
	name: 'DisplayDetail',
	components: {
		MyDisplayBadan,
		MyDisplayBangunan,
		MyDisplayBarang,
		MyDisplaySarkut,
	},
	props: {
		doc_type: {
			type: String,
			default: null
		},
		doc_id: {
			type: Number,
			default: null
		},
	},
	data() {
		return {
			doc: null,
			active_detail: null,
		}
	},
	methods: {
		async getDetail() {
			this.doc = await api.getDocumentById(this.doc_type, this.doc_id)
			this.active_detail = this.doc.objek.type
		}
	},
	mounted() {
		this.getDetail()
	}
}
</script>

<style>

</style>