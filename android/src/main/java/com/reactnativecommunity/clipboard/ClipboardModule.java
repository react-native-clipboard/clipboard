/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.reactnativecommunity.clipboard;

import android.annotation.TargetApi;
import android.content.ClipDescription;
import android.content.ClipboardManager;
import android.content.ClipData;
import android.content.ContentResolver;
import android.content.Context;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;

/**
 * A module that allows JS to get/set clipboard contents.
 */
@ReactModule(name = ClipboardModule.NAME)
public class ClipboardModule extends ReactContextBaseJavaModule {

  public static final String CLIPBOARD_TEXT_CHANGED = "RNCClipboard_TEXT_CHANGED";
  private ReactApplicationContext reactContext;
  private ClipboardManager.OnPrimaryClipChangedListener listener = null;

  public ClipboardModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  public static final String NAME = "RNCClipboard";
  public static final String MIMETYPE_JPEG = "image/jpeg";
  public static final String MIMETYPE_JPG = "image/jpg";
  public static final String MIMETYPE_PNG = "image/png";
  public static final String MIMETYPE_WEBP = "image/webp";
  public static final String MIMETYPE_HEIC = "image/heic";
  public static final String MIMETYPE_HEIF = "image/heif";

  @Override
  public String getName() {
    return ClipboardModule.NAME;
  }

  private ClipboardManager getClipboardService() {
    return (ClipboardManager) reactContext.getSystemService(Context.CLIPBOARD_SERVICE);
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
            try {
              Bitmap bitmap = MediaStore.Images.Media.getBitmap(cr, pasteUri);
              ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
              switch(mimeType){
                case MIMETYPE_JPEG:
                case MIMETYPE_JPG:
                  bitmap.compress(Bitmap.CompressFormat.JPEG, 100, outputStream);
                  break;
                case MIMETYPE_PNG:
                case MIMETYPE_HEIC:
                case MIMETYPE_HEIF:
                  bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);
                  break;
                case MIMETYPE_WEBP:
                  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R){
                    bitmap.compress(Bitmap.CompressFormat.WEBP_LOSSLESS, 100, outputStream);
                    break;
                  }
                  bitmap.compress(Bitmap.CompressFormat.WEBP, 100, outputStream);
                  break;
                default:
                  return;
              }
              byte[] byteArray = outputStream.toByteArray();
              String encodedString = Base64.encodeToString(byteArray, Base64.DEFAULT);
              promise.resolve("data:" + mimeType + ";base64," + encodedString);
            } catch (IOException e) {
              promise.reject(e);
              e.printStackTrace();
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
