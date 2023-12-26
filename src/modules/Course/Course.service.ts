/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCourse } from "./Course.interface";
import { CourseModel } from "./Course.model";
import { DurationWeeks } from "./Course.utils";
import { ReviewModel } from "../Review/review.model";
import { ObjectId } from "mongodb";
import { PriceQuery, SortQuery } from "../../app/interface/pagination";

const createCourseIntoDB = async (payload: TCourse) => {
  payload.durationInWeeks = DurationWeeks(payload.startDate, payload.endDate);
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: any) => {
  const sortField =
    query?.sortBy &&
    ["title", "price", "startDate", "endDate", "language", "duration"].includes(
      query.sortBy,
    )
      ? query.sortBy
      : "title";
  const pipeline = [];

  if (query.page && query.limit) {
    pipeline.push({ $skip: (query.page - 1) * query.limit });
    pipeline.push({ $limit: parseInt(query.limit) });
  }

  const SortQuery: SortQuery = { $sort: {} };
  SortQuery.$sort[sortField] = 1;
  pipeline.push(SortQuery);

  if (query.minPrice || query.maxPrice) {
    const PriceQuery: PriceQuery = {};
    if (query?.minPrice) {
      PriceQuery.$gte = parseFloat(query?.minPrice);
    }
    if (query?.maxPrice) {
      PriceQuery.$lte = parseFloat(query?.maxPrice);
    }
    pipeline.push({ $match: { price: PriceQuery } });
  }

  // if (query?.tags) {
  //   pipeline.push({$match : {tags : query?.tags}})
  // }

  if (query?.startDate || query?.endDate) {
    pipeline.push({
      $match: {
        $or: [{ startDate: query?.startDate }, { endDate: query?.endDate }],
      },
    });
  }

  if (query?.language) {
    pipeline.push({ $match: { language: query.language } });
  }
  if (query?.provider) {
    pipeline.push({ $match: { provider: query.provider } });
  }
  if (query?.durationInWeeks) {
    pipeline.push({
      $match: { durationInWeeks: parseFloat(query.durationInWeeks) },
    });
  }
  if (query?.level) {
    pipeline.push({ $match: { "details.level": query.level } });
  }

  const result = await CourseModel.aggregate(pipeline);
  return result;
};

const updateSingleCourseFromDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const { details, tags, ...remainingData } = payload;

  const isCourseExixts = await CourseModel.findById(id);

  if (!isCourseExixts) {
    throw new Error("Course not found");
  }

  let modifiedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (details && Object.keys(details).length > 0) {
    for (const [key, values] of Object.entries(details)) {
      modifiedData[`details.${key}`] = values;
    }
  }

  const previousTag = isCourseExixts.tags ? [...isCourseExixts.tags] : [];

  if (tags && tags.length) {
    tags.forEach((tag) => {
      // eslint-disable-next-line no-unused-vars
      const { name, isDeleted } = tag;
      const findNameIndex = previousTag.findIndex((item) => item.name === name);
      if (findNameIndex !== -1) {
        previousTag[findNameIndex] = tag;
      } else {
        previousTag.push(tag);
      }
    });
  }
  modifiedData.tags = previousTag;

  const result = await CourseModel.findByIdAndUpdate(id, modifiedData, {
    upsert: true,
    new: true,
  });
  return result;
};

const getSingleCourseWithReviewFromDB = async (id: string) => {
  const course = await CourseModel.findById(id);
  const review = await ReviewModel.find({ courseId: new ObjectId(id) });
  return { course, review };
};

const getBestCourseOnAvarageRatingFromDB = async () => {
  const bestCourse = await CourseModel.aggregate([
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "courseId",
        as: "review",
      },
    },
    {
      $addFields: {
        averageRating: {
          $avg: "$review.rating",
        },
        reviewCount: {
          $size: "$review",
        },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
    {
      $limit: 1,
    },
  ]).exec();

  const { averageRating, reviewCount, ...remainingData } = bestCourse[0];
  const bestCourses = {
    course: { ...remainingData },
    averageRating: parseFloat(averageRating?.toFixed(1)),
    reviewCount: parseInt(reviewCount),
  };

  return bestCourses;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  updateSingleCourseFromDB,
  getSingleCourseWithReviewFromDB,
  getBestCourseOnAvarageRatingFromDB,
};
