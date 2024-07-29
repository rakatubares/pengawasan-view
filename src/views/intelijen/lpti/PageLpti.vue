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
                <MyModalLpti
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
import MyModalLpti from './ModalLpti.vue'
import MyPageDoc from '../../components/PageDoc.vue'


export default {
    name: 'PageLpti',
    components: {
        MyModalLpti,
        MyPageDoc,
    },
    props: {
        doc_type: {
            type: String,
            default: 'lpti'
        },
        doc_name: {
            type: String,
            default: 'LPT-I'
        },
        permission_to_create: {
            type: String,
            default: 'create-lpti'
        },
        permission_to_update: {
            type: String,
            default: 'create-lpti'
        },
        permission_to_delete: {
            type: String,
            default: 'delete-lpti'
        },
        permission_to_rollback: {
            type: String,
            default: 'rollback-lpti'
        },
    },
    data() {
        return {
            table_title: `Daftar ${this.doc_name}`,
            table_fields: [
                { key: 'no_dok_lengkap', label: `No ${this.doc_name}` },
                { key: 'tanggal_dokumen', label: `Tgl ${this.doc_name}` },
                { key: 'sti', label: `ST-I` },
            ],
            custom_fields: ['sti'],
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
                    sti: item.no_sti + '</br>' + item.tgl_sti,
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
                + " atas ST-I " + item.no_sti.bold()
                + " tanggal " + item.tgl_sti.bold()
                + "?"
            return text
        }
    },
}
</script>