const GlobalConstants = {
    zero: 0,
    one: 1,
    negativeOne: -1,
    strings: {
        firstElementIndex: 0,
    },
    arrays: {
        emptyArrayLength: 0,
        firstElementIndex: 0,
    },
    paging: {
        nextIncrementAmount: 1,
        lastDecrementAmount: -1,
    },
    zIndexes: {
        actionBar: 2,
        menuDropDown: () => GlobalConstants.zIndexes.actionBar + GlobalConstants.one,
        mobileTopBar: () => GlobalConstants.zIndexes.menuDropDown() + GlobalConstants.one,
    },
    defaultGuid: "00000000-0000-0000-0000-000000000000",
};

export default GlobalConstants;
