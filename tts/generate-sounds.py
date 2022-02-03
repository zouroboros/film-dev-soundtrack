from TTS.config import load_config
from TTS.utils.manage import ModelManager
from TTS.utils.synthesizer import Synthesizer

manager = ModelManager()

tts_model = 'tts_models/en/ljspeech/tacotron2-DDC'

model_path, config_path, model_item = manager.download_model(tts_model)

vocoder_model = model_item['default_vocoder']
vocoder_path, vocoder_config_path, _ = manager.download_model(vocoder_model)

synthesizer = Synthesizer(
	tts_checkpoint=model_path,
	tts_config_path=config_path,
	vocoder_checkpoint=vocoder_path,
    vocoder_config=vocoder_config_path)

wavs = synthesizer.tts('Pour in the developer')
synthesizer.save_wav(wavs, path = 'pour_in_the_developer.wav')

wavs = synthesizer.tts('Start agitating')
synthesizer.save_wav(wavs, path = 'start_agitating.wav')

wavs = synthesizer.tts('Stop agitating')
synthesizer.save_wav(wavs, path = 'stop_agitating.wav')

wavs = synthesizer.tts('Empty the tank')
synthesizer.save_wav(wavs, path = 'empty_the_tank.wav')
