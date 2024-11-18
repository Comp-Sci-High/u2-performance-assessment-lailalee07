const prompt = require('prompt-sync')()
const fs = require('fs')
const path = require('path')
let textAudioUrl = "https://api.openai.com/v1/audio/speech";


const speechFile = path.resolve("./speech.mp3");

async function chatBot(description) {
  try {
    
    const textAudio = {
      model: "tts-1",
      input: description,
      voice: "echo",
      response_format: "mp3"
    }

    // console.log(textAudio)

    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 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',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(textAudio)
    };

    const response = await fetch(textAudioUrl, options);
    if (response.ok === false) {
      console.log("HTTP error! Status:" + response.status);
    }

    // https://platform.openai.com/docs/api-reference/audio/createSpeech?lang=node
    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);

    // const data = await response.json();
    // console.log(response);
    // return data;
  } catch (error) {
    console.log("An error occurred in chatBot " + error.message);
  }
}

async function requestUrl(category) {
  try {

    let requestUrl2 = "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=" + category

    const response = await fetch(requestUrl2)
    const data = await response.json()
    console.log("A product that you can use is " + data[0].name)
    console.log("The brand is " + data[1].brand)
    if (response.ok === false) {
      console.log("Status:" + response.status);
    }
    // Return the message to be read by text to speech
    return "A product that you can use is " + data[0].name + "The brand is " + data[1].brand
  } catch (error) {
    console.log("An error occurred" + error.message);
  }

}
async function main() {
  // Console log welcome message
  console.log("Welcome to text to speeh find make up")
  let userPrompt2 = prompt("What product do you want?")
  // Add await and save the result in a variable
  let result = await requestUrl(userPrompt2)
// Pass the result from requestUrl into chatbot
  await chatBot(result)
}
main()