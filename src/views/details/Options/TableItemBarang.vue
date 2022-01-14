<template>
	<div class="wrapper">
		<!-- Tabel item barang -->
		<CRow>
			<CCol>
				<MyTableData
					class="mt-3"
					:fields="fields_barang"
					:items.sync="list_barang_table"
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
			@submit-data="saveItem"
		>
		</MyFormItemBarang>

		<!-- Modal konfirmasi delete -->
		<MyModalDelete
			v-if="modal_delete_props.show"
			target="item"
			:doc_type="doc_type"
			:doc_id="doc_id"
			:item_id="modal_delete_props.item_id"
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
import MyFormItemBarang from './FormItemBarang.vue'
import MyTableData from '../../components/TableData.vue'

export default {
	name: 'TableItemBarang',
	components: {
		MyModalDelete,
		MyFormItemBarang,
		MyTableData
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
		data_objek: Object
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
			list_barang: this.data_objek.item,
			show_modal_barang: false,
			item_state: 'insert',
			item_to_edit: null
		}
	},
	methods: {
		async getData() {
			let response = await api.getObjek(this.doc_type, this.doc_id)
			this.list_barang = response.data.item
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
			this.$emit('submit-data')
		},
		confirmDeleteBarang(item) {
			let text = "Apakah Anda yakin untuk menghapus data barang " 
				+ item.uraian_barang.bold()
				+ "?"

			this.modal_delete_props.text = text
			this.modal_delete_props.item_id = item.id
			this.modal_delete_props.show = true
		},
		deleteData(type) {
			this.getData()
			this.closeModalDelete()
		},
		closeModalDelete() {
			this.modal_delete_props.type = null
			this.modal_delete_props.url = null
			this.modal_delete_props.text = null
			this.modal_delete_props.show = false
		},
	},
	mounted() {
		this.getData()
	}
}
</script>

<style>

</style>