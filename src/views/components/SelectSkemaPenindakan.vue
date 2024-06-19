<template>
	<div class="wrapper">
		<CForm>
			<CRow>
				<CCol sm="12">
					<CSelect
						:label="label"
						:options.sync="options"
						:value.sync="value"
					/>
				</CCol>
			</CRow>
		</CForm>
	</div>
</template>

<script>
import api from '../../router/api2.js'
import store from '../../store'

export default {
	name: 'SelectSkemaPenindakan',
	props: {
		id: Number,
		label: {
			type: String,
			default: 'Skema Penindakan',
		}
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
		async generateSkemaPenindakan() {
			if (store.getters.skemaPenindakan == null) {
				let response = await api.getSkemaPenindakan()
				let data = response.data
				store.commit('set', ['skemaPenindakan', data])
			}
			await this.constructOptions()
		},
		async constructOptions() {
			let options = []
			store.getters.skemaPenindakan.forEach(element => {
				options.push({value: element.id, label: element.skema})
			});
			this.options = options
		}
	},
	mounted() {
		this.generateSkemaPenindakan()
	}
}
</script>

<style>

</style>