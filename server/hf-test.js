import "dotenv/config";
import axios from "axios";

const HF_TOKEN = process.env.HF_API_KEY;

// ✅ Try these models in order
const MODELS = [
  "EleutherAI/gpt-neo-1.3B",
  "bigscience/bloomz-560m",
  "distilgpt2"
];

(async () => {
  for (const model of MODELS) {
    const HF_API = `https://api-inference.huggingface.co/models/${model}`;
    console.log(`🔄 Testing model: ${model}`);

    try {
      const response = await axios.post(
        HF_API,
        { inputs: "Hello, can you answer my support question?" },
        { headers: { Authorization: `Bearer ${HF_TOKEN}` } }
      );
      console.log(`✅ Success with ${model}:`, response.data);
      break; // stop at first success
    } catch (err) {
      console.error(`❌ ${model} failed:`, err.response?.data || err.message);
    }
  }
})();
