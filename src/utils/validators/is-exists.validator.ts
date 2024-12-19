import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MongooseModelManager } from '../injectDynamicModel';

@Injectable()
@ValidatorConstraint({ name: 'IsExist', async: true })
export class IsExist implements ValidatorConstraintInterface {
  constructor(private readonly modelManager: MongooseModelManager) {}

  async validate(value: string, validationArguments: ValidationArguments) {
    const conditions: any = {
      [validationArguments.property]: value,
    };

    const modelName = validationArguments.constraints[0];
    const pathToProperty = validationArguments.constraints[1];

    if (pathToProperty) {
      conditions[pathToProperty] = value[pathToProperty];
    }

    const model = this.modelManager.getModel(modelName);

    const entity = await model.findOne(conditions).exec();

    return !!entity;
  }
}
