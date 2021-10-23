<template>
	<div class="wrapper">

		<!-- Button tambah data -->
		<CRow 
			v-if="(state==='insert') || (state==='edit')"
			class="mt-3"
		>
			<CCol md="3" sm="12">
				<CButton 
					block 
					color="primary"
					@click="showModalNewDetail()"	
				>
					<CIcon name="cil-plus"/>
					Tambah objek penindakan
				</CButton>
			</CCol>
		</CRow>

		<!-- Display data detail -->
		<MyDisplaySarkut
			ref="display_sarkut"
			v-if="display_details.sarkut.visibility"
			:state="state"
			:doc_type="doc_type"
			:doc_id="doc_id"
			@edit-data="editData('sarkut')"
			@delete-data="deleteData('sarkut')"
		>
		</MyDisplaySarkut>
		<MyDisplayBarang
			ref="display_barang"
			v-if="display_details.barang.visibility"	
			:state="state"
			:doc_type="doc_type"
			:doc_id="doc_id"	
			@edit-data="editData('barang')"
			@delete-data="deleteData('barang')"
			@edit-item="$emit('edit-data')"
		>
		</MyDisplayBarang>
		<MyDisplayBangunan
			ref="display_bangunan"
			v-if="display_details.bangunan.visibility"
			:state="state"
			:doc_type="doc_type"
			:doc_id="doc_id"
			@edit-data="editData('bangunan')"
			@delete-data="deleteData('bangunan')"
		>
		</MyDisplayBangunan>
		<MyDisplayBadan
			ref="display_badan"
			v-if="display_details.badan.visibility"
			:state="state"
			:doc_type="doc_type"
			:doc_id="doc_id"
			@edit-data="editData('badan')"
			@delete-data="deleteData('badan')"
		>
		</MyDisplayBadan>

		<!-- Modal edit -->
		<MyModalDetailForm
			ref="modalDetailForm"
			:show.sync="show_modal_detail"
			:available_details.sync="available_details_form"
			:active_detail.sync="active_detail"
			:state.sync="form_state"
			:doc_type="doc_type"
			:doc_id="doc_id"
			@input-data="inputData"
		>
		</MyModalDetailForm>
	</div>
</template>

<script>
import axios from "axios"
import MyDisplayBadan from '../details/DisplayBadan.vue'
import MyDisplayBangunan from '../details/DisplayBangunan.vue'
import MyDisplayBarang from '../details/DisplayBarang.vue'
import MyDisplaySarkut from '../details/DisplaySarkut.vue'
import MyModalDetailForm from '../details/ModalDetailForm.vue'

const display_details_default = {
	sarkut: {
		visibility: false,
	},
	barang: {
		visibility: false,
	},
	bangunan: {
		visibility: false,
	},
	badan: {
		visibility: false,
	},
}

const available_details_default = ['sarkut', 'barang', 'bangunan', 'badan']

export default {
	name: 'DisplayDetail',
	components: {
		MyDisplayBadan,
		MyDisplayBangunan,
		MyDisplayBarang,
		MyDisplaySarkut,
		MyModalDetailForm
	},
	props: {
		state: {
			type: String,
			default: 'insert'
		},
		doc_type: {
			type: String,
			default: null
		},
		doc_id: {
			type: Number,
			default: null
		},
		available_details: {
			type: Array,
			default() {
				return available_details_default
			} 
		}
	},
	computed: {
		API_DETAILS() { return process.env.VUE_APP_BASEAPI + '/' + this.doc_type + '/' + this.doc_id + '/details' }
	},
	data() {
		return {
			console,
			show_modal_detail: false,
			display_details: JSON.parse(JSON.stringify(display_details_default)),
			available_details_form: this.available_details,
			active_detail: null,
			form_state: 'input'
		}
	},
	methods: {
		showModalNewDetail() {
			this.form_state = 'input'
			this.active_detail = null
			this.show_modal_detail = true
		},
		inputData(type) {
			this.displayDetail(type)
			this.filterDetails(type)
			this.$emit('edit-data')
		},
		displayDetail(type) {
			this.display_details[type]['visibility'] = true
			
			let ref_name = 'display_'+type
			if (typeof this.$refs[ref_name] != 'undefined') {
				this.$refs['display_'+type].getData()	
			}
		},
		editData(type) {
			this.show_modal_detail = true
			this.active_detail = type
			this.form_state = 'edit'
		},
		deleteData(type) {
			this.display_details[type]['visibility'] = false
			this.available_details_form.push(type)
			this.$emit('edit-data')
		},
		filterDetails(type) {
			this.available_details_form = this.available_details_form.filter(item => item !== type)
		},
		getDetails() {
			axios
				.get(this.API_DETAILS)
				.then(
					(response) => {
						let data = response.data.data
						for (const key in data) {
							if (data[key] == 1) {
								this.display_details[key]['visibility'] = true	
							} else {
								this.display_details[key]['visibility'] = false
							}
						}
					}
				)
		}
	},
	mounted() {
		this.getDetails()
	}
}
</script>

<style>

</style>