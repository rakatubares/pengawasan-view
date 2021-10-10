<template>
	<CAlert
		class="alert-fixed"
		:show.sync="mutable_show"
		closeButton
		:color.sync="mutable_color"
		fade
	>
		{{mutable_text}}
	</CAlert>
</template>

<script>
const props_default = {
	show: false,
	color: 'success',
	text: ''
}
export default {
	name: 'AlertSubmit',
	data: function() {
		return {
			mutable_show: props_default.show,
			mutable_color: props_default.color,
			mutable_text: props_default.text,
		}
	},
	methods: {
		show_alert(text='', color='success', time=2, ) {
			this.mutable_text = text,
			this.mutable_color = color,
			this.mutable_show = time
		},
		reset_alert() {
			this.mutable_text = props_default.text,
			this.mutable_color = props_default.color,
			this.mutable_show = props_default.time
		}
	}
}
</script>

<style>

</style>