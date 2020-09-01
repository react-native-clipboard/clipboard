#pragma once
#include "pch.h"

#include <functional>
#include <string>
#include <NativeModules.h>

namespace Clipboard {
	REACT_MODULE(ClipboardModule);
	struct ClipboardModule
	{
		REACT_METHOD(GetText, L"getText");
		std::string GetText() noexcept
		{
			return "some text";
		}
	};
}