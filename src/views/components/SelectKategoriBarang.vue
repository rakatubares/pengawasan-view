<template>
	<div class="wrapper select-kategori-barang">
		<div class="form-group">
			<label>Kategori barang</label>
			<v-autocomplete
				v-model="value"
				outlined
				dense
				:items="items"
				item-text="kategori"
				item-value="id"
			>
				<template v-slot:no-data>
					<v-list-item>
						<v-list-item-title>
							Kategori tidak ditemukan
						</v-list-item-title>
					</v-list-item>
				</template>
				<template v-slot:item="{ item }">
					<v-list-item-content>
						<v-list-item-title v-text="item.kategori"></v-list-item-title>
					</v-list-item-content>
				</template>
			</v-autocomplete>
		</div>
	</div>
</template>

<script>
import api from '../../router/api2.js'

export default {
	name: 'SelectKategoriBarang',
	props: {
		id: Number
	},
	data() {
		return {
			items: [],
			search: null,
			value: this.id,
		}
	},
	watch: {
		value(val) {
			this.$emit('update:id', val)
		},
	},
	methods: {
		async getCategories() {
			let response = await api.getKategori()
			this.items = response.data.data
		}
	},
	mounted() {
		this.getCategories()
	}
}
</script>

<style>
.select-kategori-barang .v-select__slot > input {
	font-size: 0.875rem;
	font-weight: 400;
	color: #768192;
}

.select-kategori-barang .v-input__slot {
	min-height: calc(1.5em + 0.75rem) !important;
}

.select-kategori-barang .v-input__slot > fieldset {
	border: 1px solid;
}

.select-kategori-barang .v-text-field__details {
	display: none;
}
</style>