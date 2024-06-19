<template>
	<div class="wrapper select-kemasan">
		<div class="form-group">
			<label>Jenis kemasan</label>
			<v-autocomplete
				v-model="value"
				no-filter
				outlined
				dense
				:items="options"
				item-text="kemasan"
				item-value="id"
				:disabled.sync="disabled"
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
						<v-list-item-title>{{ item.kemasan }}</v-list-item-title>
					</v-list-item-content>
				</template>
			</v-autocomplete>
		</div>
	</div>
</template>

<script>
import store from '../../store'
import api from '../../router/api2.js'

export default {
	name: 'SelectKemasan',
	props: {
		id: Number,
		disabled: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			options: [],
			value: this.id,
		}
	},
	watch: {
		id(val) {
			this.value = val
		},
		value(val) {
			this.$emit('update:id', val)
		},
	},
	methods: {
		async generateOptions() {
			if (store.getters.kemasan == null) {
				let response = await api.getKemasan()
				let kemasan = response.data
				store.commit('set', ['kemasan', kemasan])
			}
			this.options = store.getters.kemasan
		}
	},
	mounted() {
		this.generateOptions()
	}
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