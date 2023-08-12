let imageTooltip = document.createElement("img");
imageTooltip.style.position = "fixed";
imageTooltip.style.backgroundColor = "rgba(255,255,255,0.5)";
imageTooltip.style.pointerEvents = "none";
imageTooltip.id = "current_image";
imageTooltip.style.display = "none";
imageTooltip.style.borderRadius = "2px";
imageTooltip.style.maxBlockSize = "500px";
imageTooltip.innerHTML = "No Image Found";
document.body.appendChild(imageTooltip);
let imageTooltipWidth;
document.addEventListener("mousemove", (event)=>{
    if (imageTooltip) {
        imageTooltipWidth = imageTooltip.getBoundingClientRect().width;
        imageTooltip.style.left = (event.pageX - (imageTooltipWidth/2));
        imageTooltip.style.top = event.pageY+15;
    }
});


let imageLinkSet = new Set();

function CheckImageToggleActive()
{
    if (imageTooltip) {
        chrome.storage.local.get("imagePreviewPluginActive", function(data) {
            let active = data["imagePreviewPluginActive"] == true ? true : false;
            imageTooltip.style.visibility = active ? "visible" : "hidden";
        });
    }
}

function CheckLinkIsImage(getLinks)
{
    for (let link of getLinks) {
        let linkString = link.href;
        if (linkString && !imageLinkSet.has(link)) {
            let imageExt = linkString.toLowerCase().match(/\.?(png|jpg|jpeg|gif|tiff|svg|webp)\/?/);
            if (imageExt && imageExt.length > 0) {
                imageLinkSet.add(link);
                link.addEventListener("mouseenter", (event)=>{
                    if (imageTooltip) {
                        imageTooltip.src = linkString;
                        CheckImageToggleActive();
                        imageTooltip.style.display = "block";
                    }
                });
                link.addEventListener("mouseleave", (event)=>{
                    if (imageTooltip) {
                        imageTooltip.style.display = "none";
                    }
                });
            }
        }
    }
}

let getLinks = document.querySelectorAll("a");
CheckLinkIsImage(getLinks);

let observer = new MutationObserver((mutation)=>{
    getLinks = document.querySelectorAll("a");
    CheckLinkIsImage(getLinks);
})

observer.observe(document, {attributes: false, childList: true, characterData: false, subtree: true});