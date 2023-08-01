window.addEventListener("load", function() {
	
	let imageToggle = document.querySelector("#image_toggle");

    // Load data
	if (imageToggle) {
		chrome.storage.local.get("imagePreviewPluginActive", function(data) {
            if (!data["imagePreviewPluginActive"] || data["imagePreviewPluginActive"] == "undefined") {
                chrome.storage.local.set({"imagePreviewPluginActive" : false}, ()=>{});
            }
			imageToggle.checked = data["imagePreviewPluginActive"];
		});

        imageToggle.addEventListener("click", (event)=>{
            chrome.storage.local.set({"imagePreviewPluginActive" : imageToggle.checked}, ()=>{});
        });
    }
	
	
});