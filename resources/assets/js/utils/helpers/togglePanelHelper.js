/**
 * Toggle panel visibility by ID.
 *
 * @param identificator
 * @param panelClass
 * @returns {boolean}
 */
export const togglePanelById = (identificator, panelClass) => {
    return document.getElementById(identificator).classList.toggle(panelClass);
};

/**
 * Toggle panel visibility by classname.
 *
 * @param classname
 * @param panelClass
 * @returns {boolean}
 */
export const togglePanelByClass = (classname, panelClass) => {
    return document.querySelector(classname).classList.toggle(panelClass);
};

/**
 * Toggle prevention of content scrolling
 */
export const togglePreventContentScroll = () => {
    document.querySelector('body').classList.toggle('panel-open');
};