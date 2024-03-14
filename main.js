import { getThemeToggle } from './src/theme';
import { Modal } from './src/modal';
import { getVideo, drawVideo } from './src/camera';
import { drawText } from './src/text';

const memeCanvas = document.querySelector('#meme');

const selfieLayer = document.createElement('canvas');
const textLayer = document.createElement('canvas');
for (let canvas of [selfieLayer, textLayer]) {
	canvas.width = memeCanvas.width;
	canvas.height = memeCanvas.height;
}

function redrawMeme() {
	const memeCtx = memeCanvas.getContext('2d');
	memeCtx.drawImage(selfieLayer, 0, 0);
	memeCtx.drawImage(textLayer, 0, 0);
}

async function setupTakeSelfie() {
	const selfie = document.getElementById('take-selfie');
	const savePhotoBtn = document.getElementById('save-photo');

	const selfieModal = new Modal(
		'Take a selfie',
		selfie,
		selfie.querySelector('.modal-content')
	);
	selfieModal.render();

	const previewCanvas = document.getElementById('preview');

	const video = await getVideo(previewCanvas);

	savePhotoBtn.addEventListener('click', () => {
		drawVideo(video, selfieLayer);
		redrawMeme();
	});
}

function setupAddText() {
	const textInputs = document.getElementById('add-text');
	const saveTextBtn = document.getElementById('text-save');

	saveTextBtn.addEventListener('click', () => {
		drawText(textLayer);
		redrawMeme();
	});

	const textModal = new Modal(
		'Add some text',
		textInputs,
		textInputs.querySelector('.modal-content')
	);
	textModal.render();
}

function setupSettings() {
	const settings = document.getElementById('settings');
	getThemeToggle();

	const darkModal = new Modal(
		'Settings',
		settings,
		settings.querySelector('.modal-content')
	);
	darkModal.render();
}

(async function run() {
	await setupTakeSelfie();
	setupAddText();
	setupSettings();
})();
