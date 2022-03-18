<template>
	<div class="wrapper select-kemasan">
		<div class="form-group">
			<label>Jenis kemasan</label>
			<v-autocomplete
				v-model="value"
				no-filter
				outlined
				dense
				:items.sync="items"
				:search-input.sync="search"
				:error="error_state"
				item-text="kode_kemasan"
				item-value="id"
			>
				<template v-slot:no-data>
					<v-list-item>
						<v-list-item-title>
							Kode kemasan tidak ditemukan
						</v-list-item-title>
					</v-list-item>
				</template>
				<template v-slot:item="{ item }">
					<v-list-item-content>
						<v-list-item-title v-text="item.kode_kemasan"></v-list-item-title>
						<v-list-item-subtitle v-text="item.uraian_kemasan"></v-list-item-subtitle>
					</v-list-item-content>
				</template>
			</v-autocomplete>
			<div 
				v-bind:style="{ display: display_feedback }" 
				class="invalid-feedback"
			>
				Kemasan wajib diisi
			</div>
		</div>
	</div>
</template>

<script>
import api from '../../router/api2.js'

export default {
	name: 'SelectKemasan',
	props: {
		id: Number
	},
	data() {
		return {
			items: [],
			search: null,
			value: null,
			error_state: true,
			display_feedback: 'block'
		}
	},
	watch: {
		async search (val) {
			let data = {s: val}
			let response = await api.searchKemasan(data)
			this.items = response.data.data
		},
		value(val) {
			if (val == null) {
				this.error_state = true
				this.display_feedback = 'block'
			} else {
				this.error_state = false
				this.display_feedback = 'none'
			}

			this.$emit('update:id', val)
		}
	},
	methods: {
		async getData(id) {
			let response = await api.getKemasanById(id)
			let satuan = response.data.data
			this.items = [satuan]
			this.value = this.items[0]['id']
		}
	},
}
</script>

<style>
.select-kemasan .v-select__slot > input {
	font-size: 0.875rem;
	font-weight: 400;
	color: #768192;
}

.select-kemasan .v-input__slot {
	min-height: calc(1.5em + 0.75rem) !important;
}

.select-kemasan .v-input__slot > fieldset {
	border: 1px solid #2eb85c;
}

.select-kemasan .error--text .v-input__slot > fieldset {
	border: 1px solid #e55353;
}

.select-kemasan .v-text-field__details {
	display: none;
}

.select-kemasan .invalid-feedback {
	margin-top: 0;
}
</style>