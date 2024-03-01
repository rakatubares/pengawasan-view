<template>
	<div class="wrapper">
		<CForm v-if="show">
			<CRow>
				<CCol md="8" sm="12">
					<div class="form-group">
						<label>{{ label }}</label>
						<v-autocomplete
							class="no-rounded rounded-left no-message"
							v-model="selected_entity_id"
							outlined
							dense
							@update:search-input="searchData"
							:items.sync="entity_options"
							item-text="nama"
							item-value="id"
						>
							<template v-slot:append-outer>
								<CButton 
									v-if="editable"
									class="button-input no-rounded"
									color="primary"
									v-c-tooltip.hover="{content: 'Edit Entitas'}"
									@click="updateEntitas"	
								>
								
									<CIcon class="m-0" name="cil-pencil"/>
								</CButton>
								<CButton 
									class="button-input no-rounded rounded-right"
									color="success"
									v-c-tooltip.hover="{content: 'Entitas Baru'}"
									@click="insertEntitas"	
								>
									<CIcon class="m-0" name="cil-user-follow"/>
								</CButton>
							</template>
							<template v-slot:no-data>
								<v-list-item>
									<v-list-item-title>
										Data entitas tidak ditemukan
									</v-list-item-title>
								</v-list-item>
							</template>
							<template v-slot:item="{ item }">
								<v-list-item-content>
									<v-list-item-title>{{ item.nama }}</v-list-item-title>
									<v-list-item-subtitle>{{ `${item.jenis_identitas} ${item.nomor_identitas}` }}</v-list-item-subtitle>
								</v-list-item-content>
							</template>
						</v-autocomplete>
						<small class="form-text text-muted w-100">{{ description }}</small>
					</div>
				</CCol>
				<CCol  md="1" sm="0">
					<slot name="button"></slot>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="5">
					<CInput
						label="Jenis Identitas"
						:value.sync="entitas.jenis_identitas"
						disabled
					/>
				</CCol>
				<CCol md="5" sm="7">
					<CInput
						label="Nomor Identitas"
						:value.sync="entitas.nomor_identitas"
						disabled
					/>
				</CCol>
			</CRow>
			<CRow v-if="showTanggalLahir">
				<CCol md="4">
					<CInput
						label="Tanggal Lahir"
						:value.sync="entitas.tanggal_lahir"
						disabled
					/>
				</CCol>
			</CRow>
			<CRow v-if="showWargaNegara">
				<CCol md="6">
					<CInput
						label="Kewarganegaraan"
						:value.sync="entitas.warga_negara.nama_negara"
						disabled
					/>
				</CCol>
			</CRow>
			<CRow v-if="showPekerjaan">
				<CCol md="6">
					<CInput
						label="Pekerjaan"
						:value.sync="entitas.pekerjaan"
						disabled
					/>
				</CCol>
			</CRow>
			<CRow v-if="showAlamat">
				<CCol md="12">
					<CTextarea
						label="Alamat Identitas"
						:value.sync="entitas.alamat_identitas"
						disabled
					/>
				</CCol>
			</CRow>
		</CForm>

		<MyModalEntitasOrang
			ref="modal_entitas_orang"
			:show.sync="show_modal"
			@save="savedData"	
		/>
	</div>
</template>

<script>
import api from '../../router/api2.js'
import MyModalEntitasOrang from './ModalEntitasOrang.vue'
import MySelectNegara from './SelectNegara.vue'

const default_entitas = {
	nama: null,
	jenis_identitas: null,
	nomor_identitas: null,
	tanggal_lahir: null,
	jenis_kelamin: {kode: null, uraian: null},
	warga_negara: {kode_2: null, nama_negara: null},
	pekerjan: null,
	alamat_identitas: null,
}

export default {
	name: 'SelectEntitasOrang',
	components: {
		MyModalEntitasOrang,
		MySelectNegara,
	},
	props: {
		state: String,
		entity_id: Number,
		label: String,
		description: String,
		priority_id: {
			type: String,
			default: 'NPWP',
		},
		showTanggalLahir: {
			type: Boolean,
			default: false
		},
		showWargaNegara: {
			type: Boolean,
			default: false
		},
		showPekerjaan: {
			type: Boolean,
			default: false
		},
		showAlamat: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			show: true,
			entity_options: [],
			selected_entity_id: null,
			search: null,
			entitas: JSON.parse(JSON.stringify(default_entitas)),
			show_modal: false,
			editable: false,
		}
	},
	watch: {
		entity_id(val) {
			this.selected_entity_id = val
		},
		async selected_entity_id(val) {
			this.$emit('update:entity_id', val)
			await this.showData(val)
		}
	},
	methods: {
		async searchData(val) {
			if (val != null) {
				if (val != '') {
					let data = {'search': val}
					let response = await api.searchEntitasOrang(data)
					this.entity_options = await this.constructOptions(response.data)
				} else {
					this.entity_options = []
				}
			}
		},
		async constructOptions(search_result) {
			let entity_options = []
			this.priority_id
			search_result.forEach(async entity => {
				let selected_identity = await this.getPriorityIdentity(entity.identitas)

				// Construct option then push it to list
				let entity_option = {
					id: entity.id,
					nama: entity.nama,
					jenis_identitas: selected_identity.jenis,
					nomor_identitas: selected_identity.nomor,
				}
				entity_options.push(entity_option)
			});

			return entity_options
		},
		async getPriorityIdentity(identities) {
			let selected_identity = {jenis: '', nomor: '-'}

			if (identities != undefined) {
				// Filter identity based on priority
				let priority_identity = identities.filter(function (identity) {
					if (identity.jenis == this.priority_id) {
						return identity
					}
				}.bind(this))

				// Choose first identity if priority identity not available
				if (priority_identity.length > 0) {
					selected_identity.jenis = priority_identity[0].jenis
					selected_identity.nomor = priority_identity[0].nomor
				} else if (identities.length > 0) {
					selected_identity.jenis = identities[0].jenis
					selected_identity.nomor = identities[0].nomor
				}	
			}

			return selected_identity
		},
		async showData(entity_id) {
			if (entity_id != null) {
				let entity = await this.getEntitas(entity_id)
				this.entitas = entity

				let selected_identity = await this.getPriorityIdentity(entity.identitas)
				this.entitas.jenis_identitas = selected_identity.jenis
				this.entitas.nomor_identitas = selected_identity.nomor

				this.entitas.jenis_kelamin = entity.jenis_kelamin != null 
					? entity.jenis_kelamin 
					: JSON.parse(JSON.stringify(default_entitas.jenis_kelamin))
				this.entitas.warga_negara = entity.warga_negara != null 
					? entity.warga_negara 
					: JSON.parse(JSON.stringify(default_entitas.warga_negara))

				if (this.entity_options.length == 0) {
					this.entity_options = await this.constructOptions([entity])	
				}
				
			} else {
				this.entitas = JSON.parse(JSON.stringify(default_entitas))
			}

			// Refresh form
			this.show = false
			this.$nextTick(function () {
				this.show = true
			})
		},
		async getEntitas(id) {
			let response = await api.getEntitasOrang(id)
			this.editable = true
			return response.data
		},
		insertEntitas() {
			this.$refs.modal_entitas_orang.showModal('insert')
		},
		updateEntitas() {
			this.$refs.modal_entitas_orang.showModal('update', this.entitas.id)
		},
		async savedData(state, entitas) {
			if (state == 'update') {
				this.showData(entitas.id)
			} else {
				this.entity_options = await this.constructOptions([entitas])
				this.selected_entity_id = entitas.id	
			}
		},
	},
	mounted() {
		if (this.entity_id != null) {
			this.selected_entity_id = this.entity_id
		}
	}
}
</script>

<style>
</style>