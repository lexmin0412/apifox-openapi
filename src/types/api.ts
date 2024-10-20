/**
 * 处理匹配数据的行为 OVERWRITE_EXISTING 覆盖现有的模式。 AUTO_MERGE 自动合并更改到现有的模式。 KEEP_EXISTING 跳过更改并保留现有的模式。 CREATE_NEW 保留现有的模式，创建新的模式。
 */
export type IOverwriteBehavior = 'OVERWRITE_EXISTING' | 'AUTO_MERGE' | 'KEEP_EXISTING' | 'CREATE_NEW';

/**
 * 响应错误信息对象
 */
export interface IResponseError  {
	/**
	 * 错误信息
	 */
	message: string;
	/**
	 * 错误代码
	 */
	code: number;
}

/**
 * 导入 API 接口的选项
 */
export interface IImportApiOptions {
	/**
	 * 用于存储或匹配 API 接口的目标目录的 ID。如果未指定，目标目录将为 Root 目录
	 */
	targetEndpointFolderId?: number;
	/**
	 * 用于存储或匹配数据模型的目标目录的 ID。如果未指定，目标目录将为 Root 目录
	 */
	targetSchemaFolderId?: number;
	/**
	 * 指定处理匹配的接口的行为。确定是否覆盖现有的接口，自动合并更改，跳过更改并保留现有的接口，或创建新的接口。
	 */
	endpointOverwriteBehavior?: IOverwriteBehavior
	/**
	 * 指定处理匹配的数据模型的行为。确定是否覆盖现有的模式，自动合并更改，跳过更改并保留现有的模式，或创建新的模式。
	 */
	schemaOverwriteBehavior?: IOverwriteBehavior;
	/**
	 * 在导入匹配的现有接口时，是否更新接口的目录 ID。如果希望随导入的接口一起更改目录 ID，则应将其设置为 true。
	 */
	updateFolderOfChangedEndpoint?: boolean;
	/**
	 * 是否将基础路径添加到接口的路径中，默认设置为 false。我们建议将其设置为 false，这样基础路径可以保留在“环境面板”中，而不是每个接口内部。如果希望在接口路径中添加路径前缀，则应将其设置为 true。
	 */
	prependBasePath?: boolean;
}

/**
 * 导入 API 接口的响应计数器
 */
export interface IImportApiResponseCounters {
	/**
	 * 新增的接口数
	 */
	endpointCreated: number;
	/**
	 * 修改的接口数
	 */
	endpointUpdated: number;
	/**
	 * 导入出错接口数
	 */
	endpointFailed: number;
	/**
	 * 忽略的接口数
	 */
	endpointIgnored: number;
	/**
	 * 新增的数据模型数
	 */
	schemaCreated: number;
	/**
	 * 修改的数据模型数
	 */
	schemaUpdated: number;
	/**
	 * 导入出错数据模型数
	 */
	schemaFailed: number;
	/**
	 * 忽略的数据模型数
	 */
	schemaIgnored: number;
	/**
	 * 新增的接口目录数
	 */
	endpointFolderCreated: number;
	/**
	 * 修改的接口目录数
	 */
	endpointFolderUpdated: number;
	/**
	 * 导入出错接口目录数
	 */
	endpointFolderFailed: number;
	/**
	 * 忽略的接口目录数
	 */
	endpointFolderIgnored: number;
	/**
	 * 新增的数据模型目录数
	 */
	schemaFolderCreated: number;
	/**
	 * 修改的数据模型目录数
	 */
	schemaFolderUpdated: number;
	/**
	 * 导入出错数据模型目录数
	 */
	schemaFolderFailed: number;
	/**
	 * 忽略的数据模型目录树
	 */
	schemaFolderIgnored: number;
}

/**
 * 导入 API 接口的响应
 */
export interface IImportApiResponse {
	data: {
		counters: IImportApiResponseCounters;
	};
	/**
	 * 导入过程中发生的错误
	 */
	errors?: IResponseError[]
}

/**
 * 导入 API 接口的函数
 */
export type IImportOpenApiType = (input: string, options: IImportApiOptions) => Promise<IImportApiResponse>

/**
 * 导出 API 接口的响应
 */
export interface IExportOpenApiResponse {
	openapi: string
	info: {
		title: string;
		description: string;
		version: string;
	}
	tags: Array<{
		name: string;
	}>
	paths: Record<string, any>
	components: {
		schemas: Record<string, any>
	}
	servers: string[]
}

type IExportOpenApiScope = {
	type: 'ALL'
	/**
	 * 排除掉包含指定标签的内容
	 */
	excludedByTags: string[]
} | {
	type: 'SELECTED_ENDPOINTS'
	/**
	 * 指定要导出的选定接口的 ID
	 */
	selectedEndpointIds: string[]
	/**
	 * 排除掉包含指定标签的内容
	 */
	excludedByTags: string[]
} | {
	type: 'SELECTED_TAGS'
	/**
	 * 指定要包含在导出范围内的标签
	 */
	selectedTags: string[]
	/**
	 * 排除掉包含指定标签的内容
	 */
	excludedByTags: string[]
} | {
	type: 'SELECTED_FOLDERS'
	/**
		* 指定要包含在导出范围内的文件夹 ID
		*/
	selectedFolderIds: string[]
	/**
	 * 排除掉包含指定标签的内容
	 */
	excludedByTags: string[]
}

type IExportOpenApiOptions = {
	/**
	 * 指定要导出的接口的范围。
	 */
	scope: IExportOpenApiScope
	/**
	 * 导出选项
	 */
	options?: {
		/**
		 * 指定要导出的接口的 ID。如果未指定，将导出所有接口。
		 */
		includeApifoxExtensionProperties?: boolean
		/**
		 * 指定是否在标签字段中包含接口的目录名称。
		 */
		addFoldersToTags?: boolean
	}
	/**
	 * 指定用于导出的 OpenAPI 规范的版本。可以有值如 "2.0"，"3.0" 或 "3.1"， 默认值 3.1。
	 */
	oasVersion?: '2.0' | '3.0' | '3.1'
	/**
	 * 指定导出的 OpenAPI 文件的格式。可以有值如 "JSON" 或 "YAML"。
	 */
	exportFormat?: 'JSON' | 'YAML'
	/**
	 * 指定要导出的环境的 ID。
	 */
	environmentIds?: number[]
}

/**
 * 导出 API 接口的函数
 */
export type IExportOpenApiType = (options: IExportOpenApiOptions) => Promise<IExportOpenApiResponse>

/**
 * 包含高级选项及其值的用于导入过程的对象。
 */
export interface IImportPostmanCollectionOptions {
	/**
	 * 存储或匹配 API 接口的目标目录的 ID。如果未指定，目标目录将为 Root 目录。
	 */
	targetEndpointFolderId?: number;
	/**
	 * 指定处理匹配的接口的行为，该接口由** HTTP 方法和路径**的组合匹配。它确定是覆盖现有接口，自动合并更改，跳过更改并保留现有接口，还是创建一个新接口。
	 */
	endpointOverwriteBehavior?: IOverwriteBehavior
	/**
	 * 指定处理匹配的接口用例的行为。它确定是覆盖现有的接口用例，跳过更改并保留现有的接口用例，还是创建一个新的。
	 * 接口用例只有在同一接口内使用与现有接口用例名称相同的请求名称时才匹配。
	 */
	endpointCaseOverwriteBehavior?: IOverwriteBehavior
	/**
	 * 在导入匹配的现有接口时，是否更新接口的目录 ID。如果要随导入的接口一起更改目录 ID，则应将其设置为 true。
	 */
	updateFolderOfChangedEndpoint?: boolean
}

/**
 * 导入 Postman 集合的响应体
 */
export interface IImportPostmanCollectionResponse {
	data: {
		/**
		 * 导入的接口和数据模型的计数器
		 */
		counters: IImportApiResponseCounters;
		/**
		 * 导入过程中发生的错误
		 */
		errors?: IResponseError[]
	};
}

/**
 * 导入 Postman 集合的函数
 */
export type IImportPostmanCollection = (input: string, options?: IImportPostmanCollectionOptions) => Promise<any>
