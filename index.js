const prompt = require('prompt-sync')()
const fs = require('fs')
const path = require('path')
let textAudioUrl = "https://api.openai.com/v1/audio/speech";


const speechFile = path.resolve("./speech.mp3");

async function chatBot(description) {
    const textAudio = {
        model:"tts-1",
        input:description,
        voice:"echo",
        response_format:"mp3"
    }



const options = {
    method: 'POST',
headers: {
  Authorization: 'Bearer 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',
'Content-Type': 'application/json',
},
body: JSON.stringify(textAudio)
  };

  const response = await fetch(textAudioUrl, options);

  // https://platform.openai.com/docs/api-reference/audio/createSpeech?lang=node
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);

//   const data = await response.json();
//   console.log(response); 
//   return data;
}
async function main() {
let userPrompt = prompt("What make up products do you have")
await chatBot(userPrompt)

}
main()


let requestUrl = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"

async function requestUrl() {
    const response = await fetch(requestUrl)
    const data = await response.json()
    console.log(data.data[0].title)
    console.log(data.data[1].title)
    console.log(data.data[2].title)


        return data
 }
