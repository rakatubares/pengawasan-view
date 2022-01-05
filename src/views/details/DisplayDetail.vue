<template>
	<div class="wrapper">
		<!-- Display data detail -->
		<MyDisplaySarkut 
			v-if="active_detail == 'sarkut'"
			:doc.sync="doc"
		/>
		<MyDisplayBarang 
			v-if="active_detail == 'barang'"
			:doc.sync="doc"
		/>
		<MyDisplayBangunan
			v-if="active_detail == 'bangunan'"
			:doc.sync="doc"
		/>
		<MyDisplayBadan
			v-if="active_detail == 'orang'"
			:doc.sync="doc"
		/>
		<MyDisplayDokumen
			v-if="active_detail == 'dokumen'"
			:doc.sync="doc"
		/>
	</div>
</template>

<script>
import MyDisplayBadan from '../details/DisplayBadan.vue'
import MyDisplayBangunan from '../details/DisplayBangunan.vue'
import MyDisplayBarang from '../details/DisplayBarang.vue'
import MyDisplayDokumen from '../details/DisplayDokumen.vue'
import MyDisplaySarkut from '../details/DisplaySarkut.vue'

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
		doc: Object
	},
	computed: {
		active_detail() {
			return this.doc.objek.type
		}
	},
}
</script>

<style>

</style>