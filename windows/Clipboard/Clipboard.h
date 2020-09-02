#pragma once
#include "pch.h"

#include <functional>
#include <string>
#include <NativeModules.h>
#include <../include/ReactWindowsCore/cdebug.h>

using namespace winrt::Microsoft::ReactNative;

namespace Clipboard {
	REACT_MODULE(ClipboardModule, L"RNCClipboard");
	struct ClipboardModule
	{

		REACT_METHOD(GetString, L"getString");
		JSValue GetString() noexcept
		{
			cdebug << "GetString" << std::endl;
			return "some text";
		}

		REACT_METHOD(SetString, L"setString");
		static void SetString(std::string const& str) noexcept
		{
			cdebug << "SetString" << std::endl;
		}

	};
}