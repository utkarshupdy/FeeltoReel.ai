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
      Lumen5: {
        url: process.env.LUMEN5_API_URL,
        key: process.env.LUMEN5_API_KEY,
      },
      DeepBrain: {
        url: process.env.DEEP_BRAIN_API_URL,
        key: process.env.DEEP_BRAIN_API_KEY,
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
        url: process.env.COQUI_TTS_API_URL,
        key: process.env.COQUI_TTS_API_KEY,
      },
    },
  };
  
  /**
   * Calls the selected AI Model API for either text-to-video or text-to-audio conversion.
   * @param {string} model - The AI model name (e.g., "RunwayML", "GoogleTTS").
   * @param {string} prompt - The user-provided text prompt.
   * @param {string} type - Either "textToVideo" or "textToAudio".
   * @returns {string} - The generated media URL.
   */
  export async function callAIModel(model, prompt, type) {
    if (!AI_MODELS[type] || !AI_MODELS[type][model]) {
      throw new Error("Invalid AI Model selected.");
    }
  
    const { url: apiUrl, key: apiKey } = AI_MODELS[type][model]; // ✅ Correctly fetch URL & API key
  
    if (!apiUrl || !apiKey) {
      throw new Error(`Missing API credentials for ${model}`);
    }
  
    try {
      const response = await axios.post(apiUrl, { prompt }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        }
      });
  
      if (response.data.videoUrl || response.data.audioUrl) {
        return response.data.videoUrl || response.data.audioUrl;
      } 
      else {
        throw new Error(`Invalid response from ${model} API.`);
      }
    } catch (error) {
      console.error(`Error calling ${model}:`, error.message);
      throw new Error(`Failed to generate media using ${model}`);
    }
  }
  