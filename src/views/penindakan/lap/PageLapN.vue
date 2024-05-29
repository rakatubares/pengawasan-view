<template>
	<MyPageLap
		:doc_type="doc_type"
		:tipe_surat="tipe_surat"
		:permission_to_create="permission_to_create"
		:permission_to_update="permission_to_update"
		:permission_to_delete="permission_to_delete"
	/>
</template>

<script>
import MyPageLap from './PageLap.vue'

export default {
	name: 'PageLapN',
	components: {
		MyPageLap
	},
	data() {
		return {
			doc_type: 'lapn',
			tipe_surat: 'LAP-N',
			permission_to_create: 'create-lapn',
			permission_to_update: 'create-lapn',
			permission_to_delete: 'delete-lapn',
		}
	}
}
</script>

<style>

</style>