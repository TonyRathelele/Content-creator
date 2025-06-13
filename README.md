# Primary School Content Generator

An AI-powered content generation tool specifically designed for primary school educators. This application helps create engaging educational content using Google's Gemini AI model.

## Features

- Generate educational content for primary school students
- Create both text and image-based content
- 5 specialized prompt templates for different educational scenarios
- Customizable content parameters
- Export functionality for generated content
- Performance tracking and monitoring
- Error handling and rate limit management

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Gemini API key:
   ```
   REACT_APP_GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Prompt Templates

1. **Story Generator**: Creates engaging stories for young readers
2. **Math Problem Generator**: Generates age-appropriate math problems
3. **Science Explanation**: Creates simple explanations of scientific concepts
4. **Vocabulary Builder**: Generates word lists and example sentences
5. **Creative Writing Prompt**: Creates prompts for creative writing exercises

## Rate Limits and Usage

- Free tier: 60 requests per minute
- Paid tier: 300 requests per minute
- Image generation: 20 requests per minute

## Error Handling

The application includes comprehensive error handling for:
- API rate limits
- Network issues
- Invalid inputs
- Content filtering
- API key validation

## Performance Tracking

The application tracks:
- Generation time
- Token usage
- API response times
- Error rates

## Contributing

Feel free to submit issues and enhancement requests! 