export const isAllGroupIncludes = (
    groupManagers: number[],
    allSelectedManagers: number[]
): boolean => {
    if (!allSelectedManagers.length) {
        return false;
    }
    const setAll = new Set([...groupManagers, ...allSelectedManagers]);
    return setAll.size === allSelectedManagers.length;
};
