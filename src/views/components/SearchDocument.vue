<template>
	<div class="wrapper">
		<CForm>
			<CRow>
				<CCol md="8" sm="12">
					<div class="form-group">
						<label>Nomor {{ label }}</label>
						<v-autocomplete
							class="no-message"
							v-model="doc_id"
							outlined
							dense
							:items.sync="items"
							:search-input.sync="search_input"
							item-text="no_dok_lengkap"
							item-value="id"
							@change="changeValue"
							@click="searchDocument"
							@keyup="searchDocument"
						>
							<template v-slot:no-data>
								<v-list-item>
									<v-list-item-title>
										Data tidak ditemukan
									</v-list-item-title>
								</v-list-item>
							</template>
							<template v-slot:item="{ item }">
								<v-list-item-content>
									<h3><v-list-item-title>{{ item.no_dok_lengkap }}</v-list-item-title></h3>
									<v-list-item-subtitle>{{ item.tanggal_dokumen }}</v-list-item-subtitle>
								</v-list-item-content>
							</template>
						</v-autocomplete>
						<small 
							v-if="description != null"
							class="form-text text-muted w-100"
						>
							{{ description }}
						</small>
					</div>
				</CCol>
				<CCol md="4" sm="12">
					<CInput
						:label="`Tanggal ${label}`"
						:value.sync="tanggal_dokumen"
						disabled
					/>
				</CCol>
			</CRow>
		</CForm>
	</div>
</template>

<script>
import api from '../../router/api2'

export default {
	name: 'SearchDocument',
	props: {
		value: {
			type: Number,
			default: null,
		},
		doc_type: String,
		label: {
			type: String,
			default: '',
		},
		description: String,
		filters: {
			type: Object,
			default: {'status_tindak_lanjut': false},
		},
		exceptions: {
			type: Number,
			default: null,
		}
	},
	data() {
		return {
			items: [],
			search_input: '',
			tanggal_dokumen: null,
			selected_document: null,
		}
	},
	computed: {
		doc_id: { 
			get() { return this.value },
			set(val) { return val },
		}
	},
	watch: {
		doc_id(val) {
			this.getDocument(val)
		}
	},
	methods: {
		async searchDocument() {
			let data = {
				'src': this.search_input, 
				'flt': this.filters,
				'exc': this.exceptions,
			}
			let responses = await api.searchDoc(this.doc_type, data)
			this.items = responses.data.data
		},
		async changeValue(id) {
			if (id != null) {
				await this.getDocument(id)
			} else {
				this.tanggal_dokumen = null
			}

			this.$emit('update:value', id)
		},
		async getDocument(id) {
			let response = await api.getDocumentById(this.doc_type, id)
			let data_dokumen = response.data
			this.tanggal_dokumen = data_dokumen.tanggal_dokumen
			this.items = [data_dokumen]
			this.selected_document = data_dokumen
		},
		getDataDocument() {
			let data = this.selected_document
			return data
		}
	},
	mounted() {
		if (this.doc_id != null) {
			this.getDocument(this.doc_id)
		}
	}
}
</script>

<style>

</style>