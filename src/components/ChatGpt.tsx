export default class ChatGpt{

    generateStory = async (text:string)=>{

        const prompt = `
            Create the entire graph of interactive story game with followin instructions.
            The height of the graph should be 3, 3th node should be the last chapter ending with tagline. 
            Each paragraph should be less than 60 words. 
            Each paragraph node should have two choices, with the maximum 10 words. 
            The branch should follow notations of 0 for left and 1 for the right. 
            Return the output in the raw json to be used by API. consider this json format {\"graph"\:[{ \"key\": \"0\", \"story\": \"choices\": [\"choices_1\",\"choices_2\"]}]}. 
            Write a story using this user input: ${text}.`
        
        const promt1 = `
        Construct an interactive story outline in JSON format based on the one-line plot provided by the user. 
        The story should unfold through four distinct nodes, including the initial setting, each leading to decision points with two choices. 
        Follow strict word limits for story descriptions and choices, and ensure that the language used is simple to moderate in difficulty, suitable for a general audience. 
        The choices must be logically and directly derived from the content of each node to ensure a cohesive and engaging user experience.\"  
        User Input:  One-Line Plot: \"[${text}]\" 
        Story Structure and Requirements:  
        Initial Node (0): Set the scene and introduce the main character(s) and conflict based on the user's plot, using exactly 30 words.
        This description should provide a clear setting and initial conflict or decision point. 
        Node 1 (0.0 and 0.1): 
        Expand on the story from the choices made at the initial node. 
        Each subsequent node description should also be precisely 30 words and offer two further choices. 
        Node 2 (0.0.0, 0.0.1, 0.1.0, 0.1.1): Develop the story further by detailing the consequences of previous choices. 
        Limit each description to 30 words and end with two choices leading to terminal nodes. 
        Terminal Nodes (e.g., 0.0.0.0, 0.0.0.1): Conclude each story arc with a resolution in exactly 30 words. 
        These nodes should not include any further choices. Language and Choice Guidelines:  
        Story Language: Use simple to moderate difficulty words commonly found in everyday conversation to ensure accessibility and engagement. 
        Choice Descriptions: Each choice should be no more than 10 words, clearly reflecting the possible actions or decisions that follow from the scene described. 
        JSON Output Format:  
        json Copy { 
            "graph": [
                { 
                    \"key\": \"0\", 
                    \"story\": \"Describe the initial setting and conflict in exactly 30 words.\", 
                    \"choices\": [ 
                        \"Choice leading to 0.0\",
                        \"Choice leading to 0.1\" 
                    ]
                },
                {    
                    \"key\": \"0.0\", 
                    \"story\": \"Expand on the first choice in exactly 30 words.\",
                    \"choices\": [ 
                        \"Sub-choice for 0.0.0\",
                        \"Sub-choice for 0.0.1\" 
                    ] 
                },     // Additional nodes follow the same format     
                {    
                    \"key\": \"0.0.0\", 
                    \"story\": \"Detail consequences of the choice in exactly 30 words.\", 
                    \"choices\": [             
                        \"Resolution in 0.0.0.0\",
                        \"Resolution in 0.0.0.1\"         
                    ] 
                },
                {    
                    \"key\": \"0.0.0.0\",
                    \"story\": \"Conclude the storyline succinctly in exactly 30 words.\",
                    \"choices\": []     
                },     // Continue for other terminal nodes 
                ]
            } 
        Instructions to AI:  Ensure that each node’s narrative is engaging and maintains continuity from the user's initial plot. Choices should be actionable and directly derived from the scene, promoting logical story progression. Maintain strict adherence to word limits to ensure clarity and brevity.`
        const response = await fetch("https://api.openai.com/v1/chat/completions",
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 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',
                },
                method: "POST",
                body: JSON.stringify({
                    "model": "gpt-4o",
                    "store": true,
                    "response_format": {
                        "type": "json_schema",
                        "json_schema": {
                            "name": "data",
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "graph": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "key": {
                                                    "type": "string"
                                                },
                                                "story": {
                                                    "type": "string"
                                                },
                                                "choices": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "string"
                                                    }
                                                }
                                            },
                                            "required": [
                                                "key",
                                                "story"
                                            ],
                                            "additionalProperties": true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "messages": [
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ]
                })
            }).then((respnse)=>respnse.json());

        return response;
    }
}