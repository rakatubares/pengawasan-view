<template>
	<div class="wrapper">
		<CForm>
			<CRow>
				<!-- Toggler -->
				<CCol md="2" sm="12">
					<label>{{ label }}</label>
					<CDropdown
						id="toggler-search-document"
						:toggler-text.sync="selected_doc_label"
						color="primary"
					>
						<CDropdownItem
							v-for="option in dropdown_items"
							:key="option.type"
							@click="toggleDocType(option.type)"
						>
							{{ option.label }}
						</CDropdownItem>
					</CDropdown>
				</CCol>

				<!-- Input -->
				<CCol md="10" v-if="selected_doc_state == 'search'">
					<MySearchDocument
						ref="SearchDocument"
						:doc_type.sync="selected_doc_type"
						:value.sync="selected_doc_id"
						:filters="selected_filters"
						:exceptions.sync="exceptions"
					/>
				</CCol>
				
				<CCol md="10" v-else>
					<CRow>
						<CCol md="8" sm="12" >
							<CInput 
								label="Nomor"
								:value.sync="selected_doc_number"
							/>	
						</CCol>
						<CCol md="4" sm="12">
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
		label: {
			type: String,
			default: 'Sumber Informasi',
		},
		doc_options: Object,
		doc_type: String,
		doc_id: Number,
		doc_number: String,
		doc_date: String,
		saved_doc_id: Number,
	},
	computed: {
		dropdown_items() {
			let items = []
			for (const key in this.doc_options) {
				if (Object.hasOwnProperty.call(this.doc_options, key)) {
					let item = {
						'type': key, 
						'label': this.doc_options[key]['label'], 
						'state': this.doc_options[key]['state'],
					}
					items.push(item)
				}
			}
			return items
		},
		selected_doc_type: {
			get() { return this.doc_type },
			set(val) { this.$emit('update:doc_type', val) },
		},
		selected_doc_label: {
			get() { return this.doc_options[this.selected_doc_type]['label'] },
			set() { },
		},
		selected_doc_state: {
			get() { return this.doc_options[this.selected_doc_type]['state'] },
			set() { },
		},
		selected_doc_id: {
			get() { return this.doc_id },
			set(val) { this.$emit('update:doc_id', val) },
		},
		selected_doc_number: {
			get() { return this.doc_number },
			set(val) { this.$emit('update:doc_number', val) },
		},
		selected_doc_date: {
			get() { return this.doc_date },
			set(val) { this.$emit('update:doc_date', val) },
		},
		selected_filters() {
			return this.doc_options[this.selected_doc_type]['filters']
		},
		exceptions: {
			get() { return this.saved_doc_id },
			set(val) { this.$emit('update:saved_doc_id', val) },
		},
	},
	methods: {
		toggleDocType(val) {
			this.selected_doc_label = this.doc_options[val]['label']
			this.selected_doc_state = this.doc_options[val]['state']
			this.selected_doc_type = val
			this.selected_doc_id = null
			this.selected_doc_number = null
			this.selected_doc_date = null
		},
		getDataDocument() {
			let data = this.$refs.SearchDocument.getDataDocument()
			return data
		}
	},
}
</script>

<style>
#toggler-search-document > button {
	width: 100%;
}
</style>