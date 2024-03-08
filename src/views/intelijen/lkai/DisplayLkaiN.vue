<template>
	<div class="wrapper">
		<MyDisplayLkai
			ref="displayLkai"
			:doc_type="doc_type"
			:doc_id.sync="doc_id"
			label_lppi="LPPI-N"
			label_lpti="LPTI-N"
			label_npi="NPI-N"
			label_nhi="NHI-N"
			label_ni="NI-N"
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
			this.$refs.displayLkai.updateData(data)
		},
	}
}
</script>

<style>

</style>