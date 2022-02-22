<template>
	<MyPageLphp
		:doc_type="doc_type"
		:tipe_surat="tipe_surat"
		:sbp_type="sbp_type"
		:tipe_surat_sbp="tipe_surat_sbp"
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
			tipe_surat: 'LPHP-N',
			sbp_type: 'sbpn',
			tipe_surat_sbp: 'SBP-N'
		}
	},
}
</script>

<style>

</style>