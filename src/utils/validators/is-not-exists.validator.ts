import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MongooseModelManager } from '../injectDynamicModel';

type ValidationEntity =
  | {
      _id?: string;
    }
  | undefined;

@Injectable()
@ValidatorConstraint({ name: 'IsNotExist', async: true })
export class IsNotExist implements ValidatorConstraintInterface {
  constructor(private readonly modelManager: MongooseModelManager) {}

  async validate(value: string, validationArguments: ValidationArguments) {
    const currentValue = validationArguments.object as ValidationEntity;
    const modelName = validationArguments.constraints[0];
    const checkStatusId = validationArguments.constraints[1] as string;

    const conditions: any = {
      [validationArguments.property]: value,
      status: {
        id: checkStatusId,
      },
    };

    if (currentValue && currentValue._id) {
      conditions._id = { $ne: currentValue._id };
    }

    const model = this.modelManager.getModel(modelName);

    const entity = (await model.findOne(conditions).exec()) as ValidationEntity;

    return !entity;
  }
}
