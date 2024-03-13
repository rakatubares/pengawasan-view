<template>
	<div class="wrapper">
		<MyDisplayLkai
			ref="DisplayLkai"
			:doc_type="doc_type"
			:doc_id.sync="doc_id"
			:label_lppi="label_lppi"
			:label_lpti="label_lpti"
			:label_npi="label_npi"
			:label_nhi="label_nhi"
			:label_ni="label_ni"
			@get-data="convertData"
		/>
	</div>
</template>

<script>
import LkainKeys from './LkainKeys';
import MyDisplayLkai from './DisplayLkai.vue'

export default {
	name: 'DisplayLkaiN',
	components: {
		MyDisplayLkai,
	},
	props: {
		doc_type: String,
		doc_id: Number,
		label_lppi: String,
		label_lpti: String,
		label_npi: String,
		label_nhi: String,
		label_ni: String,
	},
	data() {
		return {
			lkain_keys: JSON.parse(JSON.stringify(LkainKeys))
		}
	},
	methods: {
		convertData(data) {
			for (const [new_key, old_key] of Object.entries(this.lkain_keys)) {
				Object.defineProperty(data, new_key, 
					Object.getOwnPropertyDescriptor(data, old_key)
				)
				delete data[old_key];
			}
			this.$refs.DisplayLkai.updateData(data)
		},
	}
}
</script>

<style>

</style>