# AnyLLM

Welcome to the AnyLLM project! This project aims to create a seamless abstraction layer between your application and various Language Learning Model (LLM) providers. With this layer, you can effortlessly switch between different LLM providers without the need to change your application's codebase.

## Features

- **Abstraction Layer**: Provides a unified interface to interact with different LLM providers.
- **Flexibility**: Easily switch between LLM providers based on your needs or preferences.
- **Simplicity**: Integrate with a single API that abstracts away the complexities of individual LLM providers.

## Getting Started

To get started with AnyLLM, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running `npm install`.

## Usage

To use AnyLLM in your project, follow the example provided in our test suite. Here's a quick overview of how to interact with different LLM providers through the AnyLLM abstraction layer:

1. **Initialize the Chat Client Proxy**:
   First, create an instance of `ChatClientProxy` by specifying the provider you wish to use. This is done by passing the provider's name to the `ChatClientProxy` constructor.

   The current supported LLM providers are:
   - OpenAI
   - Anthropic
   - Google Gemini
   - Mistral
   - Cohere
   - Azure OpenAI
   - Groq


   ```typescript
   import { ChatClientProxy } from './src/ChatClientProxy';

   const chatClientProxy = new ChatClientProxy('providerName');
   ```

2. **Load API Key Values**:
   Load your API key values from the environment or your preferred configuration method. This step is crucial for authenticating with the LLM provider's API.

   ```typescript
   import { loadApiKeyValuesFromEnvironment } from './src/util/load-api-keys';

   const apiKeyValues = loadApiKeyValuesFromEnvironment();
   ```

3. **Initialize the Chat Client**:
   Before making any requests, initialize the chat client with the loaded API key values.

   ```typescript
   await chatClientProxy.initialize(apiKeyValues);
   ```

4. **Create a Chat Completion**:
   To generate a response from the LLM, use the `createChatCompletion` method. You'll need to provide chat settings (including the model and parameters like temperature and max tokens) and an array of chat messages.

   ```typescript
   const chatSettings = {
     model: 'modelName',
     temperature: 0.5,
     maxTokens: 100,
   };

   const messages = [
     {
       role: 'user',
       content: 'Hello, how are you?',
     },
   ];

   const response = await chatClientProxy.createChatCompletion(chatSettings, messages);
   console.log(response);
   ```

5. **Handle Responses**:
   The `createChatCompletion` method returns a promise that resolves to the generated text response. You can then process this response as needed in your application.



## Project Status

- [x] Support for Text
- [ ] Support for Images
- [ ] Support for Tools


