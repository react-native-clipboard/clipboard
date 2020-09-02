#pragma once
#include "pch.h"

#include <functional>
#include <string>
#include <NativeModules.h>
#include <../include/ReactWindowsCore/cdebug.h>
#include <../Common/unicode.h>

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
		void GetString(bool error, React::ReactPromise<React::JSValue>&& result) noexcept
		{
			if (error) {
				result.Reject("Failure");
			}
			else {
				auto dataPackageView = datatransfer::Clipboard::GetContent();
				if (dataPackageView.Contains(datatransfer::StandardDataFormats::Text())) {
					dataPackageView.GetTextAsync().Completed([result, dataPackageView](IAsyncOperation<winrt::hstring> info, AsyncStatus status) {
						if (status == AsyncStatus::Completed) {
							auto text = ::Microsoft::Common::Unicode::Utf16ToUtf8(info.GetResults());
							result.Resolve(React::JSValue{ text });
						}
						else {
							result.Reject("Failure");
						}
					});
					return;
				}
				result.Reject("Failure");
			}
		}

		REACT_METHOD(SetString, L"setString");
		void SetString(std::string const& str) noexcept
		{
			datatransfer::DataPackage dataPackage{};
			dataPackage.SetText(::Microsoft::Common::Unicode::Utf8ToUtf16(str));
			datatransfer::Clipboard::SetContent(dataPackage);
		}

	};
}