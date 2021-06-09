import { PageRenderFunctionModel } from '../../models/page-render-function-model';
import { RouteModel } from '../../models/route-model';

export class Router {
  routs: RouteModel[] = [];

  rootMain = document.body.children[1];

  defaultRoute: RouteModel = {
    path: '/',
    component: () => {
      if (this.rootMain) this.rootMain.textContent = 'DEFAULT';
    },
  };

  constructor() {
    this.onPageChange = this.onPageChange.bind(this);
    this.listen();
  }

  addRoute(path: string, renderFunction: PageRenderFunctionModel): void {
    const newRout: RouteModel = {
      path,
      component: renderFunction,
    };
    this.routs.push(newRout);
  }

  setDefault(path: string, renderFunction: PageRenderFunctionModel): void {
    this.defaultRoute = {
      path,
      component: renderFunction,
    };
  }

  onPageChange(): void {
    const demandRoutName = window.location.hash.slice(1);
    const demandRoute = this.routs.find(
      (route) => route.path === demandRoutName
    );
    (demandRoute || this.defaultRoute).component();
  }

  listen(): void {
    window.addEventListener('popstate', this.onPageChange);
    window.addEventListener('DOMContentLoaded', this.onPageChange);
  }
}
