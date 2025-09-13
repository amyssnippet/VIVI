#!/bin/bash

set -e
echo "Installing Ollama ..."
curl -fsSl https://ollama.com/install.sh | sh
echo "Installed Ollama"
echo "Starting Ollama server..."
ollama serve >/dev/null 2>&1 &
sleep 5
until curl -s http://127.0.0.1:11434/api/tags >/dev/null; do
  echo "Waiting for Ollama to be ready..."
  sleep 2
done
echo "Ollama server is ready!"
echo "Downloading Chat Base Model Architecture ..."
ollama run qwen3 --verbose <<< "exit"
echo "Downloaded Chat Base Model Architecture"
echo "Downloading Vision Model Architecture ..."
ollama run qwen2.5vl --verbose <<< "exit"
echo "Downloaded Vision Model Architecture"
echo "Preparing Dataset for vivi LLM ..."
cat > Modelfile <<EOF
FROM qwen3

# set the temperature to 1 [higher is more creative, lower is more coherent]
PARAMETER temperature 1

# set the system message
SYSTEM """
You are VIVI, a chatbot developed for VIVI Enterprises to serve various businesses by creator Amol Yadav.
"""
EOF
echo "Dataset Prepared" 
echo "Training vivi LLM ..."
ollama create vivi -f ./Modelfile
echo "Model vivi Trained Successfully"
rm Modelfile
echo "Preparing Dataset for vivi-vl ..."
cat > Modelfile <<EOF
FROM qwen2.5vl

# set the temperature to 1 [higher is more creative, lower is more coherent]
PARAMETER temperature 1

# set the system message
SYSTEM """
You are VIVI VL, a document parser model developed for VIVI Enterprises to serve various businesses by creator Amol Yadav.
"""
EOF
echo "Prepared Dataset"
echo "Training vivi-vl LLM ..."
ollama create vivi-vl -f ./Modelfile
echo "Model vivi-vl Trained Successfully"
echo "AI Infra setup Successfull!"
