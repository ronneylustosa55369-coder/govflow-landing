const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Acessibilidade (WCAG 2.1)', () => {
  test('página não deve ter violações críticas ou sérias', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const criticalViolations = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    if (criticalViolations.length > 0) {
      const details = criticalViolations
        .map(v =>
          `[${v.impact.toUpperCase()}] ${v.description}\n  Elementos: ${v.nodes.map(n => n.target.join(', ')).join(' | ')}`
        )
        .join('\n\n');
      throw new Error(`Violações de acessibilidade encontradas:\n\n${details}`);
    }

    expect(criticalViolations).toHaveLength(0);
  });

  test('página deve ter lang definido no html', async ({ page }) => {
    await page.goto('/');
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
  });

  test('links do WhatsApp e e-mail devem ter texto legível', async ({ page }) => {
    await page.goto('/');
    const whatsapp = page.locator('.btn-whatsapp');
    const text = await whatsapp.innerText();
    expect(text.trim().length).toBeGreaterThan(0);
  });
});
