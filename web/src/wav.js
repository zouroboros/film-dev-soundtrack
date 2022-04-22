const audioBuffer2Wav = function(audioBuffer) {
  const channelData = audioBuffer.getChannelData(0);
  var headerBytes = 0;
  var fmtHeaderSize = 0;
  var fmtChunkSize = 0;
  var dataHeaderSize = 0;
  var dataChunkSize = channelData.length * 2;
  headerBytes += 4; // RIFF chunk descriptor
  headerBytes += 4; // chunksize
  headerBytes += 4; // format
  fmtHeaderSize += 4; // subchunk 1 id
  fmtHeaderSize += 4; // subchunk 1 size
  fmtChunkSize += 2; // audio format
  fmtChunkSize += 2; // number of channels
  fmtChunkSize += 4; // samplerate
  fmtChunkSize += 4; // byte rate
  fmtChunkSize += 2; // block align
  fmtChunkSize += 2; // bits per sample
  dataHeaderSize += 4; // subchunk 2 id
  dataHeaderSize += 4; // subchunk 2 size
  const arrayBuffer = new ArrayBuffer(headerBytes + fmtHeaderSize + fmtChunkSize + dataHeaderSize + dataChunkSize);
  const arrayView = new DataView(arrayBuffer);
  arrayView.setUint8(0, 'R'.charCodeAt(0));
  arrayView.setUint8(1, 'I'.charCodeAt(0));
  arrayView.setUint8(2, 'F'.charCodeAt(0));
  arrayView.setUint8(3, 'F'.charCodeAt(0));
  arrayView.setUint32(4, fmtChunkSize + dataHeaderSize + dataChunkSize, true);
  arrayView.setUint8( 8, 'W'.charCodeAt(0));
  arrayView.setUint8( 9, 'A'.charCodeAt(0));
  arrayView.setUint8(10, 'V'.charCodeAt(0));
  arrayView.setUint8(11, 'E'.charCodeAt(0));
  arrayView.setUint8(12, 'f'.charCodeAt(0));
  arrayView.setUint8(13, 'm'.charCodeAt(0));
  arrayView.setUint8(14, 't'.charCodeAt(0));
  arrayView.setUint8(15, ' '.charCodeAt(0));
  arrayView.setUint32(16, fmtChunkSize, true);
  arrayView.setUint16(20, 1, true); // audio format indicates linear pcm
  arrayView.setUint16(22, 1, true); // number of channels - 1 mono
  arrayView.setUint32(24, audioBuffer.sampleRate, true); // sample rate
  arrayView.setUint32(28, audioBuffer.sampleRate * 1 * 2, true); // byte rate == sample rate * number of channels * bytes per sample
  arrayView.setUint16(32, 1 * 2, true); // block align == num channels * bytes per sample
  arrayView.setUint16(34, 16, true); // bits per sample
  arrayView.setUint8(36, 'd'.charCodeAt(0));
  arrayView.setUint8(37, 'a'.charCodeAt(0));
  arrayView.setUint8(38, 't'.charCodeAt(0));
  arrayView.setUint8(39, 'a'.charCodeAt(0));
  arrayView.setUint32(40, dataChunkSize, true);
  for(let i = 0; i < channelData.length; i++) {
    arrayView.setInt16(44 + i * 2, Math.floor(channelData[i] * 2**15), true)
  }
  const blob = new Blob([arrayBuffer]);
  return blob;
};

export default audioBuffer2Wav;
