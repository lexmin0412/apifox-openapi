/**
 * 处理匹配数据的行为 OVERWRITE_EXISTING 覆盖现有的模式。 AUTO_MERGE 自动合并更改到现有的模式。 KEEP_EXISTING 跳过更改并保留现有的模式。 CREATE_NEW 保留现有的模式，创建新的模式。
 */
export type IOverwriteBehavior = 'OVERWRITE_EXISTING' | 'AUTO_MERGE' | 'KEEP_EXISTING' | 'CREATE_NEW';
