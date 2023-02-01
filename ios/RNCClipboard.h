#ifndef RNCClipboard_h
#define RNCClipboard_h

#ifdef RCT_NEW_ARCH_ENABLED
#import <rnclipboard/rnclipboard.h>
#else
#import <React/RCTBridge.h>
#endif

#import <React/RCTEventEmitter.h>

@interface RNCClipboard : RCTEventEmitter

#ifdef RCT_NEW_ARCH_ENABLED
                                   <NativeClipboardModuleSpec>
#else
                                   <RCTBridgeModule>
#endif
@end

#endif
