#!/bin/bash

# Documentation Code Validation Script
# Extracts Solidity code from documentation and validates compilation

set -e

echo "🔍 Validating Solidity code blocks in documentation..."

# Create temporary directory for validation
TEMP_DIR=$(mktemp -d)
VALIDATION_COUNT=0
ERROR_COUNT=0

# Function to cleanup
cleanup() {
    rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

# Extract and validate Solidity code blocks from markdown files
find docs/ -name "*.md" -print0 | while IFS= read -r -d '' file; do
    echo "Checking: $file"
    
    # Extract Solidity code blocks
    awk '
    /```solidity/ { in_code=1; code_block++; next }
    /```/ && in_code { in_code=0; next }
    in_code { 
        if (code_block > 0) {
            print > "'$TEMP_DIR'/code_block_" code_block ".sol"
        }
    }
    ' "$file"
done

# Validate each extracted code block
for sol_file in "$TEMP_DIR"/*.sol; do
    if [ -f "$sol_file" ]; then
        VALIDATION_COUNT=$((VALIDATION_COUNT + 1))
        echo "  - Validating code block: $(basename "$sol_file")"
        
        # Add minimal Solidity structure for validation
        {
            echo "// SPDX-License-Identifier: MIT"
            echo "pragma solidity ^0.8.22;"
            echo ""
            echo "// Validation imports"
            echo "import \"@openzeppelin/contracts/token/ERC20/IERC20.sol\";"
            echo "import \"@openzeppelin/contracts/access/Ownable.sol\";"
            echo "import \"@openzeppelin/contracts/security/ReentrancyGuard.sol\";"
            echo ""
            cat "$sol_file"
        } > "${sol_file}.validated"
        
        # Attempt to compile with forge
        if forge build --contracts "${sol_file}.validated" --force 2>/dev/null; then
            echo "    ✅ Valid"
        else
            echo "    ❌ Compilation error in $file"
            ERROR_COUNT=$((ERROR_COUNT + 1))
            
            # Show the problematic code for debugging
            echo "    Problematic code:"
            head -10 "$sol_file" | sed 's/^/    | /'
        fi
    fi
done

echo ""
echo "📊 Validation Summary:"
echo "  - Code blocks checked: $VALIDATION_COUNT"
echo "  - Compilation errors: $ERROR_COUNT"

if [ $ERROR_COUNT -eq 0 ]; then
    echo "  ✅ All documentation code blocks are valid!"
    exit 0
else
    echo "  ❌ Found compilation errors in documentation"
    exit 1
fi
