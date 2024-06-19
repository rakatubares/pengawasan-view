<template>
	<MyPageLap
		:doc_type="doc_type"
		:doc_name="doc_name"
		:permission_to_create="permission_to_create"
		:permission_to_update="permission_to_update"
		:permission_to_delete="permission_to_delete"
		:permission_to_rollback="permission_to_rollback"
		:source_options="source_options"
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
			doc_name: 'LAP-N',
			permission_to_create: 'create-lapn',
			permission_to_update: 'create-lapn',
			permission_to_delete: 'delete-lapn',
			permission_to_rollback: 'rollback-lapn',
			source_options: {
				'nhin': {'label': 'NHI-N', 'state': 'search'}, 
				'lainnya': {'label': 'Lainnya', 'state': 'manual'},
			},
		}
	}
}
</script>

<style>

</style>