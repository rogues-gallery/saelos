/**
 * Toggle panel visibility.
 *
 * @param wrapperClass
 * @param panelClass
 * @returns {boolean}
 */
export
function togglePanel(wrapperClass, panelClass) {
    return document.getElementById(wrapperClass).classList.toggle(panelClass);
}

/**
 * Toggle prevention of content scrolling
 */
export
function togglePreventContentScroll() {
    document.querySelector('body').classList.toggle('panel-open');
}