<template>
	<transition name="image-viewer-fade">
		<div class="image-viewer" v-show="show">
			<i class="image-viewer-close img-v-icon-close" @click="close"></i>
			<div class="image-viewer-content" v-if="images.length">
				<img :src="images[index].url" :alt="images[index].name?images[index].name:''" :width="imgStyle.width"
					:height="imgStyle.height" v-show="imgVisible">
				<div class="image-viewer-info">
					<p>{{images[index].name?images[index].name:""}}({{(index+1)+'/'+images.length}})</p>
					<div class="right">
						<i :class="`img-v-icon-${config.fullScreen?'cancel-':''}full-screen`" @click="fullScreen"></i>
						<i class="img-v-icon-download" @click="download(images[index].url)"></i>
					</div>
				</div>
				<template v-if="images.length>1">
					<div class="image-viewer-content-prev" @click="imgChange('prev')"></div>
					<div class="image-viewer-content-next" @click="imgChange('next')"></div>
				</template>
			</div>
			<div class="image-viewer-nav" v-if="thumbnail">
				<div class="image-viewer-nav-prev" @click="pageChange('prev')"><i class="img-v-icon-arrow-left"></i>
				</div>
				<div class="image-viewer-nav-main">
					<div class="image-viewer-nav-thumb">
						<template v-for="(il,i) in images" :key="i">
							<div :class="{active:i===index}" :alt="il.name?il.name:''" :title="il.name?il.name:''"
								:style="{backgroundImage:'url('+il.url+')'}" @click="imgChange(i)"></div>
						</template>

					</div>
				</div>
				<div class="image-viewer-nav-next" @click="pageChange('next')"><i class="img-v-icon-arrow-right"></i>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import {
		defineComponent,
		reactive,
		watch,
		toRefs,
	} from 'vue';

	export default defineComponent({
		name: "imageViewer",
		props: {
			images: {
				type: Array,
				default () {
					return []
				}
			},
			startPosition: {
				type: Number,
				default: 0
			},
			show: {
				type: Boolean,
				default: false
			},
			page: {
				type: Number,
				default: 0
			},
			thumbnail: {
				type: Boolean,
				default: true,
			}
		},
		setup(props, {
			expose,
			emit
		}) {

			const state = reactive({
				config: {
					imgMaxWidth: window.innerWidth * .8,
					imgMaxHeight: window.innerHeight * .8,
					fullScreen: false
				},
				imgStyle: {
					width: "auto",
					height: "auto"
				},

				imgVisible: false,
				index: 0,
				activePage: 0
			});

			const {
				config,
				imgStyle,
				imgVisible,
				index,
				activePage
			} = toRefs(state);



			function reset() {
				state.imgStyle = {
					width: "auto",
					height: "auto"
				};
			}

			function imgLoad(callback) {

				if (props.images && props.images[state.index]) {
					let image = new Image();
					image.src = props.images[state.index].url;
					image.onload = function() {
						configImageSize(image.width, image.height);
					}
				}
			}

			function configImageSize(width, height) {

				let size = zoomImageSize(width, height);
				if (size.width - 10 > state.config.imgMaxWidth || size.height - 10 > state.config
					.imgMaxHeight) {
					configImageSize(size.width, size.height);
				} else {
					state.imgStyle = size;
					state.imgVisible = true;
				}
			}

			function zoomImageSize(width, height) {
				let zoomSize = 0;
				let {
					imgMaxWidth,
					imgMaxHeight
				} = state.config;
				if (width > imgMaxWidth || height > imgMaxHeight) {
					zoomSize = width - imgMaxWidth > height - imgMaxHeight ? imgMaxWidth / width :
						imgMaxHeight / height;
					return {
						width: width * zoomSize,
						height: height * zoomSize
					}
				}
				return {
					width,
					height
				}
			}

			function imgChange(action) {
				const length = props.images.length - 1;
				if (action === "prev") {
					state.index = state.index-- <= 0 ? 0 : state.index;
					if (state.index < state.activePage * 8) pageChange("prev");
				} else if (action === "next") {
					state.index = state.index++ >= length ? length : state.index;
					if (state.index >= (state.activePage + 1) * 8) pageChange("next");
				} else if (!isNaN(action)) {
					state.index = action <= 0 ? 0 : action >= length ? length : action;
				}
			}

			function configThumbStyle() {
				let width = document.querySelector(".image-viewer-nav-thumb").width;
				document.querySelector(".image-viewer-nav-thumb > div:first-child").style.marginLeft = -(
					width * state.activePage) + "px";
			}

			function pageChange(action) {
				const length = props.images.length - 1;

				if (action === "prev" && state.activePage * 8 >= 8) {
					state.activePage--;
				} else if (action === "next" && (state.activePage * 8 < length && length - state.activePage * 8 >
						8)) {
					state.activePage++;
				}
				configThumbStyle();
			}

			function close() {
				if (state.config.fullScreen) {
					fullScreen();
				}
				emit('close');
			}

			function download(url) {
				window.open(url);
			}




			function fullScreen() {
				if (state.config.fullScreen) {
					if (document.exitFullscreen) document.exitFullscreen();
					else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
					else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
					else if (document.msExitFullscreen) document.msExitFullscreen();

					state.config.fullScreen = false;
				} else {
					const requestFullScreen = document.documentElement.requestFullScreen ||
						document.documentElement.webkitRequestFullScreen ||
						document.documentElement.mozRequestFullScreen ||
						document.documentElement.msRequestFullscreen;

					if (requestFullScreen) requestFullScreen.call(document.documentElement);

					state.config.fullScreen = true;
				}
			}




			watch(
				() => props.startPosition,
				(value) => {
					state.index = +value;
				}
			);


			watch(index, () => {
				reset();
				state.imgVisible = false;
				imgLoad();
			})


			watch(() => props.show, (val) => {

				if (props.images.length) {
					if (val) {
						reset();
						document.body.style.overflow = "hidden";
					} else {
						document.body.style.overflow = "";
					}
					imgLoad();
				} else {
					emit('close', {
						index: state.index,
					});
				}
			});

			watch(() => props.page, (val) => {
				state.activePage = val;
				configThumbStyle();
			});


			window.onresize = () => {
				const fullscreenEnabled = document.fullscreenEnabled || window.fullScreen || document
					.webkitIsFullScreen || document.msFullscreenEnabled;
				if (!fullscreenEnabled) state.config.fullScreen = false;
			};



			return {
				config,
				imgStyle,
				imgVisible,
				index,
				imgChange,
				pageChange,
				close,
				fullScreen,
				download
			}

		}
	});
</script>

<style lang="less">
	@import url('../../assets/styles/image-viewer.less');
</style>