
/*
 * This file is auto-generated from a NativeModule spec file in js.
 *
 * This is a C++ Spec class that should be used with MakeTurboModuleProvider to register native modules
 * in a way that also verifies at compile time that the native module matches the interface required
 * by the TurboModule JS spec.
 */
#pragma once


#include <NativeModules.h>
#include <tuple>

namespace ClipboardCodegen {

struct ClipboardModuleSpec : winrt::Microsoft::ReactNative::TurboModuleSpec {
  static constexpr auto methods = std::tuple{
      Method<void(Promise<std::string>) noexcept>{0, L"getString"},
      Method<void(Promise<std::vector<std::string>>) noexcept>{1, L"getStrings"},
      Method<void(Promise<std::string>) noexcept>{2, L"getImagePNG"},
      Method<void(Promise<std::string>) noexcept>{3, L"getImageJPG"},
      Method<void(std::string, Promise<void>) noexcept>{4, L"setImage"},
      Method<void(Promise<std::string>) noexcept>{5, L"getImage"},
      Method<void(std::string) noexcept>{6, L"setString"},
      Method<void(std::vector<std::string>) noexcept>{7, L"setStrings"},
      Method<void(Promise<bool>) noexcept>{8, L"hasString"},
      Method<void(Promise<bool>) noexcept>{9, L"hasImage"},
      Method<void(Promise<bool>) noexcept>{10, L"hasURL"},
      Method<void(Promise<bool>) noexcept>{11, L"hasNumber"},
      Method<void(Promise<bool>) noexcept>{12, L"hasWebURL"},
      Method<void() noexcept>{13, L"setListener"},
      Method<void() noexcept>{14, L"removeListener"},
      Method<void(std::string) noexcept>{15, L"addListener"},
      Method<void(int) noexcept>{16, L"removeListeners"},
  };

  template <class TModule>
  static constexpr void ValidateModule() noexcept {
    constexpr auto methodCheckResults = CheckMethods<TModule, ClipboardModuleSpec>();

    REACT_SHOW_METHOD_SPEC_ERRORS(
          0,
          "getString",
          "    REACT_METHOD(getString) void getString(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getString) static void getString(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          1,
          "getStrings",
          "    REACT_METHOD(getStrings) void getStrings(::React::ReactPromise<std::vector<std::string>> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getStrings) static void getStrings(::React::ReactPromise<std::vector<std::string>> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          2,
          "getImagePNG",
          "    REACT_METHOD(getImagePNG) void getImagePNG(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getImagePNG) static void getImagePNG(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          3,
          "getImageJPG",
          "    REACT_METHOD(getImageJPG) void getImageJPG(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getImageJPG) static void getImageJPG(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          4,
          "setImage",
          "    REACT_METHOD(setImage) void setImage(std::string content, ::React::ReactPromise<void> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(setImage) static void setImage(std::string content, ::React::ReactPromise<void> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          5,
          "getImage",
          "    REACT_METHOD(getImage) void getImage(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getImage) static void getImage(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          6,
          "setString",
          "    REACT_METHOD(setString) void setString(std::string content) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(setString) static void setString(std::string content) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          7,
          "setStrings",
          "    REACT_METHOD(setStrings) void setStrings(std::vector<std::string> const & content) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(setStrings) static void setStrings(std::vector<std::string> const & content) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          8,
          "hasString",
          "    REACT_METHOD(hasString) void hasString(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(hasString) static void hasString(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          9,
          "hasImage",
          "    REACT_METHOD(hasImage) void hasImage(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(hasImage) static void hasImage(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          10,
          "hasURL",
          "    REACT_METHOD(hasURL) void hasURL(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(hasURL) static void hasURL(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          11,
          "hasNumber",
          "    REACT_METHOD(hasNumber) void hasNumber(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(hasNumber) static void hasNumber(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          12,
          "hasWebURL",
          "    REACT_METHOD(hasWebURL) void hasWebURL(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(hasWebURL) static void hasWebURL(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          13,
          "setListener",
          "    REACT_METHOD(setListener) void setListener() noexcept { /* implementation */ }\n"
          "    REACT_METHOD(setListener) static void setListener() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          14,
          "removeListener",
          "    REACT_METHOD(removeListener) void removeListener() noexcept { /* implementation */ }\n"
          "    REACT_METHOD(removeListener) static void removeListener() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          15,
          "addListener",
          "    REACT_METHOD(addListener) void addListener(std::string eventName) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(addListener) static void addListener(std::string eventName) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          16,
          "removeListeners",
          "    REACT_METHOD(removeListeners) void removeListeners(int count) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(removeListeners) static void removeListeners(int count) noexcept { /* implementation */ }\n");
  }
};

} // namespace ClipboardCodegen
