import { request } from "@toolkit-fe/request";
import { IOverwriteBehavior } from "./types";

interface IApifoxOpenApiOptions {
	/**
	 * Apifox 开放 API 版本
	 * 获取地址：https://apifox-openapi.apifox.cn/doc-4296596
	 */
	apiVersion: string;
	/**
	 * Apifox 项目 ID
	 * 获取方式：项目设置-通用设置-基本设置-基本信息-项目ID
	 */
	projectId: string;
	/**
	 * Apifox 开放 API 访问令牌
	 * 获取地址：https://apifox-openapi.apifox.cn/doc-4296599
	 */
	accessToken: string;
}

const basePrefix = "https://api.apifox.com/v1/projects";

export class ApifoxOpenApi {
	constructor(options: IApifoxOpenApiOptions) {
		this.options = options;
		this.request = (path: string, options: RequestInit) => {
			return request(`${basePrefix}${path}`, {
				...options,
				headers: {
					...options.headers,
					"X-Apifox-Api-Version": this.options.apiVersion,
					Authorization: `Bearer ${this.options.accessToken}`,
					"Content-Type": "application/json",
				},
			});
		};
	}

	options: IApifoxOpenApiOptions;

	request: (url: string, options: RequestInit) => Promise<any>;

	/**
	 * 导入 OpenAPI/Swagger 格式数据
	 * @param input 需要导入的 OpenAPI 数据，支持字符串或者 URL 方式导入
	 * @param options 包含高级选项及其值的导入过程对象。
	 */
	importOpenApi(
		input: string,
		options: {
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
			endpointOverwriteBehavior?: IOverwriteBehavior;
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
		} = {
			targetEndpointFolderId: 0,
			targetSchemaFolderId: 0,
			endpointOverwriteBehavior: "OVERWRITE_EXISTING",
			schemaOverwriteBehavior: "OVERWRITE_EXISTING",
			updateFolderOfChangedEndpoint: true,
			prependBasePath: false,
		}
	) {
		return this.request(
			`/${this.options.projectId}/import-openapi?locale=zh-CN`,
			{
				method: "POST",
				body: JSON.stringify({
					input,
					options,
				}),
			}
		) as Promise<{
			data: {
				counters: {
					endpointCreated: number;
					endpointUpdated: number;
					endpointFailed: number;
					endpointIgnored: number;
					schemaCreated: number;
					schemaUpdated: number;
					schemaFailed: number;
					schemaIgnored: number;
					endpointFolderCreated: number;
					endpointFolderUpdated: number;
					endpointFolderFailed: number;
					endpointFolderIgnored: number;
					schemaFolderCreated: number;
					schemaFolderUpdated: number;
					schemaFolderFailed: number;
					schemaFolderIgnored: number;
				};
			};
		}>;
	}
}
