<template>
	<div class="wrapper">
		<MyTableItemBarang
			:state.sync="state"
			:doc_type.sync="doc_type"
			:document.sync="document"
			:with_photo="false"
		/>
	</div>
</template>

<script>
import MyTableItemBarang from '../../components/barang/TableItemBarang.vue'

export default {
	name: 'FormBarangNhi',
	components: {
		MyTableItemBarang,
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			data_objek: {item: null}
		}
	},
}
</script>

<style>

</style>