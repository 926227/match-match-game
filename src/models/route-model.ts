import { PageRenderFunctionModel } from './page-render-function-model';

export interface RouteModel {
  path: string;
  component: PageRenderFunctionModel;
}
