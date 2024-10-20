import { request } from "@toolkit-fe/request";
import { IExportOpenApiType, IImportOpenApiType, IImportPostmanCollection, IImportPostmanCollectionOptions } from "./types";

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
	/**
	 * 国际化标识，示例：zh-CN
	 */
	locale: string
}

const basePrefix = "https://api.apifox.com/v1/projects";

export class ApifoxOpenApi {
	constructor(options: IApifoxOpenApiOptions = {
		apiVersion: "3.0",
		projectId: "",
		accessToken: "",
		locale: "zh-CN"
	}) {
		if (!options.projectId)  {
			throw new Error("apiVersion is required");
		}
		if (!options.accessToken) {
			throw new Error("accessToken is required");
		}
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
	importOpenApi: IImportOpenApiType = (
		input: string,
		options = {
			targetEndpointFolderId: 0,
			targetSchemaFolderId: 0,
			endpointOverwriteBehavior: "OVERWRITE_EXISTING",
			schemaOverwriteBehavior: "OVERWRITE_EXISTING",
			updateFolderOfChangedEndpoint: true,
			prependBasePath: false,
		}
	) => {
		return this.request(
			`/${this.options.projectId}/import-openapi?locale=${this.options.locale}`,
			{
				method: "POST",
				body: JSON.stringify({
					input,
					options,
				}),
			}
		);
	}

	/**
	 * 导出 OpenAPI/Swagger 格式数据
	 */
	exportOpenApi: IExportOpenApiType = (options) => {
		return this.request(`/${this.options.projectId}/export-openapi?locale=zh-CN`, {
			method: "POST",
			body: JSON.stringify(options),
		});
	}

	/**
	 * 导入 Postman Collection 格式数据, 当前支持导入 Postman Collection v2 格式数据
	 */
	importPostmanCollection: IImportPostmanCollection = (input: string, options: IImportPostmanCollectionOptions) => {
		return this.request(`/${this.options.projectId}/import-postman-collection`, {
			method: "POST",
			body: JSON.stringify({ input, options }),
		});
	}
}
