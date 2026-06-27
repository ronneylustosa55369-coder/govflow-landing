const { test, expect } = require('@playwright/test');

test.describe('Navegação', () => {
  test('logo GovFlow está visível', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav .nav-logo')).toContainText('GovFlow');
  });

  test('botão do nav aponta para #contato', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('nav .nav-cta');
    await expect(cta).toHaveAttribute('href', '#contato');
  });
});

test.describe('Hero', () => {
  test('título principal está visível', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero h1')).toContainText('Gestão pública');
  });

  test('estatísticas estão visíveis', async ({ page }) => {
    await page.goto('/');
    const nums = page.locator('.stat-num');
    await expect(nums.nth(0)).toContainText('100%');
    await expect(nums.nth(1)).toContainText('R$40/mês');
    await expect(nums.nth(2)).toContainText('≤ R$65k');
    await expect(nums.nth(3)).toContainText('2h');
  });

  test('"Ver demonstração" aponta para #contato', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.btn-primary').first()).toHaveAttribute('href', '#contato');
  });

  test('"Conheça os módulos" aponta para #modulos', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.btn-secondary').first()).toHaveAttribute('href', '#modulos');
  });
});

test.describe('Módulos', () => {
  test('seção de módulos tem id correto', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#modulos')).toBeVisible();
  });

  test('exibe exatamente 6 módulos', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.modulo-card')).toHaveCount(6);
  });
});

test.describe('Diferenciais', () => {
  test('exibe exatamente 5 diferenciais', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.diferencial .dif-item')).toHaveCount(5);
  });
});

test.describe('Preços', () => {
  test('seção de preços tem id correto', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#precos')).toBeVisible();
  });

  test('exibe exatamente 5 faixas de preço', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.faixa-card')).toHaveCount(5);
  });

  test('faixa 3 tem classe destaque', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.faixa-card.destaque')).toHaveCount(1);
    await expect(page.locator('.faixa-card.destaque')).toContainText('Faixa 3');
  });

  test('nota de dispensa de licitação está presente', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.precos-nota')).toContainText('Art. 75, II, Lei 14.133/2021');
  });
});

test.describe('CTA e Contato', () => {
  test('seção de contato tem id correto', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#contato')).toBeVisible();
  });

  test('botão do WhatsApp tem link correto', async ({ page }) => {
    await page.goto('/');
    const whatsapp = page.locator('.btn-whatsapp');
    const href = await whatsapp.getAttribute('href');
    expect(href).toContain('wa.me/5586994022645');
  });

  test('link de e-mail está presente', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href="mailto:govflow.contato@gmail.com"]')).toBeVisible();
  });
});

test.describe('Footer', () => {
  test('logo no footer está visível', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer .footer-logo')).toContainText('GovFlow');
  });

  test('desenvolvedor INOVEX Consult está presente', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer .footer-by')).toContainText('INOVEX Consult');
  });
});

test.describe('Responsividade', () => {
  test('layout mobile (375px) — página renderiza sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });

  test('layout tablet (768px) — seções visíveis', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('.hero h1')).toBeVisible();
    await expect(page.locator('#modulos')).toBeVisible();
  });
});
