<template>
	<div class="wrapper">
		<CRow>
			<CCol md="8" sm="12">
				<div class="form-group">
					<label>{{`Nomor ${tipe_surat_sbp}`}}</label>
					<v-autocomplete
						v-model="value"
						outlined
						dense
						:items.sync="items"
						:search-input.sync="search"
						item-text="no_dok_lengkap"
						item-value="id"
						@change="changeValue"
					>
						<template v-slot:no-data>
							<v-list-item>
								<v-list-item-title>
									{{`Data ${tipe_surat_sbp} tidak ditemukan`}}
								</v-list-item-title>
							</v-list-item>
						</template>
						<template v-slot:item="{ item }">
							<v-list-item-content>
								<v-list-item-title v-text="item.no_dok_lengkap"></v-list-item-title>
								<v-list-item-subtitle v-text="item.tanggal_dokumen"></v-list-item-subtitle>
							</v-list-item-content>
						</template>
					</v-autocomplete>
				</div>
			</CCol>
			<CCol md="3" sm="12">
				<CInput
					:label="`Tanggal ${tipe_surat_sbp}`"
					:value.sync="sbp.tanggal_dokumen"
					disabled
				>
				</CInput>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'

const default_data = {
	id: null,
	no_dok_lengkap: null,
	tanggal_dokumen: null
}

export default {
	name: 'SelectSbp',
	props: {
		sbp_type: {
			type: String,
			default: 'sbp'
		},
		tipe_surat_sbp: {
			type: String,
			default: 'SBP'
		},
		id: Number,
		filter: Object,
	},
	data() {
		return {
			items: [],
			value: null,
			search: null,
			exception: null,
			sbp: JSON.parse(JSON.stringify(default_data))
		}
	},
	methods: {
		changeValue(id, mounted=false) {
			this.getData(id, mounted)
			this.$emit('update:id', id)
		},
		async getData(id, mounted=false) {
			if (id != null) {
				let responses = await api.getDisplayDataById(this.sbp_type, id)
				this.sbp = {
					id: responses.data.data.id,
					no_dok_lengkap: responses.data.data.no_dok_lengkap,
					tanggal_dokumen: responses.data.data.penindakan.tanggal_penindakan
				}
				this.exception = this.sbp.id
				if (mounted == true) {
					this.items = [this.sbp]
					this.value = this.items[0]
				}
			} else {
				this.sbp = JSON.parse(JSON.stringify(default_data))
			}
		},
	},
	watch: {
		async search (val) {
			let data = {'src': val, 'flt': this.filter, 'exc': this.exception}
			let responses = await api.searchDoc(this.sbp_type, data)
			this.items = responses.data.data
		},
	},
}
</script>

<style>

</style>