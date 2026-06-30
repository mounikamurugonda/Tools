import React from 'react';
import ReactSelect, { components, Props as SelectProps } from 'react-select';

// Custom MenuList to prevent Lenis from hijacking scroll
const CustomMenuList = (props: any) => {
    return (
        <div data-lenis-prevent onWheel={(e) => e.stopPropagation()}>
            <components.MenuList {...props} />
        </div>
    );
};

// Default dark mode compatible classNames
const defaultClassNames = {
    control: ({ isFocused }: any) =>
        `flex items-center justify-between px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 transition-all ${isFocused
            ? 'border-blue-500 ring-2 ring-blue-500/20'
            : 'border-gray-200 dark:border-gray-700'
        }`,
    menu: () =>
        'mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden z-50',
    option: ({ isFocused, isSelected }: any) =>
        `px-4 py-2 text-sm cursor-pointer ${isSelected
            ? 'bg-blue-600 text-white'
            : isFocused
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                : 'text-gray-700 dark:text-gray-300'
        }`,
    singleValue: () => 'text-gray-900 dark:text-white text-sm',
    placeholder: () => 'text-gray-400 text-sm',
    input: () => 'text-gray-900 dark:text-white text-sm',
    menuList: () => 'max-h-[200px] overflow-y-auto p-1 custom-scrollbar',
};

/**
 * CustomSelect - A wrapper around react-select with:
 * - Automatic Lenis scroll prevention
 * - Pre-configured dark mode styling
 * - Same API as react-select
 * 
 * Usage:
 * import CustomSelect from '@/components/ui/CustomSelect';
 * 
 * <CustomSelect
 *   value={selectedOption}
 *   onChange={handleChange}
 *   options={options}
 * />
 */
const CustomSelect = <T extends any>(props: SelectProps<T>) => {
    return (
        <ReactSelect
            {...props}
            unstyled
            components={{
                MenuList: CustomMenuList,
                ...props.components,
            }}
            classNames={{
                ...defaultClassNames,
                ...props.classNames,
            }}
        />
    );
};

export default CustomSelect;
