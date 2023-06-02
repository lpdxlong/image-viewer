import {
	h,
	createApp,
	reactive,
	getCurrentInstance
} from 'vue';
import LImageViewer from './ImageViewer.vue';

function mountComponent(RootComponent) {
	const app = createApp(RootComponent);
	const root = document.createElement('div', {
		"class": "vue-image-viewer-full"
	});

	document.body.appendChild(root);
	return {
		instance: app.mount(root),
		unmount() {
			app.unmount();
			document.body.removeChild(root);
		},
	};
}

let instance = null;

function initInstance() {
	let component = mountComponent({
		setup(props, {
			expose,
		}) {
			const state = reactive({
				show: false,
				startPosition: 0,
				page: 0,
				images: []
			});

			function onClose() {
				state.show = false;
			}

			function images(images) {
				state.images = images;
			}

			function open(startPosition) {
				state.show = true;
				state.startPosition = startPosition;
			}

			function close() {
				state.show = false;
			}
			const instance = getCurrentInstance();
			if (instance) {
				Object.assign(instance.proxy, {
					open,
					close,
					images
				});
			}

			return () => h(LImageViewer, {
				...state,
				onClose: onClose
			});
		}
	});
	({
		instance
	} = component);
}

function getInstance() {
	if (!instance) {
		initInstance();
	}
	return instance;
}

export default {
	show(startPosition = 0) {
		let instance = getInstance();
		instance.open(startPosition);
	},
	hide() {
		let instance = getInstance();
		instance.close();
	},
	images(data) {
		let instance = getInstance();
		instance.images(data);
	}
}