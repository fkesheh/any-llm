"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LLM_LIST_MAP = exports.LLM_LIST = void 0;
var _anthropicLlmList = require("./anthropic-llm-list");
var _googleLlmList = require("./google-llm-list");
var _mistralLlmList = require("./mistral-llm-list");
var _groqLlmList = require("./groq-llm-list");
var _openaiLlmList = require("./openai-llm-list");
var _perplexityLlmList = require("./perplexity-llm-list");
var _cohereLlmList = require("./cohere-llm-list");
const LLM_LIST = exports.LLM_LIST = [..._openaiLlmList.OPENAI_LLM_LIST, ..._googleLlmList.GOOGLE_LLM_LIST, ..._mistralLlmList.MISTRAL_LLM_LIST, ..._groqLlmList.GROQ_LLM_LIST, ..._perplexityLlmList.PERPLEXITY_LLM_LIST, ..._anthropicLlmList.ANTHROPIC_LLM_LIST, ..._cohereLlmList.COHERE_LLM_LIST];
const LLM_LIST_MAP = exports.LLM_LIST_MAP = {
  openai: _openaiLlmList.OPENAI_LLM_LIST,
  azure: _openaiLlmList.OPENAI_LLM_LIST,
  google: _googleLlmList.GOOGLE_LLM_LIST,
  mistral: _mistralLlmList.MISTRAL_LLM_LIST,
  groq: _groqLlmList.GROQ_LLM_LIST,
  perplexity: _perplexityLlmList.PERPLEXITY_LLM_LIST,
  anthropic: _anthropicLlmList.ANTHROPIC_LLM_LIST,
  cohere: _cohereLlmList.COHERE_LLM_LIST
};