<template>
	<div class="wrapper">

		<!-- Button tambah data -->
		<CRow class="mt-3">
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

		<!-- Dsiplay data detail -->
		<MyDisplaySarkut
			v-if="display_details.sarkut.visibility"
			:data.sync="display_details.sarkut.data"	
			@edit-data="editData('sarkut')"
			@delete-data="deleteData('sarkut')"
		>
		</MyDisplaySarkut>
		<MyDisplayBarang
			v-if="display_details.barang.visibility"	
			:data.sync="display_details.barang.data"	
			@edit-data="editData('barang')"
			@delete-data="deleteData('barang')"
		>
		</MyDisplayBarang>
		<MyDisplayBangunan
			v-if="display_details.bangunan.visibility"
			:data.sync="display_details.bangunan.data"	
			@edit-data="editData('bangunan')"
			@delete-data="deleteData('bangunan')"
		>
		</MyDisplayBangunan>
		<MyDisplayBadan
			v-if="display_details.badan.visibility"
			:data.sync="display_details.badan.data"	
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
			:sbp_id="sbp_id"
			@input-data="displayDetail($event)"
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

const API = process.env.VUE_APP_BASEAPI + '/sbp'

const display_details_default = {
	sarkut: {
		visibility: false,
		data: {}
	},
	barang: {
		visibility: false,
		data: {}
	},
	bangunan: {
		visibility: false,
		data: {}
	},
	badan: {
		visibility: false,
		data: {}
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
		sbp_id: {
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
		displayDetail({type, data}) {
			this.display_details[type]['visibility'] = true
			this.display_details[type]['data'] = data
			this.filterDetails(type)
		},
		editData(type) {
			this.show_modal_detail = true
			this.active_detail = type
			this.form_state = 'edit'
		},
		deleteData(type) {
			this.display_details[type]['visibility'] = false
			this.available_details_form.push(type)
		},
		filterDetails(type) {
			this.available_details_form = this.available_details_form.filter(item => item !== type)
		},
		getDetails() {
			for (const key in available_details_default) {
				let type = available_details_default[key]
				let API_DETAIL = API + '/' + this.sbp_id + '/' + type
				axios
					.get(API_DETAIL)
					.then(
						(response) => {
							let data = response.data.data
							this.displayDetail({type, data})
						}
					)
			}
		}
	},
	mounted() {
		this.getDetails()
	}
}
</script>

<style>

</style>