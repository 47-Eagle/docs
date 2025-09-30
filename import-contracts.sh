#!/bin/bash

# Eagle OVault Contract Import Script
# This script imports contracts from the v1 repository

set -e

echo "🦅 Eagle OVault Contract Import Started..."

# Check if v1 repository exists locally
if [ ! -d "../v1" ]; then
    echo "📥 Cloning v1 repository..."
    cd ..
    git clone https://github.com/47-Eagle/v1.git
    cd eagle-docs-clean
else
    echo "✅ v1 repository found locally"
fi

# Create contracts directory structure
echo "📁 Creating directory structure..."
mkdir -p contracts/{core,interfaces,libraries,test}

# Import contracts from v1
echo "📋 Importing contract source files..."
if [ -d "../v1/contracts" ]; then
    cp -r ../v1/contracts/* ./contracts/
    echo "✅ Contracts imported successfully"
else
    echo "❌ Error: contracts directory not found in v1 repository"
    echo "Please check the repository structure at: https://github.com/47-Eagle/v1/tree/main/contracts"
    exit 1
fi

# Validate Solidity files
echo "🔍 Validating imported contracts..."
find contracts/ -name "*.sol" | while read file; do
    echo "  - Checking: $file"
    # Check if file has basic Solidity structure
    if grep -q "pragma solidity" "$file"; then
        echo "    ✅ Valid Solidity file"
    else
        echo "    ⚠️  Warning: File may not be valid Solidity"
    fi
done

# Update git to track contracts
echo "📝 Adding contracts to git tracking..."
git add contracts/
git add import-contracts.sh

echo ""
echo "🎉 Contract import completed!"
echo ""
echo "Next steps:"
echo "1. Review imported contracts in ./contracts/"
echo "2. Update documentation to reference actual source code"
echo "3. Run 'npm run validate-contracts' to check compilation"
echo "4. Commit changes: git commit -m 'Import contract source code from v1 repository'"

echo ""
echo "To validate contracts:"
echo "  npm install -g solc"
echo "  find contracts/ -name '*.sol' -exec solc --bin {} \\;"
