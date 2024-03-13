<template>
	<MyPageLkai
		:doc_type="doc_type"
		:kode_lppi="kode_lppi"
		:label_lkai="label_lkai"
		:label_lppi="label_lppi"
		:label_lpti="label_lpti"
		:label_npi="label_npi"
		:label_nhi="label_nhi"
		:label_ni="label_ni"
		:default_pejabat="default_pejabat"
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
			kode_lppi: "lppin",
			label_lkai: "LKAI-N",
			label_lppi: "LPPI-N",
			label_lpti: "LPTI-N",
			label_npi: "NPI-N",
			label_nhi: "NHI-N",
			label_ni: "NI-N",
			permission_to_create: 'create-lkain',
			default_pejabat: 'bd.0502',
		}
	}
}
</script>

<style>

</style>