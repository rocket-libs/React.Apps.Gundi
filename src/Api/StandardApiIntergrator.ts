import ApiIntergratorBase from "./ApiIntergratorBase";
import ValidationResponse from "./ValidationResponse";
import Databinder from "../Forms/DataList/DataboundList/Databinder";

export default abstract class StandardApiIntergrator<
  TModel
> extends ApiIntergratorBase {
  public async getPaged(pagesNavigator: Databinder<TModel>) {
    await this.getOptionallyPaged(pagesNavigator);
  }

  public async searchAsync(dataAdapter: Databinder<TModel>): Promise<TModel[]> {
    const endpoint = dataAdapter.searchEndpoint ?? "search";
    dataAdapter = dataAdapter ?? new Databinder<TModel>([]);
    let relativeUrl = `${endpoint}?searchText=${dataAdapter.searchText}`;
    if (dataAdapter.applyPagingToSearches) {
      relativeUrl += `&page=${dataAdapter.page}&pageSize=${dataAdapter.pageSize}`;
    }
    const result = await this.getAsync<TModel[]>(relativeUrl);
    dataAdapter.replaceData(result);
    return result;
  }

  public async getOptionallyPaged(
    dataAdapter?: Databinder<TModel>
  ): Promise<TModel[]> {
    const shouldMakeCall = !dataAdapter || dataAdapter.hasMorePages;
    if (shouldMakeCall) {
      const endpoint = dataAdapter?.pageableEndpoint ?? "get-pageable";
      dataAdapter = dataAdapter ?? new Databinder<TModel>([]);
      const result = await this.getAsync<TModel[]>(
        `${endpoint}?page=${dataAdapter.page}&pageSize=${dataAdapter.pageSize}`
      );
      dataAdapter.appendData(result);
      return result;
    } else {
      return [];
    }
  }

  public async insertAsync(model: TModel): Promise<ValidationResponse<TModel>> {
    return await this.postAsync("insert", model);
  }
}
