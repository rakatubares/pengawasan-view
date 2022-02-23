<template>
	<MyPageSbp
		:doc_type="doc_type"
		:tipe_surat="tipe_surat"
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
			tipe_surat: 'SBP-N'
		}
	}
}
</script>

<style>

</style>