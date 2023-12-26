/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tcategory } from "./category.interface";
import { categoryModel } from "./category.model";

const createCategoryIntoDB = async (payload: Tcategory, id : any) => {
  payload.createdBy = id
  const result = await categoryModel.create(payload);
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await categoryModel.find().populate('createdBy');
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
