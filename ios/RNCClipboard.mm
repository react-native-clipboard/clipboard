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

RCT_EXPORT_METHOD(setStrings:(NSArray<NSString *> *)array)
{
  UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
  clipboard.strings = (array ? : @[]);
}

RCT_EXPORT_METHOD(getStrings:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
  UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
  resolve((clipboard.strings ? : @[]));
}

RCT_EXPORT_METHOD(setImage:(NSString *)content
    resolve:(RCTPromiseResolveBlock) resolve
    reject:(RCTPromiseRejectBlock) reject
) {
  @try {
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    NSData *imageData = [[NSData alloc]initWithBase64EncodedString:content options:NSDataBase64DecodingIgnoreUnknownCharacters];
    [pasteboard setImage:[UIImage imageWithData:imageData]];
    resolve(nil);
  }
  @catch (NSException *exception) {
    reject(@"Clipboard:setImage", exception.reason, nil);
  }
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

RCT_EXPORT_METHOD(hasNumber:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
  if (@available(iOS 14, *)) {
    UIPasteboard *board = [UIPasteboard generalPasteboard];
    [board detectPatternsForPatterns:[NSSet setWithObjects:UIPasteboardDetectionPatternProbableWebURL, UIPasteboardDetectionPatternNumber, UIPasteboardDetectionPatternProbableWebSearch, nil]
                    completionHandler:^(NSSet<UIPasteboardDetectionPattern> * _Nullable set, NSError * _Nullable error) {
        BOOL numberPresent = NO;
        for (NSString *type in set) {
            if ([type isEqualToString:UIPasteboardDetectionPatternNumber]) {
                numberPresent = YES;
            }
        }
        resolve([NSNumber numberWithBool: numberPresent]);
    }];
  } else {
    resolve([NSNumber numberWithBool: NO]);
  }
}

RCT_EXPORT_METHOD(hasWebURL:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
  if (@available(iOS 14, *)) {
    UIPasteboard *board = [UIPasteboard generalPasteboard];
    [board detectPatternsForPatterns:[NSSet setWithObjects:UIPasteboardDetectionPatternProbableWebURL, UIPasteboardDetectionPatternNumber, UIPasteboardDetectionPatternProbableWebSearch, nil]
                    completionHandler:^(NSSet<UIPasteboardDetectionPattern> * _Nullable set, NSError * _Nullable error) {
        BOOL webURLPresent = NO;
        for (NSString *type in set) {
            if ([type isEqualToString:UIPasteboardDetectionPatternProbableWebURL]) {
                webURLPresent = YES;
            }
        }
        resolve([NSNumber numberWithBool: webURLPresent]);
    }];
  } else {
    resolve([NSNumber numberWithBool: NO]);
  }
  
}

RCT_EXPORT_METHOD(getImage:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject){
  reject(@"Clipboard:getImage", @"getImage is not supported on iOS", nil);
}

RCT_EXPORT_METHOD(addListener : (NSString *)eventName) {
  // Keep: Required for RN built in Event Emitter Calls.
}

RCT_EXPORT_METHOD(removeListeners : (NSInteger)count) {
  // Keep: Required for RN built in Event Emitter Calls.
}

#if RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeClipboardModuleSpecJSI>(params);
}
#endif


@end
