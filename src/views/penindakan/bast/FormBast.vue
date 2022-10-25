<template>
	<div class="wrapper form-bast">
		<!-- Form BAST header -->
		<CForm class="pt-3">
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Dalam rangka"
						description="Alasan dilakukan serah terima"
						:value.sync="data.dalam_rangka"
						:is-valid="validatorRequired"
						invalid-feedback="Alasan penindakan wajib diisi"
					/>
				</CCol>
			</CRow>

			<!-- Pihak yang menyerahkan -->
			<CRow>
				<CCol sm="12">
					<div class="form-group">
						<label><h5>Pihak Yang Menyerahkan</h5></label>
						<CDropdown
							:togglerText.sync="txt_ddl_entity.yang_menyerahkan"
							color="primary"
							class="mt-2"
						>
							<CDropdownItem @click="toggleEntityType('pegawai', 'yang_menyerahkan')">
								Pegawai
							</CDropdownItem>
							<CDropdownItem @click="toggleEntityType('orang', 'yang_menyerahkan')">
								Non Pegawai
							</CDropdownItem>
						</CDropdown>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol>
					<MySelectPetugas
						v-if="data.yang_menyerahkan.type == 'pegawai'"
						ref="selectPetugasMenyerahkan"
						label="Nama Petugas"
						description="Nama Petugas Bea dan Cukai yang menyerahkan sarana pengangkut / barang / dokumen / orang"
						:id.sync="data.yang_menyerahkan.data.id"
						role="p2vue.penindakan"
					/>

					<MySelectEntitas
						v-if="data.yang_menyerahkan.type == 'orang'"							
						ref="selectEntitasMenyerahkan"
						label="Nama Orang"
						description="Nama Pihak yang menyerahkan sarana pengangkut / barang / dokumen / orang"
						:id.sync="data.yang_menyerahkan.data.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="10">
					<CInput
						label="Atas Nama"
						description="Nama pribadi / entitas / Kantor / Unit Kerja yang diwakili oleh pihak yang menerima sarana pengangkut / barang / dokumen / orang"
						:value.sync="data.yang_menyerahkan.atas_nama"
						:is-valid="validatorRequired"
						invalid-feedback="Atas nama yang menyerahkan wajib diisi"
					/>
				</CCol>
			</CRow>

			<!-- Pihak yang menerima -->
			<CRow>
				<CCol sm="12">
					<div class="form-group">
						<label><h5>Pihak Yang Menerima</h5></label>
						<CDropdown
							:togglerText.sync="txt_ddl_entity.yang_menerima"
							color="primary"
							class="mt-2"
						>
							<CDropdownItem @click="toggleEntityType('pegawai', 'yang_menerima')">
								Pegawai
							</CDropdownItem>
							<CDropdownItem @click="toggleEntityType('orang', 'yang_menerima')">
								Non Pegawai
							</CDropdownItem>
						</CDropdown>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol>
					<MySelectPetugas
						v-if="data.yang_menerima.type == 'pegawai'"
						ref="selectPetugasMenerima"
						label="Nama Petugas"
						description="Nama Petugas Bea dan Cukai yang menerima sarana pengangkut / barang / dokumen / orang"
						:id.sync="data.yang_menerima.data.id"
						role="p2vue.penindakan"
					/>

					<MySelectEntitas
						v-if="data.yang_menerima.type == 'orang'"
						ref="selectEntitasMenerima"
						label="Nama Orang"
						description="Nama Pihak yang menerima sarana pengangkut / barang / dokumen / orang"
						:id.sync="data.yang_menerima.data.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="10">
					<CInput
						label="Atas Nama"
						description="Nama pribadi / entitas / Kantor / Unit Kerja yang diwakili oleh pihak yang menyerahkan sarana pengangkut / barang / dokumen / orang"
						:value.sync="data.yang_menerima.atas_nama"
						:is-valid="validatorRequired"
						invalid-feedback="Atas nama yang menerima wajib diisi"
					/>
				</CCol>
			</CRow>

			<!-- Button simpan -->
			<CRow>
				<CCol sm="12">
					<CButton
						color="success"
						@click="saveData()"
					>
						Simpan
					</CButton>
				</CCol>
			</CRow>
		</CForm>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import validators from '../../../helpers/validator.js'

const data_default = {
	dalam_rangka: null,
	yang_menyerahkan: {
		type: 'pegawai',
		data: {id: null}
	},
	yang_menerima: {
		type: 'pegawai',
		data: {id: null}
	},
}

export default {
	name: 'FormBast',
	components: {
		MyAlert,
		MySelectPetugas,
		MySelectEntitas,
	},
	props: {
		state: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(data_default)),
			txt_ddl_entity: {
				yang_menerima: 'Pegawai',
				yang_menyerahkan: 'Pegawai'
			},
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById('bast', this.doc_id)
			this.data = response.data.data

			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			// Show entitas yg menyerahkan
			if (this.data.yang_menyerahkan.type == 'pegawai') {
				this.data.yang_menyerahkan.data.id = this.data.yang_menyerahkan.data.user_id
				this.$refs.selectPetugasMenyerahkan.getPetugas(this.data.yang_menyerahkan.data.id, true)
			} else {
				this.toggleEntityType('orang', 'yang_menyerahkan')
				this.$refs.selectEntitasMenyerahkan.getEntitas(this.data.yang_menyerahkan.data.id, true)
			}

			// Show entitas yg menerima
			if (this.data.yang_menerima.type == 'pegawai') {
				this.data.yang_menerima.data.id = this.data.yang_menerima.data.user_id
				this.$refs.selectPetugasMenerima.getPetugas(this.data.yang_menerima.data.id, true)
			} else {
				this.toggleEntityType('orang', 'yang_menerima')
				this.$refs.selectEntitasMenerima.getEntitas(this.data.yang_menerima.data.id, true)
			}
		},
		toggleEntityType(type, position) {
			switch (type) {
				case 'pegawai':
					this.txt_ddl_entity[position] = 'Pegawai'
					if (this.data[position]['type'] != 'pegawai') {
						this.data[position]['data']['id'] = null
					}
					break;

				case 'orang':
					this.txt_ddl_entity[position] = 'Non Pegawai'
					if (this.data[position]['type'] != 'orang') {
						this.data[position]['data']['id'] = null
					}
					break;
			
				default:
					break;
			}

			this.data[position]['type'] = type
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc('bast', this.data)

					if (this.data.yang_menerima.type == 'pegawai') {
						this.data.yang_menerima.data.id = this.data.yang_menerima.data.user_id
					}
					if (this.data.yang_menyerahkan.type == 'pegawai') {
						this.data.yang_menyerahkan.data.id = this.data.yang_menyerahkan.data.user_id
					}

					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert('Data BAST berhasil disimpan')
				} catch (error) {
					console.log('form bast - save data - error', error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc('bast', this.data.id, this.data)
					this.$emit('submit-data')
					this.alert('Data BAST berhasil diubah')
				} catch (error) {
					console.log('form bast - update data - error', error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>
.form-bast .row+.row {
	margin-top:0;
}

.form-bast .v-text-field__details {
	display: none;
}
</style>