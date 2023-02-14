import { Configuration, OpenAIApi } from "openai";

export async function getDescFromNameAndKeywords(productName, tone, keywords) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  let seedText = '';
  if(tone == 'Expert') {
    seedText = process.env.SEED_TEXT_EXPERT;
  } else {
    seedText = process.env.SEED_TEXT_SOPHISTICATED;
  }

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: seedText + `\n\nProduct name: ${productName}\nSeed words: ${keywords}\nTone: ${tone}\nProduct Description:`,
    temperature: 0.8,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })

  return response.data.choices[0].text;
}