<template>
    <MyPageLppi
        :doc_type="doc_type"
        :doc_name="doc_name"
        :tipe_lpti="tipe_lpti"
        :label_lpti="label_lpti"
        :default_jabatan="default_jabatan"
        :permission_to_create="permission_to_create"
        :permission_to_update="permission_to_update"
        :permission_to_delete="permission_to_delete"
    />
</template>

<script>
import MyPageLppi from './PageLppi.vue'

export default {
    name: 'PageLppiN',
    components: {
        MyPageLppi
    },
    data() {
        return {
            doc_type: 'lppin',
            doc_name: 'LPPI-N',
            tipe_lpti: 'lptin',
            label_lpti: 'LPT-N',
            default_jabatan: 'bd.0502',
            permission_to_create: 'create-lppin',
            permission_to_update: 'create-lppin',
            permission_to_delete: 'delete-lppin',
        }
    }
}
</script>
