#!/bin/bash 
echo "#ChangeLog" > "ChangeLog.md"
for tag in `git tag -l`;do
  echo "##${tag}" >> "ChangeLog.md"
  git show ${tag} | grep -Eo "(fix|feat|build):\s?.*\b" | xargs echo >> "ChangeLog.md"
done