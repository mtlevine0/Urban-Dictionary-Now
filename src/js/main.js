// Copyright (c) 2014
//
// Matt Levine
// Created: 12/9/14
//

import { write_database_element } from "./firebase_config.js";

// Create selection context
const title = "Search Urban Dictionary for 'selection'";
const contextId = "context-search";
const id = chrome.contextMenus.create({"id": contextId, "title": title, "contexts":["selection"]});

chrome.contextMenus.onClicked.addListener(async function(info, tab) {
    if (info.menuItemId == contextId) {
		const url = tab.url;
		const ip = await getIp();
		const query = info.selectionText;
		const event = { query, createdAt: new Date(), url, ip };
		sendAnalyticsEvent(event);

		const newURL = "http://www.urbandictionary.com/define.php?term=" + query;
		chrome.tabs.create({ url: newURL, index: tab.index+1, selected: true });
    }
});

function sendAnalyticsEvent(event) {
	console.log(event);
	try {
		write_database_element("queries", event);
	} catch (e) {
		console.warn("Failed to write analytics event: " + e.message);
	}
}

async function getIp() {
	try {
		const url = "https://api.ipify.org/?format=json";
		const response = await fetch(url);
		const json = await response.json();
		const ip = json.ip;
		return ip;
	} catch (e) {
		console.warn("Error when fetching IP address: " + e.message);
		return "UNKNOWN";
	}
}

// Update the contextMenus title
function updateContextMenu(id) {
	// Update contextMenus with highlighted selection
	chrome.contextMenus.update(id, {"title": "Search Urban Dictionary for '%s'"});
}

// Updates the contextMenus title each time the menu is opened.
updateContextMenu(id);
// chrome.browserAction.setBadgeBackgroundColor({color: [0,255,0,0]});