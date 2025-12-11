#!/bin/bash

# Test script for MoMo Activities API
# Usage: ./test-api.sh [url]

API_URL="${1:-http://localhost:3000/api/momo-activities}"
FUND_URL="https://quy.momo.vn/v2/N3lyQkiNmZ?e14fe"

echo "Testing MoMo Activities API..."
echo "API URL: $API_URL"
echo "Fund URL: $FUND_URL"
echo ""

response=$(curl -s "${API_URL}?url=${FUND_URL}")

echo "Response:"
echo "$response" | jq '.' 2>/dev/null || echo "$response"

echo ""
echo "---"
echo "If you see 'No activities found', check Vercel logs for debug info"

