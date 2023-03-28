<template>
  <div class="wrapper">
	<v-combobox
		v-model="selected"
		outlined
		:items.sync="options"
		@update:search-input="search($event)"
	>
		<template #append>
			<CButton 
				class="no-rounded rounded-right"
				color="danger"
				@click="remove"
			>
				<CIcon name="cil-trash"/>
			</CButton>
		</template>
	</v-combobox>
  </div>
</template>

<script>
import api from '../../router/api2.js'

export default {
	name: 'ComboboxTembusan',
	props: {
		value: String,
		except: Array,
	},
	data() {
		return {
			selected: this.value,
			options: [],
		}
	},
	methods: {
		async search(string) {
			this.$emit('update:value', string)
			let data = {'src': string, 'exc': this.except}
			let responses = await api.searchDoc('tembusan', data)
			this.options = responses.data.data
		},
		remove() {
			this.$emit('delete-data')
		}
	},
	watch: {
		selected(val) {
			this.$emit('update:value', val)
		},
		value(val) {
			this.selected = val
		}
	}
}
</script>

<style>

</style>