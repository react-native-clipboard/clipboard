/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.reactnativecommunity.clipboard;

import android.content.ClipDescription;
import android.content.ClipboardManager;
import android.content.ClipData;
import android.content.ContentResolver;
import android.content.Context;
import android.graphics.Bitmap;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * A module that allows JS to get/set clipboard contents.
 */
@ReactModule(name = ClipboardModule.NAME)
public class ClipboardModule extends ContextBaseJavaModule {

  public static final String CLIPBOARD_TEXT_CHANGED = "RNCClipboard_TEXT_CHANGED";
  private ReactApplicationContext reactContext;
  private ClipboardManager.OnPrimaryClipChangedListener listener = null;

  public ClipboardModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  public static final String NAME = "RNCClipboard";

  @Override
  public String getName() {
    return ClipboardModule.NAME;
  }

  private ClipboardManager getClipboardService() {
    return (ClipboardManager) getContext().getSystemService(getContext().CLIPBOARD_SERVICE);
  }

  @ReactMethod
  public void getString(Promise promise) {
    try {
      ClipboardManager clipboard = getClipboardService();
      ClipData clipData = clipboard.getPrimaryClip();
      if (clipData != null && clipData.getItemCount() >= 1) {
        ClipData.Item firstItem = clipboard.getPrimaryClip().getItemAt(0);
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
    try {
      ClipData clipdata = ClipData.newPlainText(null, text);
      ClipboardManager clipboard = getClipboardService();
      clipboard.setPrimaryClip(clipdata);
    } catch (Exception e) {
      e.printStackTrace();
    }
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

  @ReactMethod
  public void getImage(Promise promise){
    ClipboardManager clipboardManager = getClipboardService();
    if (!(clipboardManager.hasPrimaryClip())){
      promise.resolve("");
    }
    else if (clipboardManager.getPrimaryClipDescription().hasMimeType(ClipDescription.MIMETYPE_TEXT_PLAIN)){
      promise.resolve("");
    }
    else {
      ClipData clipData = clipboardManager.getPrimaryClip();
      if(clipData != null){
        ClipData.Item item = clipData.getItemAt(0);
        Uri pasteUri = item.getUri();
        if (pasteUri != null){
          ContentResolver cr = reactContext.getContentResolver();
          String mimeType = cr.getType(pasteUri);
          if (mimeType != null){
            if (mimeType.equals("image/jpeg") || mimeType.equals("image/png") || mimeType.equals("image/jpg")){
              String imgPath = pasteUri.getPath();
              try {
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(cr, pasteUri);
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                if (mimeType.equals("image/jpeg") || mimeType.equals("image/jpg")){
                  bitmap.compress(Bitmap.CompressFormat.JPEG, 100, outputStream);
                }
                if (mimeType.equals("image/png")){
                  bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);
                }
                byte[] byteArray = outputStream.toByteArray();
                String encodedString = Base64.encodeToString(byteArray, Base64.DEFAULT);
                StringBuilder builder = new StringBuilder("data:" + mimeType + ";base64,").append(encodedString);
                promise.resolve(builder.toString());
              } catch (IOException e) {
                promise.reject(e);
                e.printStackTrace();
              }
            }
          }
        }
      }
      promise.resolve("");
    }
  }

  @ReactMethod
  public void setListener() {
    try {
      ClipboardManager clipboard = getClipboardService();
      listener = new ClipboardManager.OnPrimaryClipChangedListener() {
        @Override
        public void onPrimaryClipChanged() {
          reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(CLIPBOARD_TEXT_CHANGED, null);
        }
      };
      clipboard.addPrimaryClipChangedListener(listener);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @ReactMethod
  public void removeListener() {
    if(listener != null){
      try{
        ClipboardManager clipboard = getClipboardService();
        clipboard.removePrimaryClipChangedListener(listener);
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }
  
  @ReactMethod
  public void addListener(String eventName) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  public void removeListeners(Integer count) {
    // Keep: Required for RN built in Event Emitter Calls.
  }
}
