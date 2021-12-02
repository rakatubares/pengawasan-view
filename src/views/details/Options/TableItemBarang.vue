<template>
	<div class="wrapper">
		<!-- Tabel item barang -->
		<CRow>
			<CCol>
				<MyTableData
					class="mt-3"
					:fields="fields_barang"
					:items="list_barang_table"
					:editData="editBarang"
					:deleteData="confirmDeleteBarang"
				>
					<template #header>
						<CButton 
							v-if="(state==='insert') || (state==='edit')"
							color="primary" 
							class="mr-1"
							@click="inputNewBarang()"
						>
							+ Tambah Barang
						</CButton>
						<div v-else ><b>Daftar Barang</b></div>
					</template>
				</MyTableData>
			</CCol>
		</CRow>

		<!-- Modal input item barang -->
		<MyFormItemBarang
			v-if="show_modal_barang"
			:show.sync="show_modal_barang"
			:id.sync="item_to_edit"
			:doc_type="doc_type"
			:doc_id="doc_id"
			:state.sync="item_state"
			@save-data="saveItem"
		>
		</MyFormItemBarang>

		<!-- Modal konfirmasi delete -->
		<MyModalDelete
			v-if="modal_delete_props.show"
			:type="modal_delete_props.type"
			:url.sync="modal_delete_props.url"
			@close-modal="closeModalDelete"
			@delete-data="deleteData"
		>
			<template #text>
				<span v-html="modal_delete_props.text"></span>
			</template>
		</MyModalDelete>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyModalDelete from '../../components/ModalDelete.vue'
import MyFormItemBarang from '../../details/FormItemBarang.vue'
import MyTableData from '../../components/TableData.vue'

export default {
	name: 'TableItemBarang',
	components: {
		MyModalDelete,
		MyFormItemBarang,
		MyTableData
	},
	props: {
		state: {
			type: String,
			default: 'insert'
		},
		doc_type: String,
		doc_id: Number,
		doc: Object
	},
	computed: {
		fields_barang() {
			let fields = [
				{ key: 'uraian_barang', label: 'Uraian Barang' },
				{ key: 'jumlah', label: 'Jumlah' },
			]

			if (['insert', 'edit'].includes(this.state)) {
				fields.push({ key: 'actions', label: '' })
			}

			return fields
		},
		list_barang_table() {
			let arr = this.list_barang
			let data_barang = []
			for (let idx in arr) {
				let temp_barang = {
					id: arr[idx]['id'],
					uraian_barang: arr[idx]['uraian_barang'],
					jumlah: (arr[idx]['jumlah_barang'] || '-') + ' ' + (arr[idx]['satuan_barang'] || '')
				}
				data_barang.push(temp_barang)
			}
			return data_barang
		},
	},
	data() {
		return {
			modal_delete_props: {
				type: null,
				show: false,
				url: null,
				text: null
			},
			// list_barang: [],
			list_barang: this.doc.objek.data.item,
			show_modal_barang: false,
			item_state: 'insert',
			item_to_edit: null
		}
	},
	methods: {
		async getData() {
			let data = await api.getItemBarangByDocId(this.doc_type, this.doc_id)
			this.list_barang = data
		},
		inputNewBarang() {
			this.show_modal_barang = true
			this.item_state = 'insert'
			this.item_to_edit = null
		},
		editBarang(id) {
			this.show_modal_barang = true
			this.item_state = 'edit'
			this.item_to_edit = id
		},
		saveItem() {
			this.getData()
			this.$emit('edit-item')
		},
		confirmDeleteBarang(item) {
			let API_BARANG_DETAIL_ID = process.env.VUE_APP_BASEAPI 
				+ '/' + this.doc_type 
				+ '/' + this.doc_id 
				+ '/barang/item/' + item.id
			
			let text = "Apakah Anda yakin untuk menghapus data barang " 
				+ item.uraian_barang.bold()
				+ "?"

			this.modal_delete_props.type = 'item barang'
			this.modal_delete_props.url = API_BARANG_DETAIL_ID
			this.modal_delete_props.text = text
			this.modal_delete_props.show = true
		},
		deleteData(type) {
			this.closeModalDelete()

			if (type == 'item barang') {
				this.getData()
				this.$emit('edit-item')
			} else {
				this.$emit('delete-data')
			}
		},
		closeModalDelete() {
			this.modal_delete_props.type = null
			this.modal_delete_props.url = null
			this.modal_delete_props.text = null
			this.modal_delete_props.show = false
		},
	},
	// mounted() {
	// 	this.getData()
	// }
}
</script>

<style>

</style>