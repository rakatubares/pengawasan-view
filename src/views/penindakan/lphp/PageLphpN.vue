<template>
	<MyPageLphp
		:doc_type="doc_type"
		:doc_name="doc_name"
		:sbp_type="sbp_type"
		:kode_lptp="kode_lptp"
		:tipe_surat_lptp="tipe_surat_lptp"
		:permission_to_create="permission_to_create"
		:permission_to_update="permission_to_update"
		:permission_to_delete="permission_to_delete"
		:permission_to_rollback="permission_to_rollback"
	/>
</template>

<script>
import MyPageLphp from './PageLphp.vue'

export default {
	name: 'PageLphpN',
	components: {
		MyPageLphp
	},
	data() {
		return {
			doc_type: 'lphpn',
			doc_name: 'LPHP-N',
			sbp_type: 'sbpn',
			kode_lptp: 'lptpn',
			tipe_surat_lptp: 'LPTP-N',
			permission_to_create: 'create-lphpn',
			permission_to_update: 'create-lphpn',
			permission_to_delete: 'delete-lphpn',
			permission_to_rollback: 'rollback-lphpn',
		}
	},
}
</script>

<style>

</style>