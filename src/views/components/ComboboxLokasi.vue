<template>
	<div class="wrapper">
		<CRow>
			<CCol sm="12">
				<label>{{ label }}</label>
				<v-combobox
					:messages="description"
					v-model="selected"
					outlined
					:items.sync="options"
					@update:search-input="search"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../router/api2.js'

export default {
	name: 'ComboboxLokasi',
	props: {
		label: {
			type: String,
			default: 'Lokasi',
		},
		description: String,
		value: String
	},
	data() {
		return {
			selected: this.value,
			options: [],
		}
	},
	watch: {
		selected(val) {
			this.$emit('update:value', val)
		},
		value(val) {
			this.selected = val
		}
	},
	methods: {
		async search(string) {
			this.$emit('update:value', string)
			if (string != null) {
				let search_data = {'src': string}
				let responses = await api.searchLokasi(search_data)
				this.options = responses.data	
			}
		},
	}
}
</script>

<style>

</style>