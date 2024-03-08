<template>
	<MyPageLkai
		:doc_type="doc_type"
		:tipe_surat="tipe_surat"
		:permission_to_create="permission_to_create"
		:default_pejabat="default_pejabat"
	/>
</template>

<script>
import MyPageLkai from './PageLkai.vue'

export default {
	name: 'PageLkaiN',
	components: {
		MyPageLkai
	},
	data() {
		return {
			doc_type: 'lkain',
			tipe_surat: 'LKAI-N',
			permission_to_create: 'create-lkain',
			default_pejabat: 'bd.0502',
		}
	}
}
</script>

<style>

</style>