#include "pch.h"

#include "ReactPackageProvider.h"
#if __has_include("ReactPackageProvider.g.cpp")
#include "ReactPackageProvider.g.cpp"
#endif

#include "Clipboard.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::Clipboard::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
  #ifdef USE_FABRIC    
      AddAttributedModules(packageBuilder, true);
  #else
      AddAttributedModules(packageBuilder);
  #endif
}

} // namespace winrt::Clipboard::implementation
