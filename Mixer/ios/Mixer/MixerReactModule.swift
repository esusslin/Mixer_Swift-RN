//
//  MixerReactModule.swift
//  Mixer
//
//  Created by Emmet Susslin on 7/6/17.
//  Copyright © 2017 Razeware LLC. All rights reserved.
//

import Foundation
import React


class MixerReactModule: NSObject {

    var bridge: RCTBridge?
    
    static let sharedInstance = MixerReactModule()
    
    
    func createBridgeIfNeeded() -> RCTBridge {
        if bridge == nil {
            bridge = RCTBridge.init(delegate: self, launchOptions: nil)
        }
        return bridge!
    }
    
    func viewForModule(_ moduleName: String, initialProperties: [String : Any]?) -> RCTRootView {
        let viewBridge = createBridgeIfNeeded()
        let rootView: RCTRootView = RCTRootView(
            bridge: viewBridge,
            moduleName: moduleName,
            initialProperties: initialProperties)
        return rootView
    }
}


extension MixerReactModule: RCTBridgeDelegate {
    
//    func sourceURL(for bridge: RCTBridge!) -> URL! {
//        return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
//    }
    
//    
    func sourceURL(for bridge: RCTBridge!) -> URL! {
        return URL(string: "http://localhost:8081/index.ios.bundle?platform=ios")
    }
}
