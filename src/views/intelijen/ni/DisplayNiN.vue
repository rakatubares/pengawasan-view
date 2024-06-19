<template>
	<div class="wrapper">
		<MyDisplayNi
			ref="DisplayNi"
			:doc_type="doc_type"
			:document.sync="document"
			:label_lkai="label_lkai"
		/>
	</div>
</template>

<script>
import MyDisplayNi from './DisplayNi.vue'

export default {
	name: 'DisplayNiN',
	components: {
		MyDisplayNi,
	},
	props: {
		doc_type: String,
		document: Object,
		label_lkai: String,
	},
}
</script>

<style>

</style>