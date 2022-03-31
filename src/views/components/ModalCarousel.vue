<template>
	<div class="wrapper">
		<CModal
			class="modal-level-2"
			title="Foto Barang"
			size="xl"
			:show.sync="show"
			@update:show="show == false && closeModal()"
		>
			<div class="carousel" v-if="show_carousel">
				<agile 
					class="main" 
					ref="main"
					:options="options1"
					:as-nav-for="asNavFor1"
				>
					<div 
						class="slide"
						v-for="(img, index) in images"
						:key="index"
						:class="`slide--${index}`"
					>
						<img :src="img.content">
					</div>
				</agile>
				<agile 
					class="thumbnails"
					ref="thumbnails" 
					:options="options2" 
					:as-nav-for="asNavFor2"
				>
					<div
						class="slide slide--thumbniail"
						v-for="(img, index) in images" 
						:key="index" 
						:class="`slide--${index}`" 
						@click="
							$refs.thumbnails.goTo(index);
							$refs.main.goTo(index);
						"
					>
						<img :src="img.content">
					</div>

					<template slot="prevButton">
						<i class="fas fa-chevron-left"></i>
					</template>

					<template slot="nextButton">
						<i class="fas fa-chevron-right"></i>
					</template>
				</agile>
			</div>
			<div v-else>
				Foto tidak ditemukan
			</div>
		</CModal>
	</div>
</template>

<script>
import { VueAgile } from 'vue-agile'

import api from '../../router/api2.js'

export default {
	name: 'ModalCarousel',
	components: {
		agile: VueAgile
	},
	props: {
		doc_type: String,
		doc_id: Number,
		item_id: Number
	},
	data() {
		return {
			show: false,
			show_carousel: false,
			images: null,
			asNavFor1: [],
			asNavFor2: [],
			options1: {
				dots: false,
				fade: true,
				navButtons: false
			},
			options2: {
				centerMode: true,
				dots: false,
				navButtons: false,
				responsive: [
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 5,
							navButtons: true
						}
					},
					{
						breakpoint: 1000,
						settings: {
							navButtons: true
						}
					}
				]
			},
		}
	},
	methods: {
		async getData() {
			let response = await api.getItemBarang(this.doc_type, this.doc_id, this.item_id)
			this.images = response.data.data.image_list

			if (this.images.length > 0) {
				this.show_carousel = true
				this.asNavFor1.push(this.$refs.thumbnails)
				this.asNavFor2.push(this.$refs.main)
			}
		},
		closeModal() {
			this.show = false
			this.$emit('close-modal')
		},
	},
	async mounted() {
		this.show = true
		await this.getData()
		
	}
}
</script>

<style>
.main {
	margin-bottom: 30px; 
}
.main img {
	max-height: 70vh;
	max-width: 100%;
	width: auto !important;
}

.thumbnails {
	margin: 0 -5px;
	width: calc(100% + 10px); 
}

.agile__nav-button {
	background: transparent;
	border: none;
	color: #ccc;
	cursor: pointer;
	font-size: 24px;
	transition-duration: .3s; 
}
.agile__nav-button:hover {
    color: #888; 
}

.thumbnails .agile__nav-button {
	position: absolute;
	top: 50%;
	transform: translateY(-50%); 
}
.thumbnails .agile__nav-button--prev {
	left: -45px; 
}
.thumbnails .agile__nav-button--next {
	right: -45px; 
}

.agile__dot {
	margin: 0 10px; 
}
.agile__dot button {
	background-color: #eee;
	border: none;
	border-radius: 50%;
	cursor: pointer;
	display: block;
	height: 10px;
	font-size: 0;
	line-height: 0;
	margin: 0;
	padding: 0;
	transition-duration: .3s;
	width: 10px; 
}
.agile__dot--current button, 
.agile__dot:hover button {
    background-color: #888; 
}

.slide {
	align-items: center;
	box-sizing: border-box;
	color: #fff;
	display: flex;
	max-width: 100%;
	max-height: 70vh;
	justify-content: center; 
}
.slide--thumbniail {
	cursor: pointer;
	height: 100px;
	padding: 0 5px;
	transition: opacity .3s; 
}
.slide--thumbniail:hover {
	opacity: .75; 
}
.slide img {
	height: 100%;
	object-fit: cover;
	object-position: center;
	width: 100%; 
}
</style>