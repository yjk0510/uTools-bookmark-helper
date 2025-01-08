const Prefix = `${utools.getNativeId()}/bookmark_helper-`
export const BookMark_File_Path = `${Prefix}File_Path`
export const BookMark_Sort_Rule = `${Prefix}Sort_Rule`
export enum SortRule { 
  Default = 'default',
  ClickCount = 'clickCount',
}