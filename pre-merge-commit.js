const child_process = require('child_process');
const fs = require('fs');

const gitDiff = child_process.execSync('git diff --name-only --diff-filter=ACM HEAD').toString();
const hasImageTf = gitDiff.split('\n').some((file) => file.endsWith('-images.tf'));

if (hasImageTf) {
  const commitMessageFilePath = '.git/COMMIT_EDITMSG';
  const commitMessageFileContent = fs.readFileSync(commitMessageFilePath, 'utf-8');
  const commitMessageLines = commitMessageFileContent.trim().split('\n');
  const commitMessageType = commitMessageLines[0].trim();

  if (commitMessageType !== 'version') {
    console.error('Error: The commit message type must be "version" when modifying "*-images.tf" files.');
    process.exit(1);
  }
}
