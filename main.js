// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Create selection context
var title = "Search Urban Dictionary for 'selection'";
var id = chrome.contextMenus.create({"title": title, "contexts":["selection"], "onclick": genericOnClick});

// A generic onclick callback function.
function genericOnClick(info, tab) {
	var selection = info.selectionText;
	var newURL = "http://www.urbandictionary.com/define.php?term=" + selection;
	// Open the new tab with the search query
	chrome.tabs.create({ url: newURL, index: tab.index+1, selected: false });
}

function updateContextMenu(id) {
	// Update contextMenus with highlighted selection
	chrome.contextMenus.update(id, {"title": "Search Urban Dictionary for '%s'"});
}

updateContextMenu(id);