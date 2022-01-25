<template>
	<div class="wrapper">
		<MyModalDoc
			title="Data BA Contoh Barang"
			:state.sync="modal_state"
			:doc_type="doc_type"
			:doc_id.sync="doc_id"
			@close-modal="closeModal"
		>
			<template #tab-uraian>
				<MyDisplayContoh
					v-if="modal_state == 'show'"
					:doc_id.sync="doc_id"
				/>
				<MyFormContoh
					v-if="['insert','edit'].includes(modal_state)"
					:state.sync="modal_state"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-object>
				<MyDisplayDetail 
					v-if="modal_state == 'show'"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
				<MyFormDetail 
					v-if="modal_state == 'edit'"
					:available_details="['barang']"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-pdf>
				<MyDisplayPdf 
					v-if="['show','edit'].includes(modal_state)"
					:state.sync="modal_state"
					:doc_type="doc_type" 
					:doc_id.sync="doc_id"
					:show_button="false"
				/>
			</template>
		</MyModalDoc>
	</div>
</template>

<script>
import MyDisplayContoh from './DisplayContoh.vue'
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormContoh from './FormContoh.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

export default {
	name: 'ModalBukaSegel',
	components: {
		MyDisplayContoh,
		MyDisplayDetail,
		MyDisplayPdf,
		MyFormContoh,
		MyFormDetail,
		MyModalDoc,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'contoh',
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