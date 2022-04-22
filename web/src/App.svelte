<script>
	import audioBuffer2Wav from './wav.js';
	import { playInstructions, downloadInstructions } from './instructions.js';

	let developDurationMinutes = 10;
	let developDurationSeconds = 30;
	let agitationContinously = 30;
	let agitationInterval = 1;
	let agitationLength = 10;

	const readOptions = function() {
		return {
			developDuration: developDurationMinutes * 60 + developDurationSeconds,
			agitationContinously: agitationContinously,
			agitationLength: agitationLength,
			agitationInterval: agitationInterval };
	};

	const play = function() {
		playInstructions(readOptions());
	};
	const download = function() {
		downloadInstructions(readOptions()).then(buffer => {
			const downloadLink = document.createElement('a');
			downloadLink.href = URL.createObjectURL(audioBuffer2Wav(buffer));
			downloadLink.setAttribute('download', 'soundtrack.wav');
			downloadLink.dispatchEvent(new MouseEvent('click'));
		})
	};
</script>

<main>
	<div>
		Develop for <input type="number" min="0" max="360" bind:value={developDurationMinutes}/> minutes and
		<input type="number" min="0" max="59" bind:value={developDurationSeconds}/> seconds.
		Agitate continously for the first <input type="number" min="0" max="59" bind:value={agitationContinously} /> seconds
		and then for <input type="number" min="0" max="59" bind:value={agitationLength}/> seconds every
		<input type="number" min="0" max="60" bind:value={agitationInterval}/> minute.
	</div>
	<button on:click="{play}">Play</button>
	<button on:click="{download}">Download</button>
</main>

<style>
input {
	width: 4em;
}
</style>
