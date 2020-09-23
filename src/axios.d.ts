import * as axios from "axios";

declare module "axios" {
  interface AxiosResponse<T> {
    total: number;
    data: T;
    status: number;
    message: string;
    token: string;
    user: T;
    flights: T;
    info: T;
    options: T;
    nextStart: number;
  }
}
