#!/bin/bash 
echo "# CHANGELOG" > "CHANGELOG.md"
for tag in `git tag -l`;do
  echo "## ${tag}" >> "CHANGELOG.md"
  git show ${tag} | grep -Eo "(fix|feat|build):\s?.*\b" | xargs echo >> "CHANGELOG.md"
done