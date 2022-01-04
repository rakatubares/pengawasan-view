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