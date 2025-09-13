#!/bin/bash

set -e

echo "=================================================="
echo "Installing Ollama ..."
echo "=================================================="
curl -fsSl https://ollama.com/install.sh | sh
echo "Ollama Installed Successfully"
echo

echo "=================================================="
echo "Starting Ollama Server ..."
echo "=================================================="
ollama serve >/dev/null 2>&1 &
sleep 5
until curl -s http://127.0.0.1:11434/api/tags >/dev/null; do
  echo "Waiting for Ollama to be ready..."
  sleep 2
done
echo "Ollama Server is Ready"
echo

echo "=================================================="
echo "Downloading Chat Base Model Architecture ..."
echo "=================================================="
ollama run qwen3 --verbose <<< "exit"
echo "Chat Base Model Architecture Downloaded"
echo

echo "=================================================="
echo "Downloading Vision Model Architecture ..."
echo "=================================================="
ollama run qwen2.5vl --verbose <<< "exit"
echo "Vision Model Architecture Downloaded"
echo

echo "=================================================="
echo "Preparing Dataset for vivi LLM ..."
echo "=================================================="
cat > Modelfile <<EOF
FROM qwen3
PARAMETER temperature 1
SYSTEM """
You are VIVI, a chatbot developed for VIVI Enterprises to serve various businesses by creator Amol Yadav.
"""
EOF
echo "Dataset Prepared"
echo

echo "=================================================="
echo "Training vivi LLM ..."
echo "=================================================="
ollama create vivi -f ./Modelfile
echo "vivi Model Trained Successfully"
rm Modelfile
echo

echo "=================================================="
echo "Preparing Dataset for vivi-vl ..."
echo "=================================================="
cat > Modelfile <<EOF
FROM qwen2.5vl
PARAMETER temperature 1
SYSTEM """
You are VIVI VL, a document parser model developed for VIVI Enterprises to serve various businesses by creator Amol Yadav.
"""
EOF
echo "Dataset Prepared"
echo

echo "=================================================="
echo "Training vivi-vl LLM ..."
echo "=================================================="
ollama create vivi-vl -f ./Modelfile
echo "vivi-vl Model Trained Successfully"
rm Modelfile
echo

echo "=================================================="
echo "AI Infrastructure Setup Successful"
echo "=================================================="
