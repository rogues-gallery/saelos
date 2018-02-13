/**
 * Toggle panel visibility.
 *
 * @param wrapperClass
 * @param panelClass
 * @returns {boolean}
 */
export const togglePanel = (wrapperClass, panelClass) => {
    return document.getElementById(wrapperClass).classList.toggle(panelClass);
};

/**
 * Toggle prevention of content scrolling
 */
export const togglePreventContentScroll = () => {
    document.querySelector('body').classList.toggle('panel-open');
};