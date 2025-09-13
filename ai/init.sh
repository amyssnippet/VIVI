#!/bin/bash

set -e

GREEN="\033[1;32m"
CYAN="\033[1;36m"
YELLOW="\033[1;33m"
RESET="\033[0m"

banner() {
  echo -e "\033[1;32m"
  echo "██    ██ ██ ██    ██ ██ "
  echo "██    ██ ██ ██    ██ ██ "
  echo "██    ██ ██ ██    ██ ██ "
  echo " ██  ██  ██  ██  ██  ██ "
  echo "  ████   ██   ████   ██ "
  echo -e "\033[0m"
}


section() {
  echo -e "${CYAN}\n[== $1 ==]${RESET}"
}

progress() {
  echo -ne "${YELLOW}$1...${RESET}\n"
}

banner

section "Installing Ollama"
curl -fsSl https://ollama.com/install.sh | sh
echo -e "${GREEN}Ollama Installed Successfully${RESET}"

section "Starting Ollama Server"
ollama serve >/dev/null 2>&1 &
sleep 5
until curl -s http://127.0.0.1:11434/api/tags >/dev/null; do
  progress "Waiting for Ollama to be ready"
  sleep 2
done
echo -e "${GREEN}Ollama Server is Ready${RESET}"

section "Downloading Chat Base Model Architecture"
ollama run qwen3 --verbose <<< "exit"
echo -e "${GREEN}Chat Base Model Architecture Downloaded${RESET}"

section "Downloading Vision Model Architecture"
ollama run qwen2.5vl --verbose <<< "exit"
echo -e "${GREEN}Vision Model Architecture Downloaded${RESET}"

section "Preparing Dataset for vivi LLM"
cat > Modelfile <<EOF
FROM qwen3
PARAMETER temperature 1
SYSTEM """
You are VIVI, a chatbot developed for VIVI Enterprises to serve various businesses by creator Amol Yadav.
"""
EOF
echo -e "${GREEN}Dataset Prepared${RESET}"

section "Training vivi LLM"
ollama create vivi -f ./Modelfile
rm Modelfile
echo -e "${GREEN}vivi Model Trained Successfully${RESET}"

section "Preparing Dataset for vivi-vl"
cat > Modelfile <<EOF
FROM qwen2.5vl
PARAMETER temperature 1
SYSTEM """
You are VIVI VL, a document parser model developed for VIVI Enterprises to serve various businesses by creator Amol Yadav.
"""
EOF
echo -e "${GREEN}Dataset Prepared${RESET}"

section "Training vivi-vl LLM"
ollama create vivi-vl -f ./Modelfile
rm Modelfile
echo -e "${GREEN}vivi-vl Model Trained Successfully${RESET}"

section "AI Infrastructure Setup Complete"
echo -e "${CYAN}>>> System Ready. All Models Trained. <<<${RESET}"
