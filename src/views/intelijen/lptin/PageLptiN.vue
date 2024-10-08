<template>
    <div class="wrapper" data-app>
        <MyPageDoc 
            ref="page_doc"
            :doc_type="doc_type"
            :table_title="table_title"
            :table_fields="table_fields"
            :custom_fields="custom_fields"
            :compute_list="computeList"
            :modal_data_props.sync="modal_data_props"
            :construct_delete_text="constructDeleteText"
            :permission_to_create="permission_to_create"
            :permission_to_update="permission_to_update"
            :permission_to_delete="permission_to_delete"
        >
            <template #modal-data>
                <MyModalLptiN
                    v-if="modal_data_props.show"
                    :state.sync="modal_data_props.state"
                    :doc_type="doc_type"
                    :doc_name="doc_name"
                    :id.sync="modal_data_props.doc_id"
                    :permission_to_rollback="permission_to_rollback"
                    @close-modal="closeModal"
                />
            </template>
        </MyPageDoc>
    </div>
</template>

<script>
import MyModalLptiN from './ModalLptiN.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
    name: 'PageLptiN',
    components: {
		MyModalLptiN,
        MyPageDoc,
    },
    props: {
        doc_type: {
            type: String,
            default: 'lptin'
        },
        doc_name: {
            type: String,
            default: 'LPT NPP'
        },
        permission_to_create: {
            type: String,
            default: 'create-lptin'
        },
        permission_to_update: {
            type: String,
            default: 'create-lptin'
        },
        permission_to_delete: {
            type: String,
            default: 'delete-lptin'
        },
        permission_to_rollback: {
            type: String,
            default: 'rollback-lptin'
        },
    },
    data() {
        return {
            table_title: `Daftar ${this.doc_name}`,
            table_fields: [
                { key: 'no_dok_lengkap', label: `No ${this.doc_name}` },
                { key: 'tanggal_dokumen', label: `Tgl ${this.doc_name}` },
                { key: 'st', label: `ST` },
            ],
            custom_fields: ['st'],
            modal_data_props: {
                show: false,
                state: null,
                doc_id: null
            },
        }
    },
    methods: {
        computeList(list) {
            return list.map(item => {
                return {
                    ...item,
                    st: item.nomor_st + '</br>' + item.tanggal_st,
                }
            })
        },
        closeModal() {
            this.$refs.page_doc.getDataTable()
            this.modal_data_props.state = null
            this.modal_data_props.doc_id = null
            this.modal_data_props.show = false
        },
        constructDeleteText(item) {
            let text = "Apakah Anda yakin untuk menghapus data " 
                + item.no_dok_lengkap.bold() 
                + " atas ST " + item.nomor_st.bold()
                + " tanggal " + item.tanggal_st.bold()
                + "?"
            return text
        }
    },
}
</script>
