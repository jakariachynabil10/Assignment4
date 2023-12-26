import { Types } from "mongoose";

export type Tcategory = {
  name: string;
  createdBy : Types.ObjectId
};
