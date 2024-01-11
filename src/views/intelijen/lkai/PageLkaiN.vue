<template>
	<MyPageLkai
		:doc_type="doc_type"
		:tipe_surat="tipe_surat"
		:permission_to_create="permission_to_create"
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
		}
	}
}
</script>

<style>

</style>