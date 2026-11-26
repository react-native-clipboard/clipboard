// The issue with ClipboardModule.java lies in the use of the ContextBaseJavaModule class and the getContext() method, which are no longer available 
// in the latest versions of React Native
// Steps to Fix
// Replace ContextBaseJavaModule with ReactContextBaseJavaModule: ContextBaseJavaModule has been deprecated and removed. Replace it with ReactContextBaseJavaModule.
// Update the Constructor: Modify the constructor to accept a ReactApplicationContext instead of a Context.
// Use getReactApplicationContext() Instead of getContext(): Replace calls to getContext() with getReactApplicationContext().

package com.reactnativecommunity.clipboard;

import android.content.ClipboardManager;
import android.content.ClipData;
import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.module.annotations.ReactModule;

/**
 * A module that allows JS to get/set clipboard contents.
 */
@ReactModule(name = ClipboardModule.NAME)
public class ClipboardModule extends ReactContextBaseJavaModule {

  public static final String NAME = "RNCClipboard";

  public ClipboardModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return ClipboardModule.NAME;
  }

  private ClipboardManager getClipboardService() {
    return (ClipboardManager) getReactApplicationContext().getSystemService(Context.CLIPBOARD_SERVICE);
  }

  @ReactMethod
  public void getString(Promise promise) {
    try {
      ClipboardManager clipboard = getClipboardService();
      ClipData clipData = clipboard.getPrimaryClip();
      if (clipData != null && clipData.getItemCount() >= 1) {
        ClipData.Item firstItem = clipData.getItemAt(0);
        promise.resolve("" + firstItem.getText());
      } else {
        promise.resolve("");
      }
    } catch (Exception e) {
      promise.reject(e);
    }
  }

  @ReactMethod
  public void setString(String text) {
    ClipData clipData = ClipData.newPlainText(null, text);
    ClipboardManager clipboard = getClipboardService();
    clipboard.setPrimaryClip(clipData);
  }

  @ReactMethod
  public void hasString(Promise promise) {
    try {
      ClipboardManager clipboard = getClipboardService();
      ClipData clipData = clipboard.getPrimaryClip();
      promise.resolve(clipData != null && clipData.getItemCount() >= 1);
    } catch (Exception e) {
      promise.reject(e);
    }
  }
}
