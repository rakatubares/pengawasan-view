<template>
	<div class="wrapper">
		<CRow>
			<CCol>
				<CCard>
					<CCardHeader>
						<CButton 
							v-if="(state==='insert') || (state==='edit')"
							color="primary" 
							class="mr-1"
							@click="insertData()"
						>
							+ Tambah Informasi
						</CButton>
						<div v-else ><b>Daftar Ikhtisar</b></div>
					</CCardHeader>
					<CCardBody>
						<CDataTable
							v-if="show_table"
							:items="list_informasi_table"
							:fields="fields"
							:items-per-page="5"
							pagination
						>
							<template #actions="{item}">
								<slot name="buttons">
									<td>
										<CButton 
											class="m-1"
											size="sm" 
											color="success"
											@click="editData(item)"
										>
											Edit
										</CButton>
										<CButton 
											class="m-1"
											size="sm" 
											color="danger"
											@click="confirmDeleteData(item)"
										>
											Hapus
										</CButton>
									</td>
								</slot>
							</template>
						</CDataTable>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>

		<MyFormInformasi
			ref='form_informasi'
			@save-data="saveInformasi"
		/>

		<MyModalDeleteInformasi
			ref='modal_delete_informasi'
			@delete-data="deleteData"
		/>
	</div>
</template>

<script>
import MyFormInformasi from './FormInformasi.vue'
import MyModalDeleteInformasi from './ModalDeleteInformasi.vue'

const show_fields = [
	{ key: 'informasi', label: 'Ikhtisar Informasi', _style: 'min-width:300px' },
	{ key: 'kode_kepercayaan', label: 'Sumber' },
	{ key: 'kode_validitas', label: 'Validitas' },
]

const edit_fields = show_fields.concat({ key: 'actions', label: '', _style: 'min-width:150px' })

export default {
	name: 'TableIkhtisar',
	components: {
		MyFormInformasi,
		MyModalDeleteInformasi
	},
	props: {
		state: String,
		data_ikhtisar: Array,
	},
	data() {
		return {
			list_informasi: this.data_ikhtisar,
			list_informasi_table: [],
			fields: JSON.parse(JSON.stringify(show_fields)),
			show_table: true,
		}
	},
	watch: {
		data_ikhtisar(val) {
			this.list_informasi = val
			this.prepareTableData()
		},
		state() {
			this.chooseField()
		}
	},
	methods: {
		chooseField() {
			if (['insert', 'edit'].includes(this.state)) {
				this.fields = JSON.parse(JSON.stringify(edit_fields))
			} else {
				this.fields = JSON.parse(JSON.stringify(show_fields))
			}
		},
		insertData() {
			this.$refs.form_informasi.showModal('insert')
		},
		editData(item) {
			let {index, ...value} = item;
			let data = {
				index: index,
				value: value
			}
			this.$refs.form_informasi.showModal('edit', data)
		},
		saveInformasi(val) {
			if (val.index == null) {
				if (this.list_informasi == null) {
					this.list_informasi = [val.value]
					this.$refs.form_informasi.update_index(0)
				} else {
					this.list_informasi.push(val.value)
					let list_length = this.list_informasi.length
					this.$refs.form_informasi.update_index(list_length - 1)
				}
			} else {
				this.list_informasi[val.index] = val.value
			}

			// refresh table
			this.prepareTableData()

			// emit to parent component
			this.$emit('update-data', this.list_informasi)
		},
		prepareTableData() {
			if (this.list_informasi != undefined) {
				this.list_informasi_table = []
				for (const i in this.list_informasi) {
					let item = this.list_informasi[i]
					item['index'] = i
					item['kode_validitas'] = item['kode_validitas'].toString()
					this.list_informasi_table.push(item)
				}

				// Reset table (workaround for update data display)
				this.show_table = false
				this.$nextTick(function() {
					this.show_table = true
				})
			}
		},
		confirmDeleteData(item) {
			this.$refs.modal_delete_informasi.showModal(item)
		},
		deleteData(idx) {
			this.list_informasi.splice(idx, 1)
			
			// refresh table
			this.prepareTableData()

			// emit to parent component
			this.$emit('update-data', this.list_informasi)
		},
	},
	mounted() {
		this.chooseField()
	}
}
</script>

<style>

</style>