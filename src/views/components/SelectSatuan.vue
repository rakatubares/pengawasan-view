<template>
	<div class="wrapper select-satuan">
		<div class="form-group">
			<label>Satuan</label>
			<v-autocomplete
				v-model="value"
				outlined
				dense
				:items.sync="options"
				:error.sync="error_state"
				item-text="satuan"
				item-value="id"
			>
				<template v-slot:no-data>
					<v-list-item>
						<v-list-item-title>
							Kode satuan tidak ditemukan
						</v-list-item-title>
					</v-list-item>
				</template>
				<template v-slot:item="{ item }">
					<v-list-item-content>
						<v-list-item-title>{{ item.satuan }}</v-list-item-title>
					</v-list-item-content>
				</template>
			</v-autocomplete>
			<div 
				v-bind:style="{ display: display_feedback }" 
				class="invalid-feedback"
			>
				Satuan wajib diisi
			</div>
		</div>
	</div>
</template>

<script>
import store from '../../store'
import api from '../../router/api2.js'

export default {
	name: 'SelectSatuan',
	props: {
		id: Number,
		isValid: false,
	},
	data() {
		return {
			options: [],
			value: this.id,
			error_state: true,
			display_feedback: 'block'
		}
	},
	watch: {
		id(val) {
			this.value = val
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
		},
		error_state(val) {
			this.$emit('update:isValid', !val)
		}
	},
	methods: {
		async generateSatuanOptions() {
			if (store.getters.satuanBarang == null) {
				let response = await api.getSatuanBarang()
				let kategori = response.data
				store.commit('set', ['satuanBarang', kategori])
			}
			this.options = store.getters.satuanBarang
		}
	},
	mounted() {
		this.generateSatuanOptions()
	}
}
</script>

<style>
.select-satuan .v-select__slot > input {
	font-size: 0.875rem;
	font-weight: 400;
	color: #768192;
}

.select-satuan .v-input__slot {
	min-height: calc(1.5em + 0.75rem) !important;
}

.select-satuan .v-input__slot > fieldset {
	border: 1px solid #2eb85c !important;
}

.select-satuan .error--text .v-input__slot > fieldset {
	border: 1px solid #e55353 !important;
}

.select-satuan .v-text-field__details {
	display: none;
}

.select-satuan .invalid-feedback {
	margin-top: 0;
}
</style>