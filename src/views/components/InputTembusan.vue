<template>
	<div class="wrapper">
		<CForm>
			<label>{{ label }}</label>
			<CRow>
				<CCol>
					<div class="input-container" v-for="(val,index) in data" :key="index">
						<MyComboboxTembusan
							:value.sync="data[index]"
							:except.sync="data"
							@delete-data="delCc(index)"
						/>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol class="pt-0">
					<CButton color="primary" @click="addCc">+ Tambah Tembusan</CButton>
				</CCol>
			</CRow>
		</CForm>
	</div>
</template>

<script>
import MyComboboxTembusan from '../components/ComboboxTembusan.vue'

export default {
	name: 'InputTembusan',
	components: {
		MyComboboxTembusan,
	},
	props: {
		label: {
			type: String,
			default: 'Tembusan',
		},
		value: [],
	},
	data() {
		return {
			data: this.value,
		}
	},
	watch: {
		value(val) {
			this.data = val
		},
		data(val) {
			this.$emit('update:value', val)
		}
	},
	methods: {
		addCc() {
			this.data.push(null)
		},
		delCc(index) {
			this.data.splice(index,1)
		},
	}
}
</script>

<style>

</style>