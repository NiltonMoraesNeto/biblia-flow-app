import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveThemeName, themes } from '../src/theme/tokens.ts';

export function contrast(foreground, background) {
  function luminance(hex) {
    const channels = hex
      .slice(1)
      .match(/.{2}/g)
      .map((value) => {
        const srgb = Number.parseInt(value, 16) / 255;
        return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
      });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  }
  const values = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a,
  );
  return (values[0] + 0.05) / (values[1] + 0.05);
}
test('contrast measurement matches known reference pairs', () => {
  assert.equal(contrast('#000000', '#ffffff'), 21);
  assert.equal(contrast('#365B4C', '#365B4C'), 1);
});
test('system preference follows changes and falls back to light without native scheme', () => {
  assert.equal(resolveThemeName('system', 'dark'), 'dark');
  assert.equal(resolveThemeName('system', 'light'), 'light');
  assert.equal(resolveThemeName('system', null), 'light');
  assert.equal(resolveThemeName('system', undefined), 'light');
  assert.equal(resolveThemeName('system', 'unspecified'), 'light');
});
test('manual preference overrides system until user chooses system again', () => {
  for (const system of ['dark', 'light', 'unspecified', null]) {
    assert.equal(resolveThemeName('light', system), 'light');
    assert.equal(resolveThemeName('dark', system), 'dark');
  }
  assert.equal(resolveThemeName('system', 'dark'), 'dark');
});
for (const [name, theme] of Object.entries(themes)) {
  test(`${name}: every text and control state meets AA contrast`, () => {
    const textPairs = [
      ['text', 'background'],
      ['textMuted', 'background'],
      ['onSurface', 'surface'],
      ['onPrimary', 'primary'],
      ['text', 'controlBackground'],
    ];
    for (const [foreground, background] of textPairs) {
      const ratio = contrast(theme[foreground], theme[background]);
      assert.ok(
        ratio >= 4.5,
        `${name}: ${foreground}/${background} = ${ratio.toFixed(2)}`,
      );
    }
    assert.ok(contrast(theme.border, theme.controlBackground) >= 3);
    assert.ok(contrast(theme.primary, theme.background) >= 3);
  });
}
