<template>
	<MyPageSbp
		:doc_type="doc_type"
		:doc_name="doc_name"
		:lptp_name="lptp_name"
		:permission_to_create="permission_to_create"
		:permission_to_update="permission_to_update"
		:permission_to_delete="permission_to_delete"
		:permission_to_rollback="permission_to_rollback"
		:source_options="source_options"
	/>
</template>

<script>
import MyPageSbp from './PageSbp.vue'

export default {
	name: 'PageSbpN',
	components: {
		MyPageSbp
	},
	data() {
		return {
			doc_type: 'sbpn',
			doc_name: 'SBP-N',
			lptp_name: 'LPTP-N',
			permission_to_create: 'create-sbpn',
			permission_to_update: 'create-sbpn',
			permission_to_delete: 'delete-sbpn',
			permission_to_rollback: 'rollback-sbpn',
			source_options: {
				'nhin': {'label': 'NHI-N', 'state': 'search', 'filters': {'status_sbp': false}}, 
				'lapn': {'label': 'LAP-N', 'state': 'search'},
			},
		}
	}
}
</script>

<style>

</style>