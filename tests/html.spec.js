const { test, expect } = require('@playwright/test');
const { HtmlValidate } = require('html-validate');
const { readFileSync } = require('fs');
const path = require('path');

const htmlvalidate = new HtmlValidate({
  extends: ['html-validate:recommended'],
  rules: {
    'no-trailing-whitespace': 'off',
    'no-inline-style': 'off',
  },
});

test.describe('Validação de HTML', () => {
  test('index.html não deve ter erros de marcação', async () => {
    const html = readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
    const result = await htmlvalidate.validateString(html);

    if (!result.valid) {
      const errors = result.results
        .flatMap(r => r.messages)
        .map(m => `Linha ${m.line}: [${m.severity === 2 ? 'erro' : 'aviso'}] ${m.message}`)
        .join('\n');
      throw new Error(`Problemas encontrados no index.html:\n${errors}`);
    }

    expect(result.valid).toBe(true);
  });
});
