import { Type } from '@nestjs/common';

let customInjector: CustomInjector;

export class CustomInjector {

  private services: Map<string, Type<any>> = new Map<string, Type<any>>();

  private set(name: string,target: Type<any>) {
    this.services.set(name, target);
  }
  
  public resolve<T>(target: Type<any>): T {

    if(this.services.has(target.name)) return this.services.get(target.name) as T;

    const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    
    const injections = tokens.map((token) => this.resolve<any>(token));

    const targetInstance = new target(...injections);

    this.set(target.name,targetInstance);

    return targetInstance;

  }

  static getInstance () {

    if(customInjector) {
      return customInjector;
    }

    customInjector = new CustomInjector();

    return customInjector;

  }

}
