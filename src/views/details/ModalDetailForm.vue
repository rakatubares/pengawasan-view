<template>
	<div class="wrapper">
		<!-- Modal input data detail -->
		<CModal
			class="modal-level-2"
			title="Input Detail SBP"
			size="xl"
			:show="show"
			@update:show="$emit('update:show', $event)"
		>
			<CRow>
				<CCol md="4">
					<CSelect
						label="Objek penindakan"
						placeholder="pilih objek penindakan"
						:disabled="state !== 'input' ? true : false"
						:options.sync="options_jenis_penindakan"
						:value="active_detail"
						:is-valid="validatorRequired"
						invalid-feedback="Objek penindakan harus dipilih"
						@update:value="$emit('update:active_detail', $event)"
					/>
				</CCol>
			</CRow>

			<MyFormSarkut
				v-if="active_detail == 'sarkut'"
				:state.sync="state"
				:doc_type="doc_type"
				:doc_id="doc_id"
				@input-data="
					$emit('update:state', 'edit')
					displayDetail('sarkut')
				"
			>
			</MyFormSarkut>
			<MyFormBarang
				v-if="active_detail == 'barang'"
				:state.sync="state"
				:doc_type="doc_type"
				:doc_id="doc_id"
				@input-data="
					$emit('update:state', 'edit')
					displayDetail('barang')
				"
			>
			</MyFormBarang>
			<MyFormBangunan
				v-if="active_detail == 'bangunan'"
				:state.sync="state"
				:doc_type="doc_type"
				:doc_id="doc_id"
				@input-data="
					$emit('update:state', 'edit')
					displayDetail('bangunan')
				"
			>
			</MyFormBangunan>
			<MyFormBadan
				v-if="active_detail == 'badan'"
				:state.sync="state"
				:doc_type="doc_type"
				:doc_id="doc_id"
				@input-data="
					$emit('update:state', 'edit')
					displayDetail('badan')
				"
			>
			</MyFormBadan>
		</CModal>
	</div>
</template>

<script>
import MyFormBadan from '../details/FormDetailBadan.vue'
import MyFormBangunan from '../details/FormDetailBangunan.vue'
import MyFormBarang from '../details/FormDetailBarang.vue'
import MyFormSarkut from '../details/FormDetailSarkut.vue'
import validators from '../../helpers/validator.js'

const jenis_penindakan_default = [
	{ value: 'sarkut', label: 'Sarana Pengangkut', disabled: false },
	{ value: 'barang', label: 'Barang', disabled: false },
	{ value: 'bangunan', label: 'Bangunan / Tempat', disabled: false },
	{ value: 'badan', label: 'Badan / Orang', disabled: false }
]

export default {
	name: 'ModalDetailForm',
	components: {
		MyFormBadan,
		MyFormBangunan,
		MyFormBarang,
		MyFormSarkut
	},
	props: {
		show: Boolean,
		available_details: {
			type: Array,
			default() {
				return ['sarkut', 'barang', 'bangunan', 'badan']
			} 
		},
		active_detail: {
			type: String,
			default: null
		},
		state: {
			type: String,
			default: 'input'
		},
		doc_type: String,
		doc_id: Number
	},
	computed: {
		options_jenis_penindakan() {
			let options = JSON.parse(JSON.stringify(jenis_penindakan_default))
			for (const idx in options) {
				if (!(this.available_details.includes(options[idx]['value']))) {
					options[idx]['disabled'] = true
				}
			}
			return options
		}
	},
	data() {
		return {
			console,
		}
	},
	methods: {
		validatorRequired(val) { return validators.required(val) },
		displayDetail(type) {
			this.$emit('input-data', type)
		},
	},
}
</script>

<style>

</style>