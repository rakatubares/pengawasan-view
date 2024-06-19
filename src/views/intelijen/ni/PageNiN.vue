<template>
	<MyPageNi
		:doc_type="doc_type"
		:kode_lkai="kode_lkai"
		:label_ni="label_ni"
		:label_lkai="label_lkai"
		:permission_to_create="permission_to_create"
		:permission_to_update="permission_to_update"
		:permission_to_delete="permission_to_delete"
		:permission_to_rollback="permission_to_rollback"
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
			kode_lkai: "lkain",
			label_ni: "NI-N",
			label_lkai: "LKAI-N",
			permission_to_create: "create-nin",
			permission_to_update: "create-nin",
			permission_to_delete: "delete-nin",
			permission_to_rollback: "rollback-nin",
		}
	}
}
</script>

<style>

</style>