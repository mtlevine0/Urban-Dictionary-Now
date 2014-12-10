// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Create selection context
var context = "selection";
var title = "Search Urban Dictionary for '" + context + "'";
var id = chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": genericOnClick});
console.log("'" + context + "' item:" + id);

// A generic onclick callback function.
function genericOnClick(info, tab) {
  var selection = info.selectionText;
  console.log("Selection: " + selection);
  
  var newURL = "http://www.urbandictionary.com/define.php?term=" + selection;
  
  chrome.tabs.create({ url: newURL });
}


