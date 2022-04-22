const loadArrayBuffers = async function() {
  const arrayBuffers = {};
  arrayBuffers['pourInTheDeveloper'] = await fetch('audio/pour_in_the_developer.wav')
    .then(response => response.arrayBuffer());

  arrayBuffers['startAgitating'] = await fetch('audio/start_agitating.wav')
      .then(response => response.arrayBuffer());

  arrayBuffers['stopAgitating'] = await fetch('audio/stop_agitating.wav')
      .then(response => response.arrayBuffer());

  arrayBuffers['emptyTheTank'] = await fetch('audio/empty_the_tank.wav')
      .then(response => response.arrayBuffer());

  return arrayBuffers;
};

const audioInstructions = async function (context, options, arrayBuffers) {
  const source = async function(buffer) {
    const audio = await context.decodeAudioData(buffer.slice(0));
    const source = context.createBufferSource();
    source.buffer = audio;
    source.connect(context.destination)
    return source;
  };

  const pourInTheDeveloper = await source(arrayBuffers['pourInTheDeveloper']);

  const nAgitations = Math.floor(options.developDuration / options.agitationInterval / 60)

  const startAgitations = [];
  const stopAgitations = [];
  for (let i = 0; i < nAgitations + 1; i++) {
    startAgitations.push(await source(arrayBuffers['startAgitating']));
    stopAgitations.push(await source(arrayBuffers['stopAgitating']));
  }

  const emptyTheTank = await source(arrayBuffers['emptyTheTank']);

  pourInTheDeveloper.start(0)
  startAgitations[0].start(pourInTheDeveloper.buffer.duration);
  stopAgitations[0].start(options.agitationContinously + pourInTheDeveloper.buffer.duration);

  for (let i = 1; i < nAgitations + 1; i++) {
    startAgitations[i].start(i * options.agitationInterval * 60);
    stopAgitations[i].start(i * options.agitationInterval * 60 + options.agitationLength)
  }

  emptyTheTank.start(options.developDuration);
}

export const playInstructions = async function(options) {
  const audioContext = new window.AudioContext();
  const arrayBuffers = await loadArrayBuffers();
  await audioInstructions(audioContext, options, arrayBuffers);
}

export const downloadInstructions = async function(options) {
  const arrayBuffers = await loadArrayBuffers();
  const sampleRate = 22050;
  const renderContext = new OfflineAudioContext({
    numberOfChannels: 1,
    sampleRate: sampleRate,
    length: sampleRate * (options.developDuration + 10) ,
  });
  await audioInstructions(renderContext, options, arrayBuffers);

  return await renderContext.startRendering()
}
