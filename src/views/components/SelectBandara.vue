<template>
	<div class="wrapper select-bandara">
		<div class="form-group">
			<label>{{ label }}</label>
			<v-autocomplete
				v-model="value"
				no-filter
				attach=""
				outlined
				dense
				:items.sync="items"
				:search-input.sync="search"
				:error="error_state"
				item-text="airport_name"
				item-value="iata_code"
				:class="required == false ? 'plain' : ''"
			>
				<template v-slot:no-data>
					<v-list-item>
						<v-list-item-title>
							Bandara tidak ditemukan
						</v-list-item-title>
					</v-list-item>
				</template>
				<template v-slot:item="{ item }">
					<v-list-item-content>
						<v-list-item-title v-text="`${item.airport_name} (${item.iata_code})`"></v-list-item-title>
						<v-list-item-subtitle v-text="`${item.municipality || '-'}, ${item.negara.nama_negara}`"></v-list-item-subtitle>
					</v-list-item-content>
				</template>
			</v-autocomplete>
			<div 
				v-bind:style="{ display: display_feedback }" 
				class="invalid-feedback"
			>
				{{ label }} wajib diisi
			</div>
		</div>
	</div>
</template>

<script>
import api from '../../router/api2.js'

export default {
	name: 'SelectBandara',
	props: {
		label: {
			type: String,
			default: 'Bandara'
		},
		iata_code: String,
		required : {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			items: [],
			search: null,
			value: null,
			error_state: this.required == false ? false : true,
			display_feedback: this.required == false ? 'none' : 'block'
		}
	},
	watch: {
		async search (val) {
			let data = {s: val}
			let response = await api.searchBandara(data)
			this.items = response.data.data
		},
		value(val) {
			if (this.required == true) {
				if (val == null) {
					this.error_state = true
					this.display_feedback = 'block'
				} else {
					this.error_state = false
					this.display_feedback = 'none'
				}	
			}

			this.$emit('update:iata_code', val)
		}
	},
	methods: {
		async getData(code) {
			let response = await api.getBandaraByCode(code)
			let bandara = response.data.data
			this.items = [bandara]
			this.value = this.items[0]['iata_code']
		}
	},
}
</script>

<style>
.select-bandara .v-select__slot > input {
	font-size: 0.875rem;
	font-weight: 400;
	color: #768192;
}

.select-bandara .v-input__slot {
	min-height: calc(1.5em + 0.75rem) !important;
}

.select-bandara .plain .v-input__slot > fieldset {
	border: 1px solid #d8dbe0;
}

.select-bandara .v-input__slot > fieldset {
	border: 1px solid #2eb85c;
}

.select-bandara .error--text .v-input__slot > fieldset {
	border: 1px solid #e55353;
}

.select-bandara .v-text-field__details {
	display: none;
}

.select-bandara .invalid-feedback {
	margin-top: 0;
}
</style>