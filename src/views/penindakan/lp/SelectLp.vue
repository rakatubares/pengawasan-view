<template>
	<div class="wrapper">
		<CRow>
			<CCol md="8" sm="12">
				<div class="form-group">
					<label>{{`Nomor ${tipe_surat_lp}`}}</label>
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
									{{`Data ${tipe_surat_lp} tidak ditemukan`}}
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
					:label="`Tanggal ${tipe_surat_lp}`"
					:value.sync="lp.tanggal_dokumen"
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
	penindakan: {tanggal_penindakan: null}
}

export default {
	name: 'SelectLp',
	props: {
		lp_type: {
			type: String,
			default: 'lp'
		},
		id: Number,
		show_elements: Array
	},
	data() {
		return {
			items: [],
			value: null,
			search: null,
			exception: null,
			lp: JSON.parse(JSON.stringify(default_data)),
		}
	},
	computed: {
		tipe_surat_lp() {
			let tipe_surat = ''
			switch (this.sbp_type) {
				case 'lp':
					tipe_surat = 'LP'
					break;
			
				case 'lpn':
					tipe_surat = 'LP-N'
					break;

				default:
					break;
			}

			return tipe_surat
		}
	},
	methods: {
		changeValue(id, mounted=false) {
			this.getData(id, mounted)
			this.$emit('update:id', id)
		},
		async getData(id, mounted=false) {
			if (id != null) {
				let responses = await api.getDisplayDataById(this.lp_type, id)
				this.lp = JSON.parse(JSON.stringify(responses.data.data))
				this.exception = this.lp.id
			} else {
				this.lp = JSON.parse(JSON.stringify(default_data))
			}

			if (mounted == true) {
				this.items = [this.lp]
				this.value = this.items[0]
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
			let data = {'src': val, 'flt': {'kode_status': 200}, 'exc': this.exception}
			let responses = await api.searchDoc(this.lp_type, data)
			this.items = responses.data.data
		},
	},
	mounted() {
		this.checkShow()
	},
}
</script>

<style>

</style>