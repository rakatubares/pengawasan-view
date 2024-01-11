<template>
	<MyPageLap
		:doc_type="doc_type"
		:tipe_surat="tipe_surat"
		:permission_to_create="permission_to_create"
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
			permission_to_create: 'create-lapn'
		}
	}
}
</script>

<style>

</style>