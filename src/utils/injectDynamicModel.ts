// mongoose-model-manager.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class MongooseModelManager {
  private models: { [modelName: string]: Model<any> } = {};

  addModel(name: string, model: Model<any>) {
    this.models[name] = model;
  }

  getModel(name: string): Model<any> {
    const model = this.models[name];
    if (!model) {
      throw new Error(`Model ${name} not found`);
    }
    return model;
  }
}
