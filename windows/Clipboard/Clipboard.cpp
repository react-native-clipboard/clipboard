#include "pch.h"
#include "Clipboard.h"
#include <Unicode.h>

namespace NativeClipboard {
  void ClipboardModule::GetString(React::ReactPromise<std::string>&& promise) noexcept {
    auto dataPackageView = datatransfer::Clipboard::GetContent();
    if (dataPackageView.Contains(datatransfer::StandardDataFormats::Text())) {
      dataPackageView.GetTextAsync().Completed([promise, dataPackageView](IAsyncOperation<winrt::hstring> info, AsyncStatus status) {
        if (status == AsyncStatus::Completed) {
          auto text = winrt::to_string(info.GetResults());
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
    _context.UIDispatcher().Post([str](){
      datatransfer::DataPackage dataPackage{};
      dataPackage.SetText(winrt::to_hstring(str));
      datatransfer::Clipboard::SetContent(dataPackage);
    });
  }
}