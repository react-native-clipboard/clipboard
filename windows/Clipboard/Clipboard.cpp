#include "pch.h"
#include "Clipboard.h"
#include <Unicode.h>

namespace NativeClipboard {
  void ClipboardModule::GetString(React::ReactPromise<std::string>&& promise) noexcept {
    auto dataPackageView = datatransfer::Clipboard::GetContent();
    if (dataPackageView.Contains(datatransfer::StandardDataFormats::Text())) {
      dataPackageView.GetTextAsync().Completed([promise, dataPackageView](IAsyncOperation<winrt::hstring> info, AsyncStatus status) {
        if (status == AsyncStatus::Completed) {
          auto text = Microsoft::Common::Unicode::Utf16ToUtf8(info.GetResults());
          promise.Resolve(text);
        }
        else {
          promise.Reject("Failure");
        }
      });
      return;
    }
    promise.Resolve("");
  }

  void ClipboardModule::SetString(std::string const& str) noexcept
  {
    datatransfer::DataPackage dataPackage{};
    dataPackage.SetText(Microsoft::Common::Unicode::Utf8ToUtf16(str));
    datatransfer::Clipboard::SetContent(dataPackage);
  }

  void ClipboardModule::AddListener(std::string const& event) noexcept
  {
    _listenerCount++;
  }

  void ClipboardModule::RemoveListeners(int count) noexcept
  {
    _listenerCount--;
    if (_listenerCount == 0) {
      // Disconnect any native eventing here
    }
  }
}