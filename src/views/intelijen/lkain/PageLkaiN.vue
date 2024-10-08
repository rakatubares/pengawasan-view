<template>
    <div class="wrapper">
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
                <MyModalLkaiN
                    v-if="modal_data_props.show"
                    :state.sync="modal_data_props.state"
                    :doc_type="doc_type"
                    :id.sync="modal_data_props.doc_id"
                    :kode_lppi="kode_lppi"
                    :label_lkai="label_lkai"
                    :label_lppi="label_lppi"
                    :label_lpti="label_lpti"
                    :label_npi="label_npi"
                    :label_nhi="label_nhi"
                    :label_ni="label_ni"
                    :default_pejabat="default_pejabat"
                    :permission_to_rollback="permission_to_rollback"
                    @close-modal="closeModal"
                />
            </template>
        </MyPageDoc>
    </div>
</template>

<script>
import MyModalLkaiN from './ModalLkaiN.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
    name: 'PageLkaiN',
    components: {
        MyModalLkaiN,
        MyPageDoc,
    },
    props: {
        doc_type: {
            type: String,
            default: 'lkain'
        },
        kode_lppi: {
            type: String,
            default: 'lppin'
        },
        label_lkai: {
            type: String,
            default: 'LKAI-N'
        },
        label_lppi: {
            type: String,
            default: 'LPPI-N'
        },
        label_lpti: {
            type: String,
            default: 'LPTI-N'
        },
        label_npi: {
            type: String,
            default: 'NPI-N'
        },
        label_nhi: {
            type: String,
            default: 'NHI-N'
        },
        label_ni: {
            type: String,
            default: 'NI-N'
        },
        default_pejabat: {
            type: String,
            default: 'bd.0502'
        },
        permission_to_create: {
            type: String,
            default: 'create-lkain'
        },
        permission_to_update: {
            type: String,
            default: 'create-lkain'
        },
        permission_to_delete: {
            type: String,
            default: 'delete-lkain'
        },
        permission_to_rollback: {
            type: String,
            default: 'rollback-lkain'
        },
    },
    data() {
        return {
            table_title: `Daftar ${this.label_lkai}`,
            table_fields: [
                { key: 'no_dok_lengkap', label: `No ${this.label_lkai}` },
                { key: 'tanggal_dokumen', label: `Tgl ${this.label_lkai}` },
                { key: 'lppi', label: this.label_lppi },
                { key: 'analis', label: 'Analis' },
            ],
            custom_fields: ['lppi'],
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
                    lppi: item.no_lppi + '</br>' + item.tgl_lppi,
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
                + "?"
            return text
        }
    },
}
</script>
