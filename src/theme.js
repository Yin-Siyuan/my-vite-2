export function getThemeToggle() {
	const toggle = document.getElementById('toggle');

	toggle.addEventListener('change', () => {
		changeTheme();
	});
}

function changeTheme() {
	const doc = document.documentElement;
	const currentTheme = doc.getAttribute('data-theme');
	let newTheme = currentTheme == 'dark' ? 'light' : 'dark';
	doc.setAttribute('data-theme', newTheme);
}
