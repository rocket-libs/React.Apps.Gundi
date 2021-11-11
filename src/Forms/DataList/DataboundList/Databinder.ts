import GlobalConstants from "../../../GlobalConstants/GlobalConstants";
import { debounce } from "throttle-debounce";

const maximumPageSize: number = 65535;
const defaultSearchDebounceMilliseconds: number = 500;
export default class Databinder<TData> {
  public maximumPageSize: number = maximumPageSize;
  public pageSize: number = this.maximumPageSize;
  public hasMorePages: boolean = true;
  public page: number = GlobalConstants.one;
  public dataset: TData[];
  public pageableEndpoint: string;
  public searchEndpoint: string = "search";
  public applyPagingToSearches: boolean = true;
  private debouncingSearcher: (
    getSearchText: () => string,
    onSearchAsync: () => Promise<void>,
    onGetPage: () => void,
    onCompleted: (resultset: TData[]) => void
  ) => void;
  public searchDebounceMilliseconds: number = defaultSearchDebounceMilliseconds;
  public searchText: string = "";

  constructor(
    dataset: TData[],
    pageableEndpoint?: string,
    currentPage?: number,
    pageSize?: number
  ) {
    this.page = currentPage ?? this.page;
    this.pageSize = pageSize ?? this.pageSize;
    this.dataset = dataset;
    this.pageableEndpoint = pageableEndpoint ?? "get-pageable";
    this.debouncingSearcher = debounce(
      this.searchDebounceMilliseconds,
      false,
      async (
        getSearchText: () => string,
        onSearchAsync: () => Promise<void>,
        onGetPage: () => void,
        onCompleted: (resultset: TData[]) => void
      ) => {
        if (getSearchText()) {
          this.hasMorePages = false;
          await onSearchAsync();
          onCompleted(this.dataset);
        } else {
          this.hasMorePages = true;
          onCompleted([]);
          this.replaceData([]);
          this.page = GlobalConstants.one;
          onGetPage();
        }
      }
    );
  }

  public replaceData(newData: TData[]) {
    this.dataset.splice(GlobalConstants.zero, this.dataset.length);
    for (let i = 0; i < newData.length; i++) {
      this.dataset.push(newData[i]);
    }
  }

  public search(
    searchText: string,
    onSearchAsync: () => Promise<void>,
    onGetPage: () => void,
    onCompleted: (resultset: TData[]) => void
  ) {
    this.searchText = searchText;
    this.debouncingSearcher(
      () => this.searchText,
      onSearchAsync,
      onGetPage,
      onCompleted
    );
  }

  public appendData(newData: TData[]) {
    const receivedValidData = newData && Array.isArray(newData);
    if (receivedValidData) {
      this.hasMorePages = newData.length === this.pageSize;
      this.page += 1;
      for (let i = 0; i < newData.length; i++) {
        this.dataset.push(newData[i]);
      }
    }
  }
}
