import './style.css';
import { getVideo, drawVideo } from './src/camera';

(async function run() {
	const video = await getVideo();
	const canvas = document.querySelector('canvas');
	const button = document.querySelector('#selfie');

	button.addEventListener('click', () => {
		drawVideo(video, canvas);
	});
})();
