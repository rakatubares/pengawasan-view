<template>
	<div class="wrapper">
		<MyModalDoc
			title="Data BA Buka Tanda Pengaman"
			:state.sync="modal_state"
			:doc_type="doc_type"
			:doc_id.sync="doc_id"
			@close-modal="closeModal"
		>
			<template #tab-uraian>
				<MyDisplayBukaPengaman
					v-if="modal_state == 'show'"
					:doc_id.sync="doc_id"
				/>
				<MyFormBukaPengaman
					v-if="['insert','edit','edit-header'].includes(modal_state)"
					:state.sync="modal_state"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-object>
				<MyDisplayDetail 
					v-if="['show','edit-header'].includes(modal_state)"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
				<MyFormDetail 
					v-if="modal_state == 'edit'"
					:available_details="['sarkut', 'barang']"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-pdf>
				<MyDisplayPdf 
					v-if="['show','edit','edit-header'].includes(modal_state)"
					:doc_type="doc_type" 
					:doc_id.sync="doc_id"
				/>
			</template>
		</MyModalDoc>
	</div>
</template>

<script>
import MyDisplayBukaPengaman from './DisplayBukaPengaman.vue'
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyFormBukaPengaman from './FormBukaPengaman.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

export default {
	name: 'ModalBukaPengaman',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayBukaPengaman,
		MyFormDetail,
		MyFormBukaPengaman,
		MyModalDoc,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'bukapengaman',
			doc_id: this.id,
			modal_state: this.state
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		},
	},
	watch: {
		modal_state: function(val) {
			this.$emit('update:state', val)
		}
	},
}
</script>

<style>
</style>