const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, 'src', 'routes');
const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(routesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if it already has export default
  if (!content.includes('export default')) {
    // Look for the main function component (usually capital letter after function)
    // Find: function Something()
    content = content.replace(/function\s+([A-Z][a-zA-Z0-9_]*)\s*\(/, 'export default function $1(');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Added export default to ${file}`);
  }
}
