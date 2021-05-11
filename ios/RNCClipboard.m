#import "RNCClipboard.h"


#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>


@implementation RNCClipboard

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(setString:(NSString *)content)
{
  UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
  clipboard.string = (content ? : @"");
}

RCT_EXPORT_METHOD(getString:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
  UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
  resolve((clipboard.string ? : @""));
}

RCT_EXPORT_METHOD(getImagePNG:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
  NSString *pngPrefix = @"data:image/png;base64,";
  UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
  UIImage *clipboardImage = clipboard.image;
  if (!clipboardImage) {
    resolve(NULL);
  } else {
    NSString *imageDataBase64 = [UIImagePNGRepresentation(clipboardImage) base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    NSString *withPrefix = [pngPrefix stringByAppendingString:imageDataBase64];
    resolve((withPrefix ? : NULL));
  }
}

RCT_EXPORT_METHOD(getImageJPG:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
  NSString *jpgPrefix = @"data:image/jpeg;base64,";
  UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
  UIImage *clipboardImage = clipboard.image;
  if (!clipboardImage) {
    resolve(NULL);
  } else {
    NSString *imageDataBase64 = [UIImageJPEGRepresentation(clipboardImage, 1.0) base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    NSString *withPrefix = [jpgPrefix stringByAppendingString:imageDataBase64];
    resolve((withPrefix ? : NULL));
  }
}

RCT_EXPORT_METHOD(hasImage:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
  BOOL imagePresent = YES;
  UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
  if (@available(iOS 10, *)) {
    imagePresent = clipboard.hasImages;
  } else {
    UIImage *imageInPasteboard = clipboard.image;
    imagePresent = imageInPasteboard != nil;
  }
  resolve([NSNumber numberWithBool: imagePresent]);
}

RCT_EXPORT_METHOD(hasString:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
  BOOL stringPresent = YES;
  UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
  if (@available(iOS 10, *)) {
    stringPresent = clipboard.hasStrings;
  } else {
    NSString* stringInPasteboard = clipboard.string;
    stringPresent = [stringInPasteboard length] == 0;
  }

  resolve([NSNumber numberWithBool: stringPresent]);
}

RCT_EXPORT_METHOD(hasURL:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
  BOOL urlPresent = NO;
  UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
  if (@available(iOS 10, *)) {
    urlPresent = clipboard.hasURLs;
  }
  resolve([NSNumber numberWithBool: urlPresent]);
}

@end
