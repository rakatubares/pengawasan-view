<template>
	<div class="wrapper">
		<CForm>
			<CRow>
				<!-- Toggler -->
				<CCol md="2" sm="12">
					<label>Sumber Informasi</label>
					<CDropdown
						id="toggler-search-document"
						:toggler-text.sync="selected_doc_label"
						color="primary"
					>
						<CDropdownItem
							v-for="option in doc_options"
							:key="option.type"
							@click="toggleDocType(option)"
						>
							{{ option.label }}
						</CDropdownItem>
					</CDropdown>
				</CCol>

				<!-- Input -->
				<CCol md="10" v-if="selected_doc_state == 'search'">
					<MySearchDocument
						:doc_type.sync="selected_doc_type"
						:value.sync="selected_doc_id"
						:exceptions.sync="exceptions"
					/>
				</CCol>
				
				<CCol 
					v-if="selected_doc_state == 'manual'"
					md="7" sm="12" 
				>
					<CInput 
						label="Nomor"
						:value.sync="selected_doc_number"
					/>	
				</CCol>
				<CCol 
					v-if="selected_doc_state == 'manual'"
					md="3" sm="12"
				>
					<label>Tanggal</label>
					<div class="form-group">
						<date-picker 
							v-model="selected_doc_date"	
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
							class="w-100"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
								/>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
				
			</CRow>
		</CForm>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import MySearchDocument from './SearchDocument.vue'

export default {
	name: 'ToggleSearchDocument',
	components: {
		DatePicker,
		MySearchDocument,
	},
	props: {
		doc_options: Array,
		doc_type: String,
		doc_id: Number,
		doc_number: String,
		doc_date: String,
		saved_doc_id: Number,
	},
	data() {
		return {
			selected_doc_label: this.doc_options[0]['label'],
			selected_doc_state: this.doc_options[0]['state'],
			selected_doc_type: this.doc_options[0]['type'],
			selected_doc_id: this.doc_id,
			selected_doc_number: this.doc_number,
			selected_doc_date: this.doc_date,
			exceptions: this.saved_doc_id,
		}
	},
	watch: {
		doc_type(val) {
			let selected_option = this.doc_options.filter(function (option) {
				if (option.type == val) {
					return option
				}
			})
			selected_option = selected_option.length > 0 ? selected_option[0] : null
			this.toggleDocType(selected_option)
		},
		selected_doc_type(val) {
			this.$emit('update:doc_type', val)
		},
		doc_id(val) {
			this.selected_doc_id = val
		},
		selected_doc_id(val) {
			this.$emit('update:doc_id', val)
		},
		doc_number(val) {
			this.selected_doc_number = val
		},
		selected_doc_number(val) {
			this.$emit('update:doc_number', val)
		},
		doc_date(val) {
			this.selected_doc_date = val
		},
		selected_doc_date(val) {
			this.$emit('update:doc_date', val)
		},
		saved_doc_id(val) {
			this.exceptions = val
		},
		exceptions(val) {
			this.$emit('update:saved_doc_id', val)
		}
	},
	methods: {
		toggleDocType(val) {
			this.selected_doc_label = val.label
			this.selected_doc_state = val.state
			this.selected_doc_type = val.type
			this.selected_doc_id = null
			this.selected_doc_number = null
			this.selected_doc_date = null
		}
	}
}
</script>

<style>
#toggler-search-document > button {
	width: 100%;
}
</style>