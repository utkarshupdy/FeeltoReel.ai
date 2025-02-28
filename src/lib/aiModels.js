import axios from "axios";

const AI_MODELS = {
  textToVideo: {
    RunwayML: {
      url: process.env.RUNWAYML_API_URL,
      key: process.env.RUNWAYML_API_KEY,
    },
    Pictory: {
      url: process.env.PICTORY_API_URL,
      key: process.env.PICTORY_API_KEY,
    },
    Synthesia: {
      url: process.env.SYNTHESIA_API_URL,
      key: process.env.SYNTHESIA_API_KEY,
    },
  },
  textToAudio: {
    GoogleTTS: {
      url: process.env.GOOGLE_TTS_API_URL,
      key: process.env.GOOGLE_TTS_API_KEY,
    },
    IBMWatson: {
      url: process.env.IBM_WATSON_TTS_API_URL,
      key: process.env.IBM_WATSON_TTS_API_KEY,
    },
    AmazonPolly: {
      url: process.env.AMAZON_POLLY_API_URL,
      key: process.env.AMAZON_POLLY_API_KEY,
    },
    PlayHT: {
      url: process.env.PLAY_HT_API_URL,
      key: process.env.PLAY_HT_API_KEY,
    },
    CoquiTTS: {
      url: process.env.COQUI_TTS_API_URL || "http://localhost:5002/api/tts",
      key: null, // No API key needed for self-hosted Coqui TTS
    },
  },
};

/**
 * Calls the selected AI Model API for text-to-audio or text-to-video conversion.
 * @param {string} model - The AI model name (e.g., "RunwayML", "GoogleTTS", "CoquiTTS").
 * @param {string} prompt - The user-provided text prompt.
 * @param {string} type - Either "textToVideo" or "textToAudio".
 * @returns {string} - The generated media URL.
 */
export async function callAIModel(model, prompt, type) {
  if (!AI_MODELS[type] || !AI_MODELS[type][model]) {
    throw new Error("Invalid AI Model selected.");
  }

  const { url: apiUrl, key: apiKey } = AI_MODELS[type][model];

  if (!apiUrl) {
    throw new Error(`Missing API URL for ${model}`);
  }

  try {
    const response = await axios.post(
      apiUrl,
      type === "textToAudio"
        ? { text: prompt, speaker_id: "default", speed: 1.0 } // Coqui TTS format
        : { prompt },
      {
        headers: apiKey ? { "Authorization": `Bearer ${apiKey}` } : {},
      }
    );

    if (response.data.audio_url || response.data.videoUrl) {
      return response.data.audio_url || response.data.videoUrl;
    } else {
      throw new Error(`Invalid response from ${model} API.`);
    }
  } catch (error) {
    console.error(`Error calling ${model}:`, error.message);
    throw new Error(`Failed to generate media using ${model}`);
  }
}
