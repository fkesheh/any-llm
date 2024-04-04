# AnyLLM

Welcome to the AnyLLM project! This project aims to create a seamless abstraction layer between your application and various Language Learning Model (LLM) providers. With this layer, you can effortlessly switch between different LLM providers without the need to change your application's codebase.

## Features

- **Abstraction Layer**: Provides a unified interface to interact with different LLM providers.
- **Flexibility**: Easily switch between LLM providers based on your needs or preferences.
- **Simplicity**: Integrate with a single API that abstracts away the complexities of individual LLM providers.

## Getting Started

Here's a quick overview of how to interact with different LLM providers through the AnyLLM abstraction layer:

1.  **Add the any-llm to your project**
    To add the AnyLLM package to your project, you can use either npm or yarn. Run one of the following commands in your terminal:

    ```bash
    npm i any-llm
    yarn add any-llm
    ```

2.  **Initialize the Chat Client Proxy**:
    First, create an instance of `Client` by specifying the provider you wish to use. This is done by passing the provider's name to the `Client` constructor.

```typescript
import {
  Client,
  ModelProvider,
  ChatModels,
  loadApiKeyValuesFromEnvironment,
} from 'any-llm'

const client = new Client(
  ModelProvider.Google,
  loadApiKeyValuesFromEnvironment(),
)
// or give the value of the key (check .env.sample for the valid environment keys)
const client = new Client(ModelProvider.Google, {
  GOOGLE_GEMINI_API_KEY: 'your-key',
})
```

3. **Create a Chat Completion**:
   To generate a response from the LLM, use the `createChatCompletion` method. You'll need to provide chat settings (including the model and parameters like temperature and max tokens) and an array of chat messages.

   ```typescript
   // NonStreaming Mode - String
   const msg = await client.createChatCompletionNonStreaming(
     {
       model: ChatModels.Google.GEMINI_1_0_PRO,
       max_tokens: 4096,
       temperature: 0.3,
     },
     [
       {
         role: 'user',
         content: 'Hi Gemini',
       },
     ],
   )

   // Streaming Mode - StreamingTextResponse
   const msg = await client.createChatCompletion(
     {
       model: ChatModels.Google.GEMINI_1_0_PRO,
       max_tokens: 4096,
       temperature: 0.3,
     },
     [
       {
         role: 'user',
         content: 'Hi Gemini',
       },
     ],
   )
   ```

## Available Models and Providers

The following models and providers are currently supported:

### Chat Models

- **OpenAI Models:**

  - `gpt-4-turbo-preview`: GPT-4 Turbo
  - `gpt-4`: GPT-4
  - `gpt-3.5-turbo`: Updated GPT-3.5 Turbo

- **Google Models:**

  - `gemini-1.0-pro`: Gemini 1.0 Pro
  - `gemini-1.0-pro-vision`: Gemini 1.0 Pro Vision
  - `gemini-1.5-pro-latest`: Gemini 1.5 Pro
  - `gemini-ultra`: Gemini 1.0 Ultra

- **Anthropic Models:**

  - `claude-2.1`: Claude 2
  - `claude-instant-1.2`: Claude Instant
  - `claude-3-haiku-20240307`: Claude 3 Haiku
  - `claude-3-sonnet-20240229`: Claude 3 Sonnet
  - `claude-3-opus-20240229`: Claude 3 Opus

- **Mistral Models:**

  - `mistral-tiny`: Mistral Tiny
  - `mistral-small`: Mistral Small
  - `mistral-medium`: Mistral Medium
  - `mistral-large-2402`: Mistral Large

- **Groq Models:**

  - `llama2-70b-4096`: LLaMA2-70b
  - `mixtral-8x7b-32768`: Mixtral-8x7b
  - `gemma-7b-it`: Gemma 7b

- **Perplexity Models:**
  - `pplx-7b-online`: Perplexity Online 7B
  - `pplx-70b-online`: Perplexity Online 70B
  - `pplx-7b-chat`: Perplexity Chat 7B
  - `pplx-70b-chat`: Perplexity Chat 70B
  - `mixtral-8x7b-instruct`: Mixtral 8x7B Instruct
  - `mistral-7b-instruct`: Mistral 7B Instruct
  - `llama-2-70b-chat`: Llama2 70B Chat
  - `codellama-34b-instruct`: CodeLlama 34B Instruct
  - `codellama-70b-instruct`: CodeLlama 70B Instruct
  - `sonar-small-chat`: Sonar Small Chat
  - `sonar-small-online`: Sonar Small Online
  - `sonar-medium-chat`: Sonar Medium Chat
  - `sonar-medium-online`: Sonar Medium Online

### Embedding Models

- **VoyageAI Embedding Models:**
  - `voyage-large-2`: Voyage Large 2
  - `voyage-code-2`: Voyage Code 2
  - `voyage-2`: Voyage 2
  - `voyage-lite-02-instruct`: Voyage Lite 02 Instruct

### Tokenizers

- Anthropic Tokenizer
- Llama2 Tokenizer
- OpenAI Tokenizer


Please refer to the respective documentation for more details on each model and provider.

## Project Status

- [x] Chat
  - [x] Text generation
  - [ ] Docs (in context learning)
  - [ ] Images
- [x] Embeddings
  - [x] For text (general, query, retrieval)
  - [ ] For images
- [ ] Images
  - [ ] Image description
  - [ ] Images generation
- [X] Tokenizers
- [ ] Chunking
  - [ ] Text chunking
- - [ ] Images reshape and chunk
- [ ] Video
  - [ ] Transcription
  - [ ] Images extraction
  - [ ] Image Similarity
- [ ] Functions
  - [ ] Function Description
  - [ ] Function Calling
- [ ] Agents
  - [ ] Chained prompts
  - [ ] Auto flows
