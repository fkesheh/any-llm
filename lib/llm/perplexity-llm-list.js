"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PERPLEXITY_LLM_LIST = void 0;
var _types = require("../util/types");
const PERPLEXITY_PLATORM_LINK = 'https://docs.perplexity.ai/docs/getting-started';

// Mixtral 8x7B Instruct (UPDATED 1/31/24)
const MIXTRAL_8X7B_INSTRUCT = {
  modelId: 'mixtral-8x7b-instruct',
  modelName: 'Mixtral 8x7B Instruct',
  provider: _types.ModelProvider.Perplexity,
  platformLink: PERPLEXITY_PLATORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 16384,
  maxContextLength: 16384
};

// Mistral 7B Instruct (UPDATED 1/31/24)
const MISTRAL_7B_INSTRUCT = {
  modelId: 'mistral-7b-instruct',
  modelName: 'Mistral 7B Instruct',
  provider: _types.ModelProvider.Perplexity,
  platformLink: PERPLEXITY_PLATORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 16384,
  maxContextLength: 16384
};

// CodeLlama 70B Instruct (UPDATED 1/31/24)
const CODELLAMA_70B_INSTRUCT = {
  modelId: 'codellama-70b-instruct',
  modelName: 'CodeLlama 70B Instruct',
  provider: _types.ModelProvider.Perplexity,
  platformLink: PERPLEXITY_PLATORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 16384,
  maxContextLength: 16384
};

// Sonar Small Chat (UPDATED 2/25/24)
const PERPLEXITY_SONAR_SMALL_CHAT_7B = {
  modelId: 'sonar-small-chat',
  modelName: 'Sonar Small Chat',
  provider: _types.ModelProvider.Perplexity,
  platformLink: PERPLEXITY_PLATORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 16384,
  maxContextLength: 16384
};

// Sonar Small Online (UPDATED 2/25/24)
const PERPLEXITY_SONAR_SMALL_ONLINE_7B = {
  modelId: 'sonar-small-online',
  modelName: 'Sonar Small Online',
  provider: _types.ModelProvider.Perplexity,
  platformLink: PERPLEXITY_PLATORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 12000,
  maxContextLength: 12000
};

// Sonar Medium Chat (UPDATED 2/25/24)
const PERPLEXITY_SONAR_MEDIUM_CHAT_8x7B = {
  modelId: 'sonar-medium-chat',
  modelName: 'Sonar Medium Chat',
  provider: _types.ModelProvider.Perplexity,
  platformLink: PERPLEXITY_PLATORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 16384,
  maxContextLength: 16384
};

// Sonar Medium Online (UPDATED 2/25/24)
const PERPLEXITY_SONAR_MEDIUM_ONLINE_8x7B = {
  modelId: 'sonar-medium-online',
  modelName: 'Sonar Medium Online',
  provider: _types.ModelProvider.Perplexity,
  platformLink: PERPLEXITY_PLATORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 12000,
  maxContextLength: 12000
};
const PERPLEXITY_LLM_LIST = exports.PERPLEXITY_LLM_LIST = [PERPLEXITY_SONAR_SMALL_CHAT_7B, PERPLEXITY_SONAR_SMALL_ONLINE_7B, PERPLEXITY_SONAR_MEDIUM_CHAT_8x7B, PERPLEXITY_SONAR_MEDIUM_ONLINE_8x7B, MISTRAL_7B_INSTRUCT, MIXTRAL_8X7B_INSTRUCT, CODELLAMA_70B_INSTRUCT];