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
					:value.sync="sbp.penindakan.tanggal_penindakan"
					disabled
				>
				</CInput>
			</CCol>
			<CCol sm="12" v-if="show.jenis_pelanggaran">
				<CInput
					label="Jenis Pelanggaran"
					:value.sync="sbp.jenis_pelanggaran"
					disabled
				/>
			</CCol>
			<CCol sm="12" v-if="show.uraian_penindakan">
				<CTextarea
					label="Uraian Penindakan"
					:value.sync="sbp.uraian_penindakan"
					disabled
				/>
			</CCol>
			<CCol sm="12" v-if="show.alasan_penindakan">
				<CTextarea
					label="Alasan Penindakan"
					:value.sync="sbp.alasan_penindakan"
					disabled
				/>
			</CCol>
			<CCol sm="12" v-if="show.hal_terjadi">
				<CTextarea
					label="Hal yang Terjadi"
					:value.sync="sbp.hal_terjadi"
					disabled
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'

const default_data = {
	id: null,
	no_dok_lengkap: null,
	penindakan: {tanggal_penindakan: null}
}

const default_show = {
	jenis_pelanggaran: false,
	uraian_penindakan: false,
	alasan_penindakan: false,
	hal_terjadi: false
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
		show_elements: Array
	},
	data() {
		return {
			items: [],
			value: null,
			search: null,
			exception: null,
			sbp: JSON.parse(JSON.stringify(default_data)),
			show: JSON.parse(JSON.stringify(default_show)),
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
				this.sbp = JSON.parse(JSON.stringify(responses.data.data))
				this.exception = this.sbp.id
				if (mounted == true) {
					this.items = [this.sbp]
					this.value = this.items[0]
				}
			} else {
				this.sbp = JSON.parse(JSON.stringify(default_data))
			}
		},
		checkShow() {
			if (this.show_elements != null) {
				this.show_elements.forEach(element => {
					this.show[element] = true
				});
			}
		}
	},
	watch: {
		async search (val) {
			let data = {'src': val, 'flt': this.filter, 'exc': this.exception}
			let responses = await api.searchDoc(this.sbp_type, data)
			this.items = responses.data.data
		},
	},
	mounted() {
		this.checkShow()
	}
}
</script>

<style>

</style>