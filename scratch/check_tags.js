const fs = require('fs');
const code = fs.readFileSync('/Users/franco/Documents/Codex/2026-05-19/crie-uma-p-gina-de-vendas/app/admin/page.tsx', 'utf8');

// A simple stack-based parser to find tag mismatches
function checkTags(html) {
  const tagRegex = /<\/?([a-zA-Z0-9:-]+)(?:\s+[^>]*?)?>/g;
  let match;
  const stack = [];
  const lines = html.split('\n');

  // Helper to get line number from character index
  function getLineNum(index) {
    let count = 0;
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count >= index) return i + 1;
    }
    return lines.length;
  }

  while ((match = tagRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const tagName = match[1];
    
    // Ignore uppercase react components or types
    if (/^[A-Z]/.test(tagName)) {
      continue;
    }

    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || ['img', 'input', 'br', 'hr', 'meta', 'link', 'textarea'].includes(tagName.toLowerCase());

    const line = getLineNum(match.index);

    if (isSelfClosing && !isClosing) {
      continue;
    }

    if (!isClosing) {
      stack.push({ tag: tagName, line, fullTag });
    } else {
      if (stack.length === 0) {
        console.log(`Error: Closing tag </${tagName}> on line ${line} has no matching open tag.`);
        continue;
      }
      const last = stack.pop();
      if (last.tag !== tagName) {
        console.log(`Error: Mismatched tag on line ${line}. Closed </${tagName}> but expected </${last.tag}> (opened on line ${last.line}: ${last.fullTag}).`);
        // Put it back to try to recover
        stack.push(last);
      }
    }
  }

  if (stack.length > 0) {
    console.log('\nUnclosed tags remaining on stack:');
    stack.forEach(t => {
      console.log(`- <${t.tag}> opened on line ${t.line}: ${t.fullTag}`);
    });
  } else {
    console.log('All tags are perfectly balanced!');
  }
}

checkTags(code);
