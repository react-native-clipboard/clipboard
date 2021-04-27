#import "RNCClipboard.h"


#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>


@implementation RNCClipboard {
    BOOL isObserving;
}

RCT_EXPORT_MODULE();

NSString *const CLIPBOARD_TEXT_CHANGED = @"RNCClipboard_TEXT_CHANGED";

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

-(id) init {
    if (self = [super init]) {
       isObserving = NO;
   }
   return self;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[CLIPBOARD_TEXT_CHANGED];
}

- (void)startObserving {
    isObserving = YES;
}

-(void)stopObserving {
    isObserving = NO;
}

- (void) listener:(NSNotification *) notification
{
    if (isObserving) {
        [self sendEventWithName:CLIPBOARD_TEXT_CHANGED body:nil];
    }
}

RCT_EXPORT_METHOD(setListener)
{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(listener:) name:UIPasteboardChangedNotification object:nil];
}

RCT_EXPORT_METHOD(removeListener)
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
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
