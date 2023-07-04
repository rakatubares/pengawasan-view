<template>
	<MyPageLap
		:doc_type="doc_type"
		:tipe_surat="tipe_surat"
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
			tipe_surat: 'LAP-N'
		}
	}
}
</script>

<style>

</style>