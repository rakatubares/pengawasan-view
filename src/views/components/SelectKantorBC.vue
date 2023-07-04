<template>
	<div class="wrapper">
		<div class="form-group">
			<label>{{ label }}</label>
			<v-autocomplete
				v-model="value"
				no-filter
				outlined
				dense
				:items.sync="items"
				:search-input.sync="search"
				item-text="nama_kantor"
				item-value="kd_kantor"
			>
				<template v-slot:no-data>
					<v-list-item>
						<v-list-item-title>
							Kantor tidak ditemukan
						</v-list-item-title>
					</v-list-item>
				</template>
				<template v-slot:item="{ item }">
					<v-list-item-content>
						<v-list-item-title v-text="`${item.kd_kantor} - ${item.nama_kantor}`"></v-list-item-title>
					</v-list-item-content>
				</template>
			</v-autocomplete>
		</div>
	</div>
</template>

<script>
import api from '../../router/api2.js'

export default {
	name: 'SelectKantor',
	props: {
		label: {
			type: String,
			default: 'Kantor Bea dan Cukai'
		},
		kd_kantor: String,
		default_kantor: String
	},
	data() {
		return {
			items: [],
			search: null,
			value: null,
		}
	},
	watch: {
		async search (val) {
			let data = {s: val}
			let response = await api.searchKantorBC(data)
			this.items = response.data.data
		},
		value(val) {
			this.$emit('update:kd_kantor', val)
		}
	},
	methods: {
		async getData(code) {
			let response = await api.getKantorByCode(code)
			let satuan = response.data.data
			this.items = [satuan]
			this.value = this.items[0]['kd_kantor']
		}
	},
	async mounted() {
		if (this.default_kantor != null) {
			await this.getData(this.default_kantor)
		}
	}
}
</script>

<style>

</style>