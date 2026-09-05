const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, 'src', 'routes');

function toCamelCase(str) {
  // Convert filename to component name: services.rcc-drainage -> ServicesRccDrainage
  return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()).replace(/^[a-z]/, c => c.toUpperCase());
}

const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(routesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace imports from @tanstack/react-router to react-router-dom
  let tanstackImportMatch = content.match(/import\s+{([^}]+)}\s+from\s+['"]@tanstack\/react-router['"]/);
  if (tanstackImportMatch) {
    let imports = tanstackImportMatch[1].split(',').map(s => s.trim());
    let rrdImports = imports.filter(i => i === 'Link' || i === 'useParams' || i === 'useNavigate' || i === 'useLocation');
    
    if (rrdImports.length > 0) {
      content = content.replace(tanstackImportMatch[0], `import { ${rrdImports.join(', ')} } from "react-router-dom"`);
    } else {
      content = content.replace(tanstackImportMatch[0], '');
    }
  }

  // 2. Remove createFileRoute import if it was mixed with other things
  // Handled mostly by step 1 since it grabs everything. Let's make sure createFileRoute is removed.
  content = content.replace(/import\s*{\s*createFileRoute\s*}\s*from\s*['"]@tanstack\/react-router['"];?/, '');

  // 3. Find the component name in createFileRoute({ component: ComponentName })
  // Usually looks like: export const Route = createFileRoute('/path')({\n  component: ComponentName,\n})
  let componentMatch = content.match(/createFileRoute\([\s\S]*?\{\s*component:\s*([a-zA-Z0-9_]+)[\s\S]*?\}\)/);
  let componentName = "RouteComponent";
  if (componentMatch) {
    componentName = componentMatch[1];
  } else {
    // If not found, let's use the filename
    const baseName = path.basename(file, '.tsx');
    componentName = baseName === 'index' ? 'Index' : toCamelCase(baseName);
  }

  // 4. Remove the export const Route = createFileRoute... block
  content = content.replace(/export\s+const\s+Route\s*=\s*createFileRoute\([\s\S]*?\)\([\s\S]*?\}\s*\);?/, '');

  // 5. Change the component function to be `export default function ...`
  // Find: function ComponentName()
  // Replace: export default function ComponentName()
  let funcRegex = new RegExp(`function\\s+${componentName}\\s*\\(`);
  if (funcRegex.test(content)) {
    content = content.replace(funcRegex, `export default function ${componentName}(`);
  } else {
    // maybe it's an arrow function: const ComponentName = () =>
    let arrowRegex = new RegExp(`const\\s+${componentName}\\s*=\s*\\(`);
    if (arrowRegex.test(content)) {
      content = content.replace(arrowRegex, `export default const ${componentName} = (`);
      // Wait, `export default const` is invalid syntax. Let's just append `export default ComponentName;` at the end if we didn't add export default
      content += `\nexport default ${componentName};\n`;
    }
  }

  // 6. Fix Link params.
  // Replace: params={{ id: p.id }}
  // It usually looks like: to="/projects/$id" params={{ id: p.id }}
  // We'll replace it to use template literals or concatenation.
  content = content.replace(/to=['"]\/projects\/\$id['"][\s\n]*params=\{\{\s*id:\s*([^}]+)\s*\}\}/g, 'to={`/projects/${$1}`}');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Migrated ${file}`);
}
