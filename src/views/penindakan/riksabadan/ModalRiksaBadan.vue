<template>
	<div class="wrapper">
		<MyModalPenindakan
			ref="ModalPenindakan"
			:title="`Data ${tipe_surat}`"
			:state.sync="local_state"
			:doc_type="doc_type"
			:doc_id.sync="id"
			:available_objects="[]"
			@close-modal="closeModal"
		>
			<template #uraian>
				<MyDisplayRiksaBadan 
					v-if="local_state == 'show'"
					:doc_type="doc_type"
					:doc_id.sync="id"
				/>
				<MyFormRiksaBadan 
					v-else-if="['insert','edit'].includes(local_state)"
					:state.sync="local_state"
					:doc_type="doc_type"
					:tipe_surat="tipe_surat"
					:doc_id.sync="doc_id"
				/>
			</template>
		</MyModalPenindakan>
	</div>
</template>

<script>
import MyDisplayRiksaBadan from './DisplayRiksaBadan.vue'
import MyFormRiksaBadan from './FormRiksaBadan.vue'
import MyModalPenindakan from '../../components/ModalPenindakan.vue'

const tabs_list = [
	{
		title: 'Uraian',
		visibility: true,
		name: 'tab-uraian',
	},
	{
		title: 'Print',
		visibility: false,
		name: 'tab-pdf',
	}
]

export default {
	name: 'ModalRiksaBadan',
	components: {
		MyDisplayRiksaBadan,
		MyFormRiksaBadan,
		MyModalPenindakan,
	},
	props: {
		state: String,
		doc_type: String,
		tipe_surat: String,
		id: Number,
	},
	data() {
		return {
			doc_id: this.id,
			local_state: this.state,
			tabs: JSON.parse(JSON.stringify(tabs_list)),
		}
	},
	watch: {
		state(val) {
			this.local_state = val
		},
		local_state: function(val) {
			this.$emit('update:state', val)
		},
		id(val) {
			this.doc_id = val
		},
		doc_id(val) {
			this.$emit('update:id', val)
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		},
	},
}
</script>

<style>
</style>