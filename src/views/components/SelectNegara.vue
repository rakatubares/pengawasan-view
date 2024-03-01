<template>
	<div class="wrapper">
		<div class="form-group">
			<label>{{ label }}</label>
			<v-autocomplete
				class="no-message"
				v-model="kode"
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
						<v-list-item-title>{{ item.nama_negara }}</v-list-item-title>
						<v-list-item-subtitle>{{ `${item.kode_2} / ${item.kode_3}` }}</v-list-item-subtitle>
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
		value: String,
	},
	data() {
		return {
			items: [],
			search: null,
			kode: null,
		}
	},
	watch: {
		async search (val) {
			let data = {s: val}
			let response = await api.searchNegara(data)
			this.items = response.data.data
		},
		kode(val) {
			this.$emit('update:value', val)
		}
	},
	methods: {
		async getData(code) {
			if (code != null) {
				let response = await api.getNegaraByCode(code)
				let negara = response.data.data
				this.items = [negara]
				this.kode = this.items[0]['kode_2']	
			} else {
				this.items = []
				this.kode = null
			}
		}
	}
}
</script>

<style>

</style>