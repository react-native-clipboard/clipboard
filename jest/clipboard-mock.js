/**
 * @format
 */
/* eslint-env jest */

const ClipboardMock = {
  getString: jest.fn().mockResolvedValue('mockString'),
  getImagePNG: jest.fn(),
  getImageJPG: jest.fn(),
  setImage: jest.fn(),
  setString: jest.fn(),
  hasString: jest.fn().mockResolvedValue(true),
  hasImage: jest.fn().mockResolvedValue(true),
  hasURL: jest.fn().mockResolvedValue(true),
  addListener: jest.fn(),
  removeAllListeners: jest.fn(),
};

const useClipboard = jest.fn(() => ['mockString', jest.fn()]);

const RNCClipboardMock = {
  ...ClipboardMock,
  useClipboard,
};

module.exports = RNCClipboardMock;
