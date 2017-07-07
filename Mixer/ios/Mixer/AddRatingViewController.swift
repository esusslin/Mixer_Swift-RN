

import UIKit
import React

class AddRatingViewController: UIViewController {
  
  var mixer: Mixer!
  var addRatingView: RCTRootView!
    
  @IBOutlet weak var closeButton: UIButton!
  
  var currentRating: Int {
    get {
      return UserDefaults.standard.integer(forKey: "currentRating-\(mixer.identifier)")
    }
    set {
      UserDefaults.standard.set(newValue, forKey: "currentRating-\(mixer.identifier)")
    }
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    
    addRatingView = MixerReactModule.sharedInstance.viewForModule(
        "AddRatingApp",
        initialProperties: ["identifier": mixer.identifier, "currentRating": currentRating])
    
     self.view.addSubview(addRatingView)
  }
  
  override func viewDidLayoutSubviews() {
    super.viewDidLayoutSubviews()
    
    addRatingView.frame = self.view.bounds
   
  }
  
  @IBAction func cancelButtonTapped(_ sender: UIButton) {
    dismiss(animated: true, completion: nil)
  }
    
}
