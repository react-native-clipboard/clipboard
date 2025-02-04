#pragma once

#include "pch.h"
#include "resource.h"

#if __has_include("codegen/NativeClipboardDataTypes.g.h")
  #include "codegen/NativeClipboardDataTypes.g.h"
#endif
#include "codegen/NativeClipboardModuleSpec.g.h"

#include <functional>
#include <string>
#include "NativeModules.h"

#include <winrt/Windows.Foundation.h>
#include <winrt/Windows.ApplicationModel.DataTransfer.h>

using namespace winrt::Microsoft::ReactNative;
using namespace winrt::Windows::Foundation;
namespace datatransfer = winrt::Windows::ApplicationModel::DataTransfer;

namespace winrt::Clipboard
{

  REACT_MODULE(ClipboardModule, L"RNCClipboard");
  struct ClipboardModule
  {
    REACT_INIT(Initialize);
    void Initialize(const winrt::Microsoft::ReactNative::ReactContext& reactContext) noexcept {
      m_context = reactContext;
    }
    
    REACT_METHOD(GetString, L"getString");
    void GetString(React::ReactPromise<std::string>&& result) noexcept;

    REACT_METHOD(SetString, L"setString");
    void SetString(std::string const& str) noexcept;

    REACT_METHOD(AddListener, L"addListener");
    void AddListener(std::string const& event) noexcept;

    REACT_METHOD(RemoveListeners, L"removeListeners");
    void RemoveListeners(int count) noexcept;

  private:
    int _listenerCount = 0;
    winrt::Microsoft::ReactNative::ReactContext m_context;
  };

} // namespace winrt::Clipboard