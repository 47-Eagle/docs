#!/bin/bash

# ABI Documentation Generation Script
# Extracts ABIs and generates human-readable documentation

set -e

echo "📋 Generating ABI Documentation..."

# Create ABI documentation directory
mkdir -p docs/abi docs/contract-interfaces

# Process each contract
find out -name "*.json" | while read -r contract_file; do
    # Extract contract name from path
    contract_name=$(basename "$(dirname "$contract_file")")
    
    if [ "$contract_name" != "out" ] && jq -e '.abi' "$contract_file" > /dev/null 2>&1; then
        echo "Processing: $contract_name"
        
        # Extract ABI
        jq '.abi' "$contract_file" > "docs/abi/${contract_name}.json"
        
        # Generate human-readable interface documentation
        cat > "docs/contract-interfaces/${contract_name}.md" << EOF
---
id: ${contract_name,,}
title: $contract_name Interface
sidebar_label: $contract_name
---

# $contract_name Interface

Auto-generated interface documentation for the $contract_name contract.

## Contract Functions

\`\`\`solidity
EOF
        
        # Extract function signatures from ABI
        jq -r '.[] | select(.type == "function") | 
        "function " + .name + "(" + 
        ([.inputs[]? | .type + " " + .name] | join(", ")) + 
        ")" + 
        (if .stateMutability == "view" or .stateMutability == "pure" then " " + .stateMutability else "" end) +
        (if .outputs | length > 0 then " returns (" + ([.outputs[]? | .type] | join(", ")) + ")" else "" end) +
        ";"' "docs/abi/${contract_name}.json" >> "docs/contract-interfaces/${contract_name}.md"
        
        cat >> "docs/contract-interfaces/${contract_name}.md" << EOF
\`\`\`

## Events

\`\`\`solidity
EOF
        
        # Extract event signatures from ABI
        jq -r '.[] | select(.type == "event") | 
        "event " + .name + "(" + 
        ([.inputs[]? | (if .indexed then "indexed " else "" end) + .type + " " + .name] | join(", ")) + 
        ");"' "docs/abi/${contract_name}.json" >> "docs/contract-interfaces/${contract_name}.md"
        
        cat >> "docs/contract-interfaces/${contract_name}.md" << EOF
\`\`\`

## Errors

\`\`\`solidity
EOF
        
        # Extract custom errors from ABI
        jq -r '.[] | select(.type == "error") | 
        "error " + .name + "(" + 
        ([.inputs[]? | .type + " " + .name] | join(", ")) + 
        ");"' "docs/abi/${contract_name}.json" >> "docs/contract-interfaces/${contract_name}.md"
        
        cat >> "docs/contract-interfaces/${contract_name}.md" << EOF
\`\`\`

---
*Auto-generated from contract compilation on $(date)*
EOF
        
    fi
done

# Create ABI index file
cat > "docs/abi/README.md" << EOF
# Contract ABIs

This directory contains the Application Binary Interface (ABI) files for all Eagle Omnichain Vault smart contracts.

## Available Contracts

EOF

# List all generated ABI files
for abi_file in docs/abi/*.json; do
    if [ -f "$abi_file" ]; then
        contract_name=$(basename "$abi_file" .json)
        echo "- [$contract_name](./${contract_name}.json)" >> "docs/abi/README.md"
    fi
done

cat >> "docs/abi/README.md" << EOF

## Usage

These ABI files can be used to:
- Integrate with frontend applications
- Create contract interfaces for testing
- Generate TypeScript types with tools like TypeChain
- Build deployment scripts and automation

## Format

All ABI files are in standard JSON format compatible with:
- Ethereum development tools (Hardhat, Foundry)
- Web3 libraries (ethers.js, web3.js)
- Contract verification services (Etherscan, etc.)

---
*Auto-generated from contract compilation on $(date)*
EOF

echo "✅ ABI Documentation generated successfully!"
echo "   - ABI files: docs/abi/"
echo "   - Interface docs: docs/contract-interfaces/"
