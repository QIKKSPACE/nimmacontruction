const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, 'src', 'routes');
const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(routesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove the leftover junk from the previous regex
  // It looks like:
  // ,
  //   component: Page,
  // });
  
  content = content.replace(/,[\s\n]*component:\s*[a-zA-Z0-9_]+,[\s\n]*\}\);?/g, '');
  
  // Also remove the stray semicolon at the start of the file if it exists
  content = content.replace(/^;\s*/, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned ${file}`);
}
