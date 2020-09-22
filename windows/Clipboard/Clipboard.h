#pragma once
#include "pch.h"

#include <functional>
#include <string>
#include <NativeModules.h>

#include <winrt/Windows.Foundation.h>
#include <winrt/Windows.ApplicationModel.DataTransfer.h>

using namespace winrt::Microsoft::ReactNative;
using namespace winrt::Windows::Foundation;
namespace datatransfer = winrt::Windows::ApplicationModel::DataTransfer;

namespace NativeClipboard {
  REACT_MODULE(ClipboardModule, L"RNCClipboard");
  struct ClipboardModule
  {

    REACT_METHOD(GetString, L"getString");
    void GetString(React::ReactPromise<std::string>&& result) noexcept;

    REACT_METHOD(SetString, L"setString");
    void SetString(std::string const& str) noexcept;
  };
}