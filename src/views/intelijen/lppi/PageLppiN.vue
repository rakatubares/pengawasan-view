<template>
	<MyPageLppi
		:doc_type="doc_type"
		:tipe_surat="tipe_surat"
		:permission_to_create="permission_to_create"
	/>
</template>

<script>
import MyPageLppi from './PageLppi.vue'

export default {
	name: 'PageLppiN',
	components: {
		MyPageLppi
	},
	data() {
		return {
			doc_type: 'lppin',
			tipe_surat: 'LPPI-N',
			permission_to_create: 'create-lppin'
		}
	}
}
</script>

<style>

</style>