"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNudgedPopoverRect = exports.getNewPopoverRect = exports.popoverRectForPosition = exports.createContainer = exports.targetPositionHasChanged = exports.popoverStatesAreEqual = exports.rectsAreEqual = exports.arrayUnique = exports.Constants = void 0;
exports.Constants = {
    POPOVER_CONTAINER_CLASS_NAME: 'react-tiny-popover-container',
    DEFAULT_ALIGN: 'center',
    DEFAULT_CONTAINER_STYLE: {
        transition: 'transform 0.04s ease-in',
    },
    OBSERVER_THRESHOLDS: Array(1000)
        .fill(null)
        .map(function (_, i) { return i / 1000; })
        .reverse(),
    DEFAULT_POSITIONS: ['top', 'left', 'right', 'bottom'],
    EMPTY_CLIENT_RECT: {
        top: 0,
        left: 0,
        bottom: 0,
        height: 0,
        right: 0,
        width: 0,
    },
};
exports.arrayUnique = function (array) {
    return array.filter(function (value, index, self) { return self.indexOf(value) === index; });
};
exports.rectsAreEqual = function (rectA, rectB) {
    return rectA === rectB ||
        ((rectA === null || rectA === void 0 ? void 0 : rectA.bottom) === (rectB === null || rectB === void 0 ? void 0 : rectB.bottom) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.height) === (rectB === null || rectB === void 0 ? void 0 : rectB.height) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.left) === (rectB === null || rectB === void 0 ? void 0 : rectB.left) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.right) === (rectB === null || rectB === void 0 ? void 0 : rectB.right) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.top) === (rectB === null || rectB === void 0 ? void 0 : rectB.top) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.width) === (rectB === null || rectB === void 0 ? void 0 : rectB.width));
};
exports.popoverStatesAreEqual = function (stateA, stateB) {
    return stateA === stateB ||
        ((stateA === null || stateA === void 0 ? void 0 : stateA.align) === (stateB === null || stateB === void 0 ? void 0 : stateB.align) &&
            (stateA === null || stateA === void 0 ? void 0 : stateA.nudgedLeft) === (stateB === null || stateB === void 0 ? void 0 : stateB.nudgedLeft) &&
            (stateA === null || stateA === void 0 ? void 0 : stateA.nudgedTop) === (stateB === null || stateB === void 0 ? void 0 : stateB.nudgedTop) &&
            stateA.padding === stateB.padding &&
            exports.rectsAreEqual(stateA === null || stateA === void 0 ? void 0 : stateA.popoverRect, stateB === null || stateB === void 0 ? void 0 : stateB.popoverRect) &&
            exports.rectsAreEqual(stateA === null || stateA === void 0 ? void 0 : stateA.childRect, stateB === null || stateB === void 0 ? void 0 : stateB.childRect) &&
            (stateA === null || stateA === void 0 ? void 0 : stateA.position) === (stateB === null || stateB === void 0 ? void 0 : stateB.position));
};
exports.targetPositionHasChanged = function (oldRect, newRect) {
    return oldRect === undefined ||
        oldRect.left !== newRect.left ||
        oldRect.top !== newRect.top ||
        oldRect.width !== newRect.width ||
        oldRect.height !== newRect.height;
};
exports.createContainer = function (containerStyle, containerClassName) {
    var container = window.document.createElement('div');
    if (containerClassName)
        container.className = containerClassName;
    Object.assign(container.style, containerStyle);
    return container;
};
exports.popoverRectForPosition = function (position, childRect, popoverRect, padding, align) {
    var targetMidX = childRect.left + childRect.width / 2;
    var targetMidY = childRect.top + childRect.height / 2;
    var width = popoverRect.width, height = popoverRect.height;
    var top;
    var left;
    switch (position) {
        case 'top':
            top = childRect.top - height - padding;
            left = targetMidX - width / 2;
            if (align === 'start') {
                left = childRect.left;
            }
            if (align === 'end') {
                left = childRect.right - width;
            }
            break;
        case 'left':
            top = targetMidY - height / 2;
            left = childRect.left - padding - width;
            if (align === 'start') {
                top = childRect.top;
            }
            if (align === 'end') {
                top = childRect.bottom - height;
            }
            break;
        case 'bottom':
            top = childRect.bottom + padding;
            left = targetMidX - width / 2;
            if (align === 'start') {
                left = childRect.left;
            }
            if (align === 'end') {
                left = childRect.right - width;
            }
            break;
        case 'right':
            top = targetMidY - height / 2;
            left = childRect.right + padding;
            if (align === 'start') {
                top = childRect.top;
            }
            if (align === 'end') {
                top = childRect.bottom - height;
            }
            break;
        default:
            break;
    }
    return { top: top, left: left, width: width, height: height, right: left + width, bottom: top + height };
};
exports.getNewPopoverRect = function (_a, boundaryInset, boundaryTolerance) {
    var position = _a.position, align = _a.align, childRect = _a.childRect, popoverRect = _a.popoverRect, parentRect = _a.parentRect, padding = _a.padding, reposition = _a.reposition;
    var boundary = boundaryInset - boundaryTolerance;
    var rect = exports.popoverRectForPosition(position, childRect, popoverRect, padding, align);
    var boundaryViolation = reposition &&
        ((position === 'top' && rect.top < parentRect.top + boundary) ||
            (position === 'left' && rect.left < parentRect.left + boundary) ||
            (position === 'right' && rect.right > parentRect.right - boundary) ||
            (position === 'bottom' && rect.bottom > parentRect.bottom - boundary));
    return {
        rect: rect,
        boundaryViolation: boundaryViolation,
    };
};
exports.getNudgedPopoverRect = function (popoverRect, parentRect, boundaryInset, boundaryTolerance) {
    var boundary = boundaryInset - boundaryTolerance;
    var topBoundary = parentRect.top + boundary;
    var leftBoundary = parentRect.left + boundary;
    var rightBoundary = parentRect.right + boundary;
    var bottomBoundary = parentRect.bottom - boundary;
    var top = popoverRect.top < topBoundary ? topBoundary : popoverRect.top;
    top = top + popoverRect.height > bottomBoundary ? bottomBoundary - popoverRect.height : top;
    var left = popoverRect.left < leftBoundary ? leftBoundary : popoverRect.left;
    left = left + popoverRect.width > rightBoundary ? rightBoundary - popoverRect.width : left;
    return {
        top: top,
        left: left,
        width: popoverRect.width,
        height: popoverRect.height,
        right: left + popoverRect.width,
        bottom: top + popoverRect.height,
    };
};
//# sourceMappingURL=util.js.map