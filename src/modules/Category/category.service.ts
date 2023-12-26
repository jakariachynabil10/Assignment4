import { Tcategory } from "./category.interface";
import { categoryModel } from "./category.model";

const createCategoryIntoDB = async (payload: Tcategory) => {
  const result = await categoryModel.create(payload);
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await categoryModel.find();
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
