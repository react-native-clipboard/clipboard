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
