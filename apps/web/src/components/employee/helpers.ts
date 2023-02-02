import { Employee } from "../../types/employee";

/**
 *  Helper function to retrive missing avatar images
 * @param row employee
 * @returns
 */

export const getPhotoIfNotAvailable = (row: Employee) =>
  `https://randomuser.me/api/portraits/${
    { M: "men", F: "women" }[row?.gender]
  }/${row.id}.jpg`;
