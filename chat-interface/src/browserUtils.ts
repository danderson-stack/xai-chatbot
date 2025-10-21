

export function isPrivateBrowsing() {
    return typeof window !== "undefined" && window.location.protocol === "chrome-extension:";
}