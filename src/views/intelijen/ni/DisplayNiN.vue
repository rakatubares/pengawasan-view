<template>
	<div class="wrapper">
		<MyDisplayNi
			ref="DisplayNi"
			:doc_type="doc_type"
			:doc_id="doc_id"
			:label_lkai="label_lkai"
			@get-data="convertData"
		/>
	</div>
</template>

<script>
import NiNKeys from './NiNKeys';
import MyDisplayNi from './DisplayNi.vue'

export default {
	name: 'DisplayNiN',
	components: {
		MyDisplayNi,
	},
	props: {
		doc_type: String,
		doc_id: Number,
		label_lkai: String,
	},
	data() {
		return {
			nin_keys: JSON.parse(JSON.stringify(NiNKeys))
		}
	},
	methods: {
		convertData(data) {
			for (const [new_key, old_key] of Object.entries(this.nin_keys)) {
				Object.defineProperty(data, new_key, 
					Object.getOwnPropertyDescriptor(data, old_key)
				)
				delete data[old_key];
			}
			this.$refs.DisplayNi.updateData(data)
		},
	}
}
</script>

<style>

</style>