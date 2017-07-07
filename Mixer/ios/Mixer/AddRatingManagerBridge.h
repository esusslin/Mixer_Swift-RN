//
//  AddRatingManagerBridge.h
//  Mixer
//
//  Created by Emmet Susslin on 7/6/17.
//  Copyright © 2017 Razeware LLC. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(AddRatingManager, NSObject)

RCT_EXTERN_METHOD(dismissPresentedViewController:(nonnull NSNumber *)reactTag)


RCT_EXTERN_METHOD(save:(nonnull NSNumber *)reactTag rating:(NSInteger *)rating forIdentifier:(NSInteger *)forIdentifier)

@end

