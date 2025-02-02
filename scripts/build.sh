#!/bin/bash
# Clean and rebuild
rm -rf out
npm run compile

# Ensure the bash script is copied to the out directory
cp src/calc_context_window.sh out/

# Make it executable
chmod +x out/calc_context_window.sh
