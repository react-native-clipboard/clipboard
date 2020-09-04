#include "pch.h"
#include "Clipboard.h"
#include <Unicode.h>

namespace NativeClipboard {
  void ClipboardModule::GetString(bool error, React::ReactPromise<React::JSValue>&& result) noexcept {
    if (error) {
      result.Reject("Failure");
    }
    else {
      auto dataPackageView = datatransfer::Clipboard::GetContent();
      if (dataPackageView.Contains(datatransfer::StandardDataFormats::Text())) {
        dataPackageView.GetTextAsync().Completed([result, dataPackageView](IAsyncOperation<winrt::hstring> info, AsyncStatus status) {
          if (status == AsyncStatus::Completed) {
            auto text = Microsoft::Common::Unicode::Utf16ToUtf8(info.GetResults());
            result.Resolve(React::JSValue{ text });
          }
          else {
            result.Reject("Failure");
          }
        });
        return;
      }
      result.Resolve("");
    }
  }

  void ClipboardModule::SetString(std::string const& str) noexcept
  {
    datatransfer::DataPackage dataPackage{};
    dataPackage.SetText(Microsoft::Common::Unicode::Utf8ToUtf16(str));
    datatransfer::Clipboard::SetContent(dataPackage);
  }
}