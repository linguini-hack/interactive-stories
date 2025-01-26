


interface AudioResponse{
    audio_base64:string
}
export default class TextToSpeech{

    fetchAudio =  async (text:string) => {
        const key = localStorage.getItem("11LabKey");
        if(key==null){
            console.error("setup 11-labs key");
            return;
        }
        const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb/with-timestamps?output_format=mp3_44100_128",
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'xi-api-key': key //'sk_ccd708b647c2b89555cadcf474f89c7a8ce41442d8e54a31'
                },
                method: "POST",
                body: JSON.stringify(
                    {
                        "text": text,
                        "model_id": "eleven_multilingual_v2"
                    
                    }
                )
            }).then((response)=>response.json());
        return response["audio_base64"];
    };
}