import { Tale } from "../models/tale.model.js";
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";
import { log } from "console";

export const addTale = async (req, res) => {
  try {
    const { title, tale, visitedLocation, visitedDate } = req.body;
    const { userId } = req.user;

    //validation
    if (!title || !tale || !visitedLocation || !visitedDate) {
      return res.status(400).json({
        message: "Please fill in all the details.",
        success: false,
      });
    }

    //converting milliseconds into proper Date
    const parsedVisitedDate = new Date(parseInt(visitedDate));

    //uploading the photo for tale
    const file = req.file
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

    const addTale = new Tale({
      title,
      tale,
      visitedLocation,
      userId,
      image: cloudResponse.secure_url,
      visitedDate: parsedVisitedDate,
    });

    await addTale.save();
    return res.status(200).json({
      message: "Tale Added Successfully.",
      addTale,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getAllTales = async (req, res) => {
  try {
    const { userId } = req.user;

    const tales = await Tale.find({ userId: userId }).sort({ isFavourite: -1 });
    res.status(200).json({
      tales,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const editTale = async (req, res) => {
  const { id } = req.params;
  const { title, tale, visitedLocation, visitedDate } = req.body;
  const { userId } = req.user;

  //converting milliseconds into proper Date
  const parsedVisitedDate = new Date(parseInt(visitedDate));

  try {
    let editTale = await Tale.findOne({ _id: id, userId: userId });
    if (!editTale) {
      return res.status(404).json({
        message: "Tale Not Found",
        success: false,
      });
    }

    //update fields
    if (title) editTale.title = title;
    if (tale) editTale.tale = tale;
    if (visitedLocation) editTale.visitedLocation = visitedLocation;
    if (visitedDate) editTale.visitedDate = parsedVisitedDate;

    await editTale.save();

    editTale = {
      _id: editTale._id,
      title: editTale.title,
      tale: editTale.tale,
      visitedLocation: editTale.visitedLocation,
      visitedDate: editTale.parsedVisitedDate,
    };

    return res.status(200).json({
      message: "Tale Updated Successfully.",
      editTale,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const deleteTale = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    let deleteTale = await Tale.findOne({ _id: id, userId: userId });
    if (!deleteTale) {
      return res.status(404).json({
        message: "Tale Not Found",
        success: false,
      });
    }

    await deleteTale.deleteOne({ _id: id, userId: userId });

    return res.status(200).json({
      message: "Tale Deleted Successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const addToFavourites = async (req, res) => {
  const { id } = req.params;
  const { isFavourite } = req.body;
  const { userId } = req.user;

  try {
    let isFavouriteTale = await Tale.findOne({ _id: id, userId: userId });
    if (!isFavouriteTale) {
      return res.status(404).json({
        message: "Tale Not Found",
        success: false,
      });
    }

    isFavouriteTale.isFavourite = isFavourite;

    await isFavouriteTale.save();
    res.status(200).json({
      message: "Tale Added to Favourites Successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const searchTale = async (req, res) => {
  const { query } = req.query;
  const { userId } = req.user;

  if (!query) {
    return res.status(404).json({
      message: "No query provided",
      success: false,
    });
  }

  try {
    const searchResult = await Tale.find({
      userId: userId,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { tale: { $regex: query, $options: "i" } },
        {visitedLocation: {$regex: query, $options: "i"}},
      ],
    }).sort({isFavourite: -1});

    return res.status(200).json({
      searchResult,
      success: true
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const filterTale = async (req, res) => {
  const {startDate, endDate} = req.query
  const {userId} = req.user

  try {
    
    //converting startDate and endDate from milliseconds to proper Date
    const start = new Date(parseInt(startDate))
    const end = new Date(parseInt(endDate))

    //finding tales which belongs to the authenticated used and falls within the date range
    const filteredTales = await Tale.find({
      userId: userId,
      visitedDate: {$gte: start, $lte: end},
    }).sort({isFavourite: -1})

    return res.status(200).json({
      filteredTales,
      success: true,
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
}