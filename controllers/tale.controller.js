import { Tale } from "../models/tale.model.js";

export const addTale = async (req, res) => {
  try {
    const { title, tale, visitedLocation, imageUrl, visitedDate } = req.body;
    const { userId } = req.user;

    //validation
    if (!title || !tale || !visitedLocation || !imageUrl || !visitedDate) {
      return res.status(400).json({
        message: "Please fill in all the details.",
        success: false,
      });
    }

    //converting milliseconds into proper Date
    const parsedVisitedDate = new Date(parseInt(visitedDate));

    const addTale = new Tale({
      title,
      tale,
      visitedLocation,
      userId,
      imageUrl,
      visitedDate: parsedVisitedDate,
    });

    await addTale.save();
    return res.status(200).json({
      message: "Tale Added Successfully.",
      addTale,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getAllTales = async (req, res) => {
  try {
    const {userId} = req.user

    const tales = await Tale.find({userId: userId}).sort({isFavourite: -1})
    res.status(200).json({
      tales,
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
