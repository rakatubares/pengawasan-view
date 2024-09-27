<template>
    <CCard>
        <CCardHeader>
            <slot name="header">
                <CIcon name="cil-grid"/> {{caption}}
            </slot>
        </CCardHeader>
        <CCardBody>
            <CDataTable
                :hover="hover"
                :striped="striped"
                :border="border"
                :small="small"
                :fixed="fixed"
                :items="filteredItems"
                :fields.sync="fields"
                :items-per-page="small ? 10 : 5"
                :dark="dark"
                columnFilter
                pagination
            >
                <template v-for="field in custom_fields" v-slot:[field]="slotProps">
                    <slot :name="field">
                        <td :key="`${field} ${slotProps.item.id}`" v-html="slotProps.item[field]">
                        </td>
                    </slot>
                </template>

                <template #conceptor="{item}">
                    <td>{{item.creator_name}}</td>
                </template>

                <template #status="{item}">
                    <td>
                        <CBadge :color="item.status_color">{{item.status}}</CBadge>
                    </td>
                </template>
                
                <template #actions="{item}">
                    <slot name="buttons">
                        <td>
                            <CButton 
                                v-if="getButton('show', item)"
                                class="m-1"
                                size="sm" 
                                color="primary"
                                v-c-tooltip.hover="{content: `Lihat`}"
                                @click="showData(item.id)"
                            >
                                <CIcon name="cil-description" height="24px"/>
                            </CButton>
                            <CButton 
                                v-if="getButton('edit', item)"
                                class="m-1"
                                size="sm" 
                                color="success"
                                v-c-tooltip.hover="{content: `Edit`}"
                                @click="editData(item.id)"
                            >
                                <CIcon name="cil-pencil" height="24px"/>
                            </CButton>
                            <CButton 
                                v-if="getButton('delete', item)"
                                class="m-1"
                                size="sm" 
                                color="danger"
                                v-c-tooltip.hover="{content: `Hapus`}"
                                @click="deleteData(item)"
                            >
                                <CIcon name="cil-trash" height="24px"/>
                            </CButton>
                        </td>
                    </slot>
                </template>
            </CDataTable>
        </CCardBody>
    </CCard>
</template>

<script>
import Store from '../../store'
import permission from '../../helpers/permission'

export default {
    name: 'Table',
    props: {
        items: Array,
        fields: Array,
        custom_fields: Array,
        caption: {
            type: String,
            default: 'Table'
        },
        hover: Boolean,
        striped: Boolean,
        border: Boolean,
        small: Boolean,
        fixed: Boolean,
        dark: Boolean,
        editData: Function,
        deleteData: Function,
        showData: Function,
        permission_to_update: String,
        permission_to_delete: String,
    },
    computed: {
        filteredItems() {
            return this.items.filter(item => {
                if (this.filtered_status != null) {
                    const status = item.status.short_status
                    return status == this.filtered_status
                } else {
                    return true
                }
            })
        }
    },
    data() {
        return {
            filtered_status: null,
            mutable_status_options: []
        }
    },
    methods: {
        constructFields() {
            let field_keys = this.fields.map(function(field) {return field.key})
            
            if (!field_keys.includes('conceptor')) {
                this.fields.push({ key: 'conceptor', label: 'Konseptor' })
            }
            if (!field_keys.includes('status')) {
                this.fields.push({ key: 'status', label: 'Status' })
            }
            if (!field_keys.includes('actions')) {
                this.fields.push({ key: 'actions', label: '' , filter: false})
            }
        },
        getButton(type, item) {
            let btn = false
            let user = Store.getters.userInfo

            let editable = ['draft', 'booking-nomor', 'rollback'].includes(item.status_dokumen)
            let deleteable = ['draft'].includes(item.status_dokumen)

            let match_user = user.nip == item.creator_id
            let allowed_to_update = permission.checkPermission(this.permission_to_update)
            let allowed_to_delete = permission.checkPermission(this.permission_to_delete)

            if (type == 'edit') {
                if (editable && match_user && allowed_to_update) {
                    btn = true
                }
            } else if (type == 'delete') {
                if (deleteable && match_user && allowed_to_delete) {
                    btn = true
                }
            } else if (type == 'show') {
                if (!editable || !match_user || !allowed_to_update) {
                    btn = true
                }
            }

            return btn
        }
    },
    mounted() {
        this.constructFields()
    }
}
</script>

<style>
.table-sm select {
    height: calc(1.5em + 0.5rem)
}
</style>