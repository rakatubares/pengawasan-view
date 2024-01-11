<template>
	<MyPageNi
		:doc_type="doc_type"
		:label_ni="label_ni"
		:tipe_lkai="tipe_lkai"
		:label_lkai="label_lkai"
		:permission_to_create="permission_to_create"
	/>
</template>

<script>
import MyPageNi from './PageNi.vue'

export default {
	name: 'PageNiN',
	components: {
		MyPageNi
	},
	data() {
		return {
			doc_type: "nin",
			label_ni: "NI-N",
			tipe_lkai: "lkain",
			label_lkai: "LKAI-N",
			permission_to_create: "create-nin",
		}
	}
}
</script>

<style>

</style>