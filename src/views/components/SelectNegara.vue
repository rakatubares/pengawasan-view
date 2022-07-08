<template>
	<div class="wrapper">
		<div class="form-group">
			<label>{{ label }}</label>
			<v-autocomplete
				class="no-message"
				v-model="value"
				no-filter
				outlined
				dense
				:items.sync="items"
				:search-input.sync="search"
				item-text="nama_negara"
				item-value="kode_2"
			>
				<template v-slot:no-data>
					<v-list-item>
						<v-list-item-title>
							Negara tidak ditemukan
						</v-list-item-title>
					</v-list-item>
				</template>
				<template v-slot:item="{ item }">
					<v-list-item-content>
						<v-list-item-title v-text="item.nama_negara"></v-list-item-title>
						<v-list-item-subtitle v-text="`${item.kode_2} / ${item.kode_3}`"></v-list-item-subtitle>
					</v-list-item-content>
				</template>
			</v-autocomplete>
		</div>
	</div>
</template>

<script>
import api from '../../router/api2.js'

export default {
	name: 'SelectNegara',
	props: {
		label: {
			type: String,
			default: 'Negara'
		},
		kode: String,
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
			let response = await api.searchNegara(data)
			this.items = response.data.data
		},
		value(val) {
			this.$emit('update:kode', val)
		}
	},
	methods: {
		async getData(code) {
			if (code != null) {
				let response = await api.getNegaraByCode(code)
				let negara = response.data.data
				this.items = [negara]
				this.value = this.items[0]['kode_2']	
			} else {
				this.items = []
				this.value = null
			}
		}
	}
}
</script>

<style>

</style>