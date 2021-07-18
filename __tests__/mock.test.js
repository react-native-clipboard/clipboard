const mockClipboard = require('../jest/clipboard-mock');

jest.mock('../dist/index.js', () => mockClipboard);

describe('mockClipboard', () => {
  const {Clipboard, useClipboard} = require('../dist/index.js');

  it('can get mock string', async () => {
    const result = await Clipboard.getString();
    const expected = 'mockString';
    expect(result).toBe(expected);
  });

  it('can get useClipboardHook', async () => {
    const [result] = useClipboard();
    const expected = 'mockString';
    expect(result).toBe(expected);
  });
});
