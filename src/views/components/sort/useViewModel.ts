import { useEffect, useState } from "react";

export interface SortProps {
    fields: SortField[];
    selected?: string;
    sortByDescending: boolean;
    onFieldChanged: (value: string) => void;
    onSortOrderChanged: (value: boolean) => void;
}

export interface SortField {
    text: string;
    value: string;
}

const useViewModel = ({
    fields,
    selected,
    sortByDescending,
    onFieldChanged,
    onSortOrderChanged,
}: SortProps) => {
    const toggleSelection = () => {
        setIsSelectionVisible(!isSelectionVisible);
    };

    const hideSelection = () => {
        setIsSelectionVisible(false);
    };

    const selectField = (field: SortField) => {
        setSelectedField(field);
        onFieldChanged(field.value);
    };

    const toggleSortOrder = () => {
        setIsSortByDescending(!isSortByDescending);
        onSortOrderChanged(!isSortByDescending);
    };

    const [selectedField, setSelectedField] = useState<SortField>();
    const [isSelectionVisible, setIsSelectionVisible] =
        useState<boolean>(false);
    const [isSortByDescending, setIsSortByDescending] =
        useState<boolean>(false);

    useEffect(() => {
        const existingField = fields.find((it) => it.value == selected);
        setSelectedField(existingField);
        setIsSortByDescending(sortByDescending);
    }, []);

    useEffect(() => {
        setIsSortByDescending(sortByDescending);
    }, [sortByDescending]);

    useEffect(() => {
        const existingField = fields.find((it) => it.value == selected);
        setSelectedField(existingField);
    }, [selected]);

    return {
        toggleSelection: toggleSelection,
        toggleSortOrder: toggleSortOrder,
        hideSelection: hideSelection,
        selectField: selectField,
        selectedField: selectedField,
        isSelectionVisible: isSelectionVisible,
        isSortByDescending: isSortByDescending,
    };
};

export default useViewModel;
